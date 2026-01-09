---
description: Riepilogo rapido stato progetto
allowed-tools: Read, Bash
---

# Status Progetto

Mostra un riepilogo rapido dello stato attuale.

## 1. TODO Correnti

Leggi la sezione "PROSSIMI PASSI" da CLAUDE.md e mostrala.

## 2. Fase Corrente

Leggi ROADMAP.md e identifica:
- Nome fase corrente
- % completamento (conta checkbox)

## 3. Ultime Sessioni

Leggi le ultime 3 righe da `docs/STORICO-SESSIONI.md` (se esiste).

## 4. Health Rapido

```bash
# Build OK?
npm run build 2>&1 > /dev/null && echo "Build: ✅" || echo "Build: ❌"

# Righe CLAUDE.md
echo "CLAUDE.md: $(wc -l < CLAUDE.md) righe"
```

---

## Output

```markdown
# 📊 Status - [PROGETTO]

## 🎯 Prossimi Passi
- [ ] [Task 1 da CLAUDE.md]
- [ ] [Task 2]
- [ ] [Task 3]

## 📍 Fase Corrente
**[Nome Fase]** - [N]% completato

## 📅 Ultime Sessioni
| Data | Lavoro |
|------|--------|
| [data] | [descrizione] |
| [data] | [descrizione] |

## 🏥 Health
- Build: ✅/❌
- CLAUDE.md: N/80 righe

---
Da dove vuoi partire oggi?
```
