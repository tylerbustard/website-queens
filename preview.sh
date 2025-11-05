#!/bin/bash

# Preview link script for website
# This script detects the school and creates a Cloudflare Tunnel preview link
# Both dev server and tunnel run in the background so updates are visible in real-time

HOST="127.0.0.1"
SERVER_PID_FILE="dev_server.pid"
TUNNEL_PID_FILE="cf_tunnel.pid"
TUNNEL_LOG_FILE="cloudflared.log"

# Function to detect school name from workspace or codebase
detect_school() {
    # Check workspace directory name
    WORKSPACE_NAME=$(basename "$(pwd)" | tr '[:upper:]' '[:lower:]')
    
    if [[ "$WORKSPACE_NAME" == *"queens"* ]] || [[ "$WORKSPACE_NAME" == *"queen"* ]]; then
        echo "queens"
        return
    fi
    
    # Check for school mentions in resume.tsx
    if grep -qi "queen's university" client/src/pages/resume.tsx 2>/dev/null; then
        echo "queens"
        return
    fi
    
    if grep -qi "mcgill" client/src/pages/resume.tsx 2>/dev/null; then
        echo "mcgill"
        return
    fi
    
    if grep -qi "university of new brunswick\|unb" client/src/pages/resume.tsx 2>/dev/null; then
        echo "unb"
        return
    fi
    
    if grep -qi "university of toronto\|uoft" client/src/pages/resume.tsx 2>/dev/null; then
        echo "uoft"
        return
    fi
    
    # Default fallback
    echo "website"
}

SCHOOL=$(detect_school)
PREVIEW_URL_FILE=".preview_url_${SCHOOL}"

# Function to find an available port
find_available_port() {
    local start_port=$1
    local port=$start_port
    while lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; do
        port=$((port + 1))
        if [ $port -gt 65535 ]; then
            echo "Error: No available ports found" >&2
            exit 1
        fi
    done
    echo $port
}

# Note: We don't set up cleanup traps because we want processes to run in background
# Use stop-preview.sh to clean up when done

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "❌ cloudflared is not installed"
    echo "Install it with: brew install cloudflared"
    exit 1
fi

# Stop any existing preview
if [ -f "$TUNNEL_PID_FILE" ]; then
    OLD_TUNNEL_PID=$(cat "$TUNNEL_PID_FILE")
    if ps -p $OLD_TUNNEL_PID > /dev/null 2>&1; then
        echo "Stopping existing tunnel (PID: $OLD_TUNNEL_PID)..."
        kill $OLD_TUNNEL_PID 2>/dev/null
        sleep 1
    fi
    rm -f "$TUNNEL_PID_FILE"
fi

# Check if server is already running (check PID file or find process)
SERVER_PID=""
PORT=""

if [ -f "$SERVER_PID_FILE" ]; then
    SERVER_PID=$(cat "$SERVER_PID_FILE")
    if ps -p $SERVER_PID > /dev/null 2>&1; then
        # Server is running, find what port it's on
        PORT=$(lsof -Pan -p $SERVER_PID -iTCP -sTCP:LISTEN 2>/dev/null | grep -o ':[0-9]*' | head -1 | cut -d: -f2)
        if [ -z "$PORT" ]; then
            # Try common ports
            for test_port in 5000 5001 3000 3001; do
                if lsof -Pi :$test_port -sTCP:LISTEN -t >/dev/null 2>&1; then
                    TEST_PID=$(lsof -Pi :$test_port -sTCP:LISTEN -t | head -1)
                    if [ "$TEST_PID" = "$SERVER_PID" ]; then
                        PORT=$test_port
                        break
                    fi
                fi
            done
        fi
        if [ -n "$PORT" ]; then
            echo "✓ Server is already running on port $PORT (PID: $SERVER_PID)"
        fi
    fi
fi

# If server not running, start it
if [ -z "$PORT" ]; then
    # Find available port (try 5001 first, then increment)
    PORT=$(find_available_port 5001)
    
    echo "Starting dev server on port $PORT in background..."
    PORT=$PORT npm run dev > dev.log 2>&1 &
    SERVER_PID=$!
    echo $SERVER_PID > "$SERVER_PID_FILE"
    
    # Wait for server to start
    echo "Waiting for server to start..."
    for i in {1..30}; do
        if curl -s http://$HOST:$PORT/health > /dev/null 2>&1; then
            echo "✓ Server is running on port $PORT"
            break
        fi
        sleep 1
    done
    
    if ! curl -s http://$HOST:$PORT/health > /dev/null 2>&1; then
        echo "❌ Server failed to start"
        echo "Check dev.log for errors"
        exit 1
    fi
fi

# Start Cloudflare tunnel
echo ""
echo "Starting Cloudflare tunnel for ${SCHOOL}..."
cloudflared tunnel --url http://$HOST:$PORT > "$TUNNEL_LOG_FILE" 2>&1 &
TUNNEL_PID=$!
echo $TUNNEL_PID > "$TUNNEL_PID_FILE"

# Wait for tunnel to establish and extract URL
echo "Waiting for tunnel to establish..."
sleep 3

# Extract preview URL from logs
PREVIEW_URL=$(grep -o 'https://[^ ]*\.trycloudflare\.com' "$TUNNEL_LOG_FILE" | tail -1)

if [ -z "$PREVIEW_URL" ]; then
    # Try again after a bit more time
    sleep 2
    PREVIEW_URL=$(grep -o 'https://[^ ]*\.trycloudflare\.com' "$TUNNEL_LOG_FILE" | tail -1)
fi

if [ -z "$PREVIEW_URL" ]; then
    echo "❌ Failed to get preview URL"
    echo "Check $TUNNEL_LOG_FILE for details"
    exit 1
fi

# Save preview URL
echo "$PREVIEW_URL" > "$PREVIEW_URL_FILE"

# Display results
echo ""
# Convert school name to uppercase (compatible with older bash)
SCHOOL_UPPER=$(echo "$SCHOOL" | tr '[:lower:]' '[:upper:]')

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎓 Preview Link for ${SCHOOL_UPPER}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  📋 Preview URL: $PREVIEW_URL"
echo ""
echo "  📝 Server running on port $PORT (PID: $SERVER_PID)"
echo "  📝 Tunnel running (PID: $TUNNEL_PID)"
echo "  🔄 Changes will be reflected automatically (hot-reload enabled)"
echo ""
echo "  💾 Preview URL saved to: $PREVIEW_URL_FILE"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📝 To stop the preview, run: npm run stop-preview"
echo "  📋 Or manually kill PIDs: $SERVER_PID (server), $TUNNEL_PID (tunnel)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Script completes - processes run in background
# The preview will continue running until you stop it with: npm run stop-preview

