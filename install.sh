#!/bin/bash

# ============================================================
# INSTALL.SH - Install templates, commands, and agents
# ============================================================
# Supports: Claude Code + Codex + Gemini CLI + Kimi (Aider)
#
# What this script does:
# 1. Downloads LLM instruction files (CLAUDE.md, CODEX.md, GEMINI.md, KIMI.md)
# 2. Downloads shared docs templates
# 3. Installs Claude Code commands and agents (global)
# 4. Installs Aider config (.aider.conf.yml)
#
# Usage: 
#   chmod +x install.sh
#   ./install.sh              # Full install
#   ./install.sh --project    # Only project files (in current dir)
#   ./install.sh --commands   # Only Claude Code commands (global)
# ============================================================

BASE_URL="https://raw.githubusercontent.com/bautrustag/guido-project-templates/main"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

install_project_files() {
    echo -e "${BLUE}📁 Installing project files in current directory...${NC}"
    echo ""

    # LLM instruction files
    echo -e "${YELLOW}📥 LLM instruction files...${NC}"
    curl -sL "$BASE_URL/templates/CLAUDE.md" -o "CLAUDE.md"
    echo "   ✓ CLAUDE.md (Claude Code)"
    curl -sL "$BASE_URL/templates/CODEX.md" -o "CODEX.md"
    echo "   ✓ CODEX.md (OpenAI Codex)"
    curl -sL "$BASE_URL/templates/GEMINI.md" -o "GEMINI.md"
    echo "   ✓ GEMINI.md (Google Gemini CLI)"
    curl -sL "$BASE_URL/templates/KIMI.md" -o "KIMI.md"
    echo "   ✓ KIMI.md (Kimi K2.5 via Aider)"

    # Aider config
    curl -sL "$BASE_URL/aider.conf.yml" -o ".aider.conf.yml"
    echo "   ✓ .aider.conf.yml (Aider config)"

    # Roadmap
    curl -sL "$BASE_URL/templates/ROADMAP.md" -o "ROADMAP.md"
    echo "   ✓ ROADMAP.md"

    # Shared docs
    echo ""
    echo -e "${YELLOW}📥 Shared docs (docs/)...${NC}"
    mkdir -p docs
    curl -sL "$BASE_URL/docs-templates/SESSION-STATE.md" -o "docs/SESSION-STATE.md"
    echo "   ✓ docs/SESSION-STATE.md (stato condiviso)"
    curl -sL "$BASE_URL/templates/REMINDERS.md" -o "docs/REMINDERS.md"
    echo "   ✓ docs/REMINDERS.md"
    curl -sL "$BASE_URL/docs-templates/STORICO-SESSIONI.md" -o "docs/STORICO-SESSIONI.md"
    echo "   ✓ docs/STORICO-SESSIONI.md (con colonna Tool)"
    curl -sL "$BASE_URL/docs-templates/ARCHITETTURA.md" -o "docs/ARCHITETTURA.md"
    echo "   ✓ docs/ARCHITETTURA.md"
    curl -sL "$BASE_URL/docs-templates/CONTEXT-MANAGEMENT.md" -o "docs/CONTEXT-MANAGEMENT.md"
    echo "   ✓ docs/CONTEXT-MANAGEMENT.md"

    echo ""
    echo -e "${GREEN}✅ Project files installed!${NC}"
    echo "   Next: Personalizza CLAUDE.md, CODEX.md, GEMINI.md, KIMI.md con le info del tuo progetto."
}

install_commands() {
    local DEST="$HOME/.claude/commands"

    echo -e "${BLUE}📁 Installing Claude Code commands in $DEST...${NC}"
    echo ""
    mkdir -p "$DEST"

    # Agents
    echo -e "${YELLOW}📥 Agents (@)...${NC}"
    for agent in debug security supabase n8n gemini testing; do
        curl -sL "$BASE_URL/agents/@${agent}.md" -o "$DEST/@${agent}.md"
        echo "   ✓ @${agent}.md"
    done

    # Commands
    echo ""
    echo -e "${YELLOW}📥 Commands (/)...${NC}"
    for cmd in audit status close guide clear-safe context-check optimize generate-context test; do
        curl -sL "$BASE_URL/commands/${cmd}.md" -o "$DEST/${cmd}.md"
        echo "   ✓ ${cmd}.md"
    done

    echo ""
    echo -e "${GREEN}✅ Claude Code commands installed!${NC}"
}

show_summary() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}🎉 Installation complete!${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📄 LLM instruction files:"
    echo "   CLAUDE.md       → Claude Code reads this"
    echo "   CODEX.md        → Codex reads this"
    echo "   GEMINI.md       → Gemini CLI reads this"
    echo "   KIMI.md         → Kimi (Aider) reads this"
    echo "   .aider.conf.yml → Aider config (model + read files)"
    echo ""
    echo "📂 Shared docs (docs/):"
    echo "   SESSION-STATE.md     → State shared across all tools"
    echo "   STORICO-SESSIONI.md  → Session history (with Tool column)"
    echo "   REMINDERS.md         → Known bugs & solutions"
    echo ""
    echo "⚡ Claude Code commands:"
    echo "   /status  /audit  /close  /clear-safe"
    echo "   /context-check  /optimize  /test  /guide"
    echo ""
    echo "🤖 Claude Code agents:"
    echo "   /@debug  /@security  /@supabase"
    echo "   /@n8n    /@gemini    /@testing"
    echo ""
    echo "🔄 Multi-LLM workflow:"
    echo "   1. Start:  /status (any tool)"
    echo "   2. Work:   normally"
    echo "   3. Switch: /clear-safe → open other tool → /status"
    echo ""
    echo "🚀 Terminal commands:"
    echo "   claude    → Claude Code"
    echo "   codex     → OpenAI Codex"
    echo "   kimi      → Kimi K2.5 (via Aider + OpenRouter)"
    echo ""
}

# Parse arguments
case "${1:-}" in
    --project)
        install_project_files
        ;;
    --commands)
        install_commands
        ;;
    *)
        install_project_files
        echo ""
        install_commands
        show_summary
        ;;
esac
