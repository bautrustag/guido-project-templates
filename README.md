# Guido Project Templates

Template standardizzati per progetti gestiti con Claude Code.

---

## ⚠️ Gestione Contesto (IMPORTANTE)

Il file `CLAUDE.md` deve restare **snello** (< 80 righe).

Un CLAUDE.md troppo grande causa:
- Claude che "dimentica" cose dette pochi messaggi prima
- Regressioni continue (rompe codice che funzionava)  
- Claude dice "fatto" senza aver fatto
- Sessioni lente e confuse

**Regole fondamentali:**
1. `CLAUDE.md` < 80 righe (storico va in `docs/STORICO-SESSIONI.md`)
2. Usa `/clear` dopo ogni task completato
3. Usa `/context` per monitorare l'utilizzo
4. Leggi `docs/CONTEXT-MANAGEMENT.md` per la guida completa

---

## Contenuto Repository

```
templates/
├── CLAUDE.md      # Memoria progetto (MAX 80 righe!)
├── ROADMAP.md     # Piano sviluppo e fasi  
└── REMINDERS.md   # Errori noti e soluzioni

docs-templates/
├── STORICO-SESSIONI.md    # Cronologia lavori (qui va lo storico!)
├── ARCHITETTURA.md        # Dettagli tecnici
└── CONTEXT-MANAGEMENT.md  # Guida gestione contesto Claude

agents/
├── @debug.md      # Debug helper sistematico
├── @security.md   # Security audit
├── @supabase.md   # Database expert
├── @n8n.md        # Workflow n8n expert
└── @gemini.md     # Prompt optimizer

commands/
├── audit.md         # Health check completo
├── context-check.md # Verifica stato contesto
├── clear-safe.md    # Salva prima di /clear
├── status.md        # Riepilogo rapido
└── close.md         # Chiusura sessione
```

---

## Quick Start

### 1. Copia i template nel tuo progetto

```bash
# CLAUDE.md (memoria progetto)
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/CLAUDE.md -o CLAUDE.md

# ROADMAP.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/ROADMAP.md -o ROADMAP.md

# Cartella docs/
mkdir -p docs
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/REMINDERS.md -o docs/REMINDERS.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/docs-templates/STORICO-SESSIONI.md -o docs/STORICO-SESSIONI.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/docs-templates/ARCHITETTURA.md -o docs/ARCHITETTURA.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/docs-templates/CONTEXT-MANAGEMENT.md -o docs/CONTEXT-MANAGEMENT.md
```

### 2. Installa gli agenti (globali, una volta sola)

```bash
mkdir -p ~/.claude/commands

# Agenti
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@debug.md -o ~/.claude/commands/@debug.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@security.md -o ~/.claude/commands/@security.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@supabase.md -o ~/.claude/commands/@supabase.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@n8n.md -o ~/.claude/commands/@n8n.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@gemini.md -o ~/.claude/commands/@gemini.md

# Comandi
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/commands/audit.md -o ~/.claude/commands/audit.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/commands/context-check.md -o ~/.claude/commands/context-check.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/commands/clear-safe.md -o ~/.claude/commands/clear-safe.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/commands/status.md -o ~/.claude/commands/status.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/commands/close.md -o ~/.claude/commands/close.md
```

### 3. Personalizza CLAUDE.md

Apri `CLAUDE.md` e sostituisci i placeholder con le info del tuo progetto.

---

## Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `/status` | Riepilogo rapido: TODO, fase, ultime sessioni |
| `/audit` | Health check completo del progetto |
| `/context-check` | Verifica stato contesto Claude |
| `/clear-safe` | Salva stato prima di fare /clear |
| `/close` | Chiusura sessione con documentazione |

## Agenti Disponibili

| Agente | Quando usarlo |
|--------|---------------|
| `/@debug` | Errore/bug da investigare |
| `/@security` | Audit sicurezza pre-deploy |
| `/@supabase` | Database, RLS, Edge Functions |
| `/@n8n` | Workflow n8n |
| `/@gemini` | Ottimizzazione prompt AI |

---

## Struttura Progetto Consigliata

```
progetto/
├── CLAUDE.md                # Memoria (< 80 righe!)
├── ROADMAP.md               # Piano sviluppo
├── README.md                # Readme pubblico
├── docs/
│   ├── REMINDERS.md         # Errori noti
│   ├── STORICO-SESSIONI.md  # Cronologia (storico va QUI)
│   ├── ARCHITETTURA.md      # Dettagli tecnici
│   └── CONTEXT-MANAGEMENT.md # Guida contesto
├── src/                     # Codice
└── ...
```

---

## Workflow Consigliato

### Inizio Sessione
```
claude              # Apri Claude Code
/status             # Vedi TODO e stato
/context            # Verifica contesto
```

### Durante il Lavoro
```
[lavora normalmente]
/clear              # Dopo ogni task completato!
```

### Fine Sessione
```
/close              # Documenta e chiudi
```

### Se Claude "dimentica"
```
/clear-safe         # Salva stato
/clear              # Reset
[riparti]
```

---

## Manutenzione

### Settimanale
- `/audit` per health check

### Quando CLAUDE.md cresce
- `/context-check` per verificare
- Sposta contenuti in `docs/`

### Mensile
```
[ ] CLAUDE.md < 80 righe?
[ ] docs/REMINDERS.md aggiornato?
[ ] ROADMAP.md riflette lo stato reale?
```

---

## Autore

Guido Alberti - Gruppo Alberti

---

## Licenza

MIT
