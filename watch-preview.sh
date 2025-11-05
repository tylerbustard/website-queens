#!/bin/bash

# Watch preview logs in real-time to see updates as they happen

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  👀 Watching Preview Logs (Real-time Updates)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  📋 Preview URL: $(cat .preview_url_queens 2>/dev/null || echo 'Not found')"
echo ""
echo "  Press Ctrl+C to stop watching"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Tail both dev server logs and tunnel logs
if [ -f "dev.log" ]; then
    echo "📝 Dev Server Logs:"
    echo "──────────────────────────────────────────────────────────────────────────"
    tail -f dev.log &
    DEV_TAIL_PID=$!
fi

if [ -f "cloudflared.log" ]; then
    echo ""
    echo "🌐 Tunnel Logs:"
    echo "──────────────────────────────────────────────────────────────────────────"
    tail -f cloudflared.log &
    TUNNEL_TAIL_PID=$!
fi

# Cleanup on exit
trap "kill $DEV_TAIL_PID $TUNNEL_TAIL_PID 2>/dev/null; exit" INT TERM

# Wait for background processes
wait

