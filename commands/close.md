---
description: Chiusura sessione completa con documentazione
allowed-tools: Read, Write, Bash
---

# Chiusura Sessione

Procedura completa di fine sessione. Aggiorna tutti i file condivisi.

## Step 1: Riepilogo Lavoro

Elenca mentalmente:
- Cosa abbiamo implementato/modificato
- File toccati
- Bug risolti
- Decisioni prese

## Step 2: Aggiorna SESSION-STATE.md

Aggiorna `docs/SESSION-STATE.md` con stato completo:
- Ultimo aggiornamento (data, tool: Claude Code)
- Stato build
- Lavori in corso (se incompleti)
- Prossimi passi ordinati per priorità
- Decisioni recenti (se nuove)
- Note per il prossimo LLM

## Step 3: Aggiorna STORICO-SESSIONI.md

Aggiungi entry in `docs/STORICO-SESSIONI.md`:

```markdown
| [DATA] | [Descrizione completa] | [lista file] | CC | [note importanti] |
```

## Step 4: Aggiorna TODO

In CLAUDE.md, sezione "PROSSIMI PASSI":
- ✅ Rimuovi task completati
- ➕ Aggiungi nuovi task emersi
- 🔄 Riordina per priorità

## Step 5: Aggiorna REMINDERS (se necessario)

Se abbiamo risolto bug non ovvi o scoperto gotchas:

```markdown
### [Problema in breve]
- **Sintomo:** [...]
- **Causa:** [...]
- **Soluzione:** [...]
- **Data:** [OGGI]
```

## Step 6: Aggiorna ROADMAP (se necessario)

Se abbiamo completato milestone o cambiato piani.

## Step 7: Verifica Build

```bash
npm run build
```

⚠️ **NON chiudere con build rotto!**

## Step 8: Commit (se richiesto)

```bash
git add -A
git status
```

## Step 9: Verifica CLAUDE.md

```bash
wc -l CLAUDE.md
```

Se > 80 righe: **Suggerisci riduzione prima di chiudere.**

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

## File Condivisi Aggiornati
- ✅ docs/SESSION-STATE.md
- ✅ docs/STORICO-SESSIONI.md (tool: CC)
- [✅/—] docs/REMINDERS.md

## Per Prossima Sessione (qualsiasi tool)
- [ ] [task 1]
- [ ] [task 2]

---
Build: ✅
CLAUDE.md: N/80 righe
Commit: [sì/no]
```
