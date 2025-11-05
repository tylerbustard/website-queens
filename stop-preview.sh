#!/bin/bash

# Stop preview script - kills both the dev server and Cloudflare tunnel
SERVER_PID_FILE="dev_server.pid"
TUNNEL_PID_FILE="cf_tunnel.pid"

# Function to detect school name (same as preview.sh)
detect_school() {
    WORKSPACE_NAME=$(basename "$(pwd)" | tr '[:upper:]' '[:lower:]')
    
    if [[ "$WORKSPACE_NAME" == *"queens"* ]] || [[ "$WORKSPACE_NAME" == *"queen"* ]]; then
        echo "queens"
        return
    fi
    
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
    
    echo "website"
}

SCHOOL=$(detect_school)
PREVIEW_URL_FILE=".preview_url_${SCHOOL}"

SCHOOL_UPPER=$(echo "$SCHOOL" | tr '[:lower:]' '[:upper:]')
echo "Stopping preview for ${SCHOOL_UPPER}..."

# Stop Cloudflare tunnel
if [ -f "$TUNNEL_PID_FILE" ]; then
    TUNNEL_PID=$(cat "$TUNNEL_PID_FILE")
    if ps -p $TUNNEL_PID > /dev/null 2>&1; then
        echo "Stopping Cloudflare tunnel (PID: $TUNNEL_PID)..."
        kill $TUNNEL_PID 2>/dev/null
        sleep 1
    fi
    rm -f "$TUNNEL_PID_FILE"
fi

# Stop dev server
if [ -f "$SERVER_PID_FILE" ]; then
    SERVER_PID=$(cat "$SERVER_PID_FILE")
    if ps -p $SERVER_PID > /dev/null 2>&1; then
        echo "Stopping dev server (PID: $SERVER_PID)..."
        kill $SERVER_PID 2>/dev/null
        sleep 1
    fi
    rm -f "$SERVER_PID_FILE"
fi

# Clean up preview URL file
if [ -f "$PREVIEW_URL_FILE" ]; then
    rm -f "$PREVIEW_URL_FILE"
fi

echo "✓ Preview stopped. All processes terminated."

