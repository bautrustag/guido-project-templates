#!/bin/bash

# ============================================================
# INSTALL.SH - Install commands and agents for Claude Code
# ============================================================
# What this script does:
# 1. Creates ~/.claude/commands/ folder if it doesn't exist
# 2. Downloads all commands and agents from GitHub repo
# 3. Saves them to the folder Claude Code reads from
#
# Usage: 
#   chmod +x install.sh    (make executable, first time only)
#   ./install.sh           (run the script)
# ============================================================

echo "🚀 Installing Claude Code commands..."
echo ""

# BASE_URL = base address of the repo on GitHub (raw = pure file, not HTML page)
BASE_URL="https://raw.githubusercontent.com/bautrustag/guido-project-templates/main"

# DEST = destination folder where Claude Code looks for commands
DEST="$HOME/.claude/commands"

# Create folder if it doesn't exist
# mkdir = create folder
# -p = create intermediate folders if needed, no error if exists
echo "📁 Creating $DEST (if not exists)..."
mkdir -p "$DEST"

echo ""
echo "📥 Downloading agents (@)..."

# curl = download file from internet
# -sL = silent + follow redirects
# -o = save to specified file
curl -sL "$BASE_URL/agents/@debug.md" -o "$DEST/@debug.md"
echo "   ✓ @debug.md"

curl -sL "$BASE_URL/agents/@security.md" -o "$DEST/@security.md"
echo "   ✓ @security.md"

curl -sL "$BASE_URL/agents/@supabase.md" -o "$DEST/@supabase.md"
echo "   ✓ @supabase.md"

curl -sL "$BASE_URL/agents/@n8n.md" -o "$DEST/@n8n.md"
echo "   ✓ @n8n.md"

curl -sL "$BASE_URL/agents/@gemini.md" -o "$DEST/@gemini.md"
echo "   ✓ @gemini.md"

echo ""
echo "📥 Downloading commands (/)..."

curl -sL "$BASE_URL/commands/audit.md" -o "$DEST/audit.md"
echo "   ✓ audit.md"

curl -sL "$BASE_URL/commands/status.md" -o "$DEST/status.md"
echo "   ✓ status.md"

curl -sL "$BASE_URL/commands/close.md" -o "$DEST/close.md"
echo "   ✓ close.md"

curl -sL "$BASE_URL/commands/guide.md" -o "$DEST/guide.md"
echo "   ✓ guide.md"

curl -sL "$BASE_URL/commands/clear-safe.md" -o "$DEST/clear-safe.md"
echo "   ✓ clear-safe.md"

curl -sL "$BASE_URL/commands/context-check.md" -o "$DEST/context-check.md"
echo "   ✓ context-check.md"

curl -sL "$BASE_URL/commands/optimize.md" -o "$DEST/optimize.md"
echo "   ✓ optimize.md"

curl -sL "$BASE_URL/commands/generate-context.md" -o "$DEST/generate-context.md"
echo "   ✓ generate-context.md"

echo ""
echo "✅ Installation complete!"
echo ""
echo "Available commands in Claude Code:"
echo "   /audit            - Project health check"
echo "   /status           - Project status summary (with context check)"
echo "   /close            - Session closing"
echo "   /guide            - Quick reference guide"
echo "   /clear-safe       - Save state before /clear"
echo "   /context-check    - Detailed file size analysis"
echo "   /optimize         - Archive old content (NEVER deletes)"
echo "   /generate-context - Create PROJECT-CONTEXT.md for Claude.ai Projects"
echo ""
echo "Available agents:"
echo "   /@debug     - Debug helper"
echo "   /@security  - Security audit"
echo "   /@supabase  - Database expert"
echo "   /@n8n       - Workflow expert"
echo "   /@gemini    - AI prompt expert"
echo ""
