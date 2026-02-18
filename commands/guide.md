---
description: Guida rapida di riferimento
allowed-tools: Read
---

# Guida Rapida

## Comandi Essenziali

| Comando | Quando |
|---------|--------|
| `/status` | Inizio sessione - vedi TODO |
| `/context` | Verifica contesto (built-in) |
| `/clear` | Dopo ogni task (built-in) |
| `/clear-safe` | Prima di /clear se lavoro importante |
| `/close` | Fine sessione |
| `/audit` | Health check periodico |
| `/context-check` | Se Claude "dimentica" |

## Agenti

| Agente | Trigger |
|--------|---------|
| `/@debug` | "Ho un errore...", bug, crash |
| `/@security` | Pre-deploy, audit sicurezza |
| `/@supabase` | Database, RLS, Edge Functions |
| `/@n8n` | Workflow automazioni |
| `/@gemini` | Prompt AI, output inconsistente |

## Regole d'Oro

1. **CLAUDE.md < 80 righe** (storico va in docs/)
2. **`/clear` dopo ogni task**
3. **Dopo ~20 messaggi → `/clear`**
4. **File > 500 righe → modifica solo la funzione**
5. **`npm run build` deve sempre passare**

## Se Claude Dimentica

```
/context           # Verifica utilizzo
/clear-safe        # Salva stato
/clear             # Reset
[riparti]
```

## Struttura File

```
CLAUDE.md           → Memoria (< 80 righe!)
ROADMAP.md          → Piano sviluppo
docs/
├── REMINDERS.md    → Errori noti
├── STORICO-SESSIONI.md → Cronologia
└── ARCHITETTURA.md → Dettagli tecnici
```

## Limiti Contesto

| Elemento | Target |
|----------|--------|
| CLAUDE.md | < 80 righe |
| Memory files | < 5% del contesto |
| Messaggi prima di /clear | ~20 |

## Quick Workflow

```
[INIZIO]
/status → /context → [lavora] → /clear → [lavora] → /close
```
