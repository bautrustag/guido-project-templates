---
description: Chiusura sessione completa con documentazione
allowed-tools: Read, Write, Bash
---

# Chiusura Sessione

Procedura completa di fine sessione.

## Step 1: Riepilogo Lavoro

Elenca mentalmente:
- Cosa abbiamo implementato/modificato
- File toccati
- Bug risolti
- Decisioni prese

## Step 2: Aggiorna STORICO-SESSIONI.md

Aggiungi entry in `docs/STORICO-SESSIONI.md`:

```markdown
| [DATA] | [Descrizione completa] | [lista file] | [note importanti] |
```

**⚠️ NON aggiungere storico a CLAUDE.md**

## Step 3: Aggiorna TODO

In CLAUDE.md, sezione "PROSSIMI PASSI":
- ✅ Spunta task completati (rimuovili o segna [x])
- ➕ Aggiungi nuovi task emersi
- 🔄 Riordina per priorità

## Step 4: Aggiorna REMINDERS (se necessario)

Se abbiamo risolto bug non ovvi o scoperto gotchas:

```markdown
### [Categoria] - [Problema]
- **Sintomo:** [...]
- **Causa:** [...]
- **Soluzione:** [...]
- **Data:** [OGGI]
```

## Step 5: Aggiorna ROADMAP (se necessario)

Se abbiamo completato milestone o cambiato piani:
- Aggiorna % completamento fase
- Aggiungi decisioni architetturali importanti

## Step 6: Verifica Build

```bash
npm run build
```

⚠️ **NON chiudere con build rotto!**

## Step 7: Commit (se richiesto)

```bash
git add -A
git status
```

Proponi messaggio commit:
```
[tipo]: [descrizione breve]

- [dettaglio 1]
- [dettaglio 2]

🤖 Claude Code session
```

## Step 8: Verifica CLAUDE.md

```bash
wc -l CLAUDE.md
```

Se > 80 righe: **Suggerisci riduzione prima di chiudere**

---

## Output Finale

```markdown
# ✅ Sessione Chiusa - [DATA]

## Completato
- [cosa fatto 1]
- [cosa fatto 2]

## File Modificati
- [file1.ts]
- [file2.tsx]

## Per Prossima Sessione
- [ ] [task 1]
- [ ] [task 2]

## Note
[eventuali note importanti]

---
Build: ✅ 
CLAUDE.md: N/80 righe
Commit: [sì/no - hash se sì]
```
