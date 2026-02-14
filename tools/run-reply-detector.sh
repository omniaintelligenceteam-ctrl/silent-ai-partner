#!/bin/bash
# Reply Detector Cron Wrapper
# Add to crontab: */30 * * * * /root/.openclaw/workspace/silent-ai-partner/tools/run-reply-detector.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/root/.openclaw/workspace/memory/crm/reply-detector-cron.log"
DISCORD_WEBHOOK="${DISCORD_WEBHOOK_URL:-}"  # Set in environment or crontab

# Run the detector and capture output
OUTPUT=$(python3 "$SCRIPT_DIR/reply-detector.py" 2>&1)
EXIT_CODE=$?

# Log the run
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Exit code: $EXIT_CODE" >> "$LOG_FILE"
echo "$OUTPUT" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"

# Extract Discord output
DISCORD_MSG=$(echo "$OUTPUT" | sed -n '/DISCORD_OUTPUT_START/,/DISCORD_OUTPUT_END/p' | sed '1d;$d')

# If there's a webhook configured, post to Discord
if [ -n "$DISCORD_WEBHOOK" ] && [ -n "$DISCORD_MSG" ]; then
    curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "{\"content\": \"$DISCORD_MSG\"}" \
        "$DISCORD_WEBHOOK" > /dev/null 2>&1
fi

# Exit with the original exit code
exit $EXIT_CODE
