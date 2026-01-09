#!/bin/bash

# ============================================================
# INSTALL.SH - Installa comandi e agenti per Claude Code
# ============================================================
# Cosa fa questo script:
# 1. Crea la cartella ~/.claude/commands/ se non esiste
# 2. Scarica tutti i comandi e agenti dalla repo GitHub
# 3. Li salva nella cartella che Claude Code legge
#
# Uso: 
#   chmod +x install.sh    (rende eseguibile, solo la prima volta)
#   ./install.sh           (esegue lo script)
# ============================================================

echo "🚀 Installazione comandi Claude Code..."
echo ""

# BASE_URL = indirizzo base della repo su GitHub (raw = file puro, non pagina HTML)
BASE_URL="https://raw.githubusercontent.com/bautrustag/guido-project-templates/main"

# DEST = cartella di destinazione dove Claude Code cerca i comandi
DEST="$HOME/.claude/commands"

# Crea la cartella se non esiste
# mkdir = crea cartella
# -p = crea anche cartelle intermedie se servono, non dà errore se esiste già
echo "📁 Creo cartella $DEST (se non esiste)..."
mkdir -p "$DEST"

echo ""
echo "📥 Scarico agenti (@)..."

# curl = scarica file da internet
# -sL = silenzioso + segue redirect
# -o = salva nel file specificato
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
echo "📥 Scarico comandi (/)..."

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

echo ""
echo "✅ Installazione completata!"
echo ""
echo "Comandi disponibili in Claude Code:"
echo "   /audit         - Health check progetto"
echo "   /status        - Riepilogo stato (con check contesto)"
echo "   /close         - Chiusura sessione"
echo "   /guide         - Guida rapida"
echo "   /clear-safe    - Salva stato prima di /clear"
echo "   /context-check - Analisi dettagliata dimensioni file"
echo "   /optimize      - Archivia contenuti vecchi (MAI cancella)"
echo ""
echo "Agenti disponibili:"
echo "   /@debug     - Debug errori"
echo "   /@security  - Audit sicurezza"
echo "   /@supabase  - Esperto database"
echo "   /@n8n       - Esperto workflow"
echo "   /@gemini    - Esperto prompt AI"
echo ""
