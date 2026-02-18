# Guido Project Templates

Template standardizzati per progetti gestiti con **più AI coding assistants**.
Passa da Claude Code a Codex a Gemini CLI a Kimi senza perdere contesto.

---

## 🧠 Filosofia: LLM-Agnostic

Ogni progetto ha **4 file di istruzioni** (uno per tool) e **3 file condivisi** (stato comune).

```
┌─────────────────────────────────────────────────────────────┐
│                    FILE CONDIVISI                            │
│                                                             │
│  docs/SESSION-STATE.md    ← Stato attuale progetto          │
│  docs/STORICO-SESSIONI.md ← Chi ha fatto cosa (con quale LLM) │
│  docs/REMINDERS.md        ← Bug risolti da ricordare        │
└──────────┬──────────┬──────────┬──────────┬────────────────┘
           │          │          │          │
    ┌──────┴────┐ ┌───┴───┐ ┌───┴─────┐ ┌─┴───────┐
    │ CLAUDE.md │ │CODEX.md│ │GEMINI.md│ │ KIMI.md │
    │(Claude    │ │(Codex) │ │(Gemini  │ │(Aider + │
    │ Code)     │ │        │ │ CLI)    │ │ Kimi)   │
    └───────────┘ └────────┘ └─────────┘ └─────────┘
```

**Regola:** Quando switchi tool, il nuovo LLM legge il suo file + i 3 condivisi e riparte da dove eri.

---

## 📁 Contenuto Repository

```
templates/
├── CLAUDE.md       # Istruzioni Claude Code
├── CODEX.md        # Istruzioni OpenAI Codex
├── GEMINI.md       # Istruzioni Google Gemini CLI
├── KIMI.md         # Istruzioni Kimi K2.5 (via Aider)
├── ROADMAP.md      # Piano sviluppo
└── REMINDERS.md    # Errori noti e soluzioni

aider.conf.yml      # Config Aider (copiato come .aider.conf.yml)

docs-templates/
├── SESSION-STATE.md       # Stato condiviso (CUORE del sistema)
├── STORICO-SESSIONI.md    # Cronologia lavori (con colonna Tool)
├── ARCHITETTURA.md        # Dettagli tecnici
├── CONTEXT-MANAGEMENT.md  # Guida gestione contesto
└── TESTING.md             # Guida testing

agents/                    # Agenti Claude Code
├── @debug.md    @security.md    @supabase.md
├── @n8n.md      @gemini.md      @testing.md

commands/                  # Comandi Claude Code (/slash)
├── audit.md     clear-safe.md   close.md
├── context-check.md   generate-context.md
├── guide.md     optimize.md     status.md
└── test.md

testing/                   # Script e config per testing
├── playwright.config.ts
├── scripts/    e2e/
```

---

## 🚀 Quick Start

### 1. Copia i template nel tuo progetto

```bash
# File istruzioni LLM (copia nella ROOT del progetto)
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/CLAUDE.md -o CLAUDE.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/CODEX.md -o CODEX.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/GEMINI.md -o GEMINI.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/KIMI.md -o KIMI.md

# Aider config
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/aider.conf.yml -o .aider.conf.yml

# Roadmap
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/ROADMAP.md -o ROADMAP.md

# Cartella docs/ condivisa
mkdir -p docs
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/docs-templates/SESSION-STATE.md -o docs/SESSION-STATE.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/REMINDERS.md -o docs/REMINDERS.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/docs-templates/STORICO-SESSIONI.md -o docs/STORICO-SESSIONI.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/docs-templates/ARCHITETTURA.md -o docs/ARCHITETTURA.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/docs-templates/CONTEXT-MANAGEMENT.md -o docs/CONTEXT-MANAGEMENT.md
```

### 2. Installa agenti e comandi Claude Code (una volta sola)

```bash
chmod +x install.sh
./install.sh
```

### 3. Personalizza

Apri `CLAUDE.md`, `CODEX.md`, `GEMINI.md`, `KIMI.md` e sostituisci i placeholder con le info del tuo progetto.

---

## 🚀 Setup Kimi (Aider + OpenRouter)

### Prerequisiti (una volta sola)

```bash
# 1. Installa Aider
pipx install aider-install
aider-install

# 2. Salva API key OpenRouter
echo 'export OPENROUTER_API_KEY=sk-or-TUA_KEY' >> ~/.zshrc
source ~/.zshrc

# 3. Crea alias per lanciare velocemente
echo "alias kimi='aider --model openrouter/moonshotai/kimi-k2.5'" >> ~/.zshrc
source ~/.zshrc
```

