#!/bin/bash

# Show current preview URL for the detected school

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
TUNNEL_PID_FILE="cf_tunnel.pid"
SERVER_PID_FILE="dev_server.pid"

SCHOOL_UPPER=$(echo "$SCHOOL" | tr '[:lower:]' '[:upper:]')
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎓 Preview Status for ${SCHOOL_UPPER}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "$PREVIEW_URL_FILE" ]; then
    PREVIEW_URL=$(cat "$PREVIEW_URL_FILE")
    echo "  📋 Preview URL: $PREVIEW_URL"
    echo ""
    
    # Check if tunnel is running
    if [ -f "$TUNNEL_PID_FILE" ]; then
        TUNNEL_PID=$(cat "$TUNNEL_PID_FILE")
        if ps -p $TUNNEL_PID > /dev/null 2>&1; then
            echo "  ✓ Tunnel: Running (PID: $TUNNEL_PID)"
        else
            echo "  ❌ Tunnel: Not running"
        fi
    else
        echo "  ❌ Tunnel: Not running"
    fi
    
    # Check if server is running
    if [ -f "$SERVER_PID_FILE" ]; then
        SERVER_PID=$(cat "$SERVER_PID_FILE")
        if ps -p $SERVER_PID > /dev/null 2>&1; then
            echo "  ✓ Server: Running (PID: $SERVER_PID)"
        else
            echo "  ❌ Server: Not running"
        fi
    else
        echo "  ❌ Server: Not running"
    fi
else
    echo "  ❌ No preview URL found"
    echo ""
    echo "  Run 'npm run preview' to create a preview link"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

