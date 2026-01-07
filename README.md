# Guido Project Templates

Template standardizzati per progetti gestiti con Claude Code.

## Contenuto

```
templates/
├── CLAUDE.md      # Memoria di progetto principale
├── ROADMAP.md     # Piano di sviluppo e fasi
└── REMINDERS.md   # Gotchas e lezioni apprese
```

## Utilizzo

I template vengono scaricati automaticamente dal comando `/start` di Claude Code.

### Download manuale

```bash
# CLAUDE.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/CLAUDE.md -o CLAUDE.md

# ROADMAP.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/ROADMAP.md -o ROADMAP.md

# REMINDERS.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/REMINDERS.md -o docs/REMINDERS.md
```

## Struttura Progetto Consigliata

```
/
├── docs/                 # Documenti di implementazione
│   ├── REMINDERS.md      # Gotchas e lezioni apprese
│   └── YYYY-MM-DD-*.md   # Documenti di sessione
├── prompts/              # Cronologia prompt salvati
├── src/                  # Codice sorgente
├── CLAUDE.md             # Memoria progetto
├── ROADMAP.md            # Piano sviluppo
└── README.md
```

## Comandi Claude Code Correlati

- `/start` - Inizializza un nuovo progetto con questi template
- `/docs` - Aggiornamento documentazione leggero (mid-session)
- `/close` - Chiusura sessione con documentazione completa

## Autore

Guido Alberti - Gruppo Alberti