### Uso

```bash
cd /percorso/progetto
kimi                  # Lancia Aider con Kimi K2.5
```

Il file `.aider.conf.yml` nella root del progetto configura automaticamente modello e file di istruzioni.

---

## 🔄 Workflow Multi-LLM

### Inizio sessione (qualsiasi tool)
```
1. LLM legge il SUO file (CLAUDE.md / CODEX.md / GEMINI.md / KIMI.md)
2. LLM legge docs/SESSION-STATE.md → sa dove eravamo
3. Lavora normalmente
```

### Fine sessione / Switch tool
```
1. Aggiorna docs/SESSION-STATE.md (stato attuale)
2. Aggiungi riga a docs/STORICO-SESSIONI.md (cosa hai fatto + quale tool)
3. Se bug risolto non ovvio → aggiungi a docs/REMINDERS.md
4. Switch tool: il nuovo LLM legge stessi file e continua
```

### Comandi unificati (stessa sintassi, tutti i tool)

| Comando | Cosa fa |
|---------|---------|
| `/clear-safe` | Salva stato nei 3 file condivisi prima di reset |
| `/status` | Mostra docs/SESSION-STATE.md |
| `/storico` | Mostra ultime 10 righe STORICO-SESSIONI.md |

> In Claude Code sono slash commands nativi. In Codex/Gemini/Kimi digitali come testo.

---

## 🛠️ Comandi e Agenti (Claude Code)

### Comandi

| Comando | Descrizione |
|---------|-------------|
| `/status` | Riepilogo rapido + context check |
| `/audit` | Health check completo |
| `/context-check` | Analisi dimensioni file |
| `/clear-safe` | Salva stato prima di /clear |
| `/close` | Chiusura sessione con documentazione |
| `/optimize` | Archivia contenuti vecchi (MAI cancella) |
| `/test` | Testing automatico (audit + E2E) |

### Agenti

| Agente | Quando usarlo |
|--------|---------------|
| `/@debug` | Errore/bug da investigare |
| `/@security` | Audit sicurezza pre-deploy |
| `/@supabase` | Database, RLS, Edge Functions |
| `/@n8n` | Workflow n8n |
| `/@gemini` | Ottimizzazione prompt AI |
| `/@testing` | Test automatici, Playwright |

---

## 📐 Struttura Progetto Consigliata

```
progetto/
├── CLAUDE.md                  # Istruzioni Claude Code (< 80 righe!)
├── CODEX.md                   # Istruzioni Codex
├── GEMINI.md                  # Istruzioni Gemini CLI
├── KIMI.md                    # Istruzioni Kimi (Aider)
├── .aider.conf.yml            # Config Aider (modello + file)
├── ROADMAP.md                 # Piano sviluppo
├── docs/
│   ├── SESSION-STATE.md       # 🔑 Stato condiviso tra tutti i tool
│   ├── STORICO-SESSIONI.md    # Cronologia (con colonna Tool)
│   ├── REMINDERS.md           # Errori noti
│   ├── ARCHITETTURA.md        # Dettagli tecnici
│   └── CONTEXT-MANAGEMENT.md  # Guida contesto
├── src/
└── ...
```

---

## 📏 Limiti Contesto per Tool

| Tool | Context Window | File istruzioni target |
|------|---------------|----------------------|
| Claude Code | 200k tokens | CLAUDE.md < 80 righe |
| Codex | 192k tokens | CODEX.md < 120 righe |
| Gemini CLI | 1M+ tokens | GEMINI.md < 200 righe |
| Kimi K2.5 (Aider) | 262k tokens | KIMI.md < 150 righe |

---

## 🚀 Comandi Terminale

| Comando | Tool | Note |
|---------|------|------|
| `claude` | Claude Code | Installato globalmente |
| `codex` | OpenAI Codex | Installato globalmente |
| `gemini` | Gemini CLI | Installato globalmente |
| `kimi` | Kimi K2.5 via Aider | Alias → `aider --model openrouter/moonshotai/kimi-k2.5` |

Tutti si lanciano da terminale nella cartella del progetto. In Cursor puoi avere più tab terminale aperte contemporaneamente.

---

## 📖 Guide

- `GUIDA-COMUNICAZIONE.md` — Come comunicare efficacemente con tutti i tool

---

## Installazione Rapida (collaboratori)

```bash
git clone https://github.com/bautrustag/guido-project-templates.git
cd guido-project-templates
chmod +x install.sh
./install.sh
```

## Autore

Guido Alberti — Gruppo Alberti

## Licenza

MIT
