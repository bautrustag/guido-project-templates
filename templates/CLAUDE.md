# [NOME PROGETTO]

> ⚠️ **LIMITE:** Questo file DEVE restare < 80 righe. Se cresce, sposta contenuti in docs/.

## Stack
[Linguaggio] + [Framework] + [Database] + [Hosting]

## Comandi
```bash
npm run dev      # sviluppo
npm run build    # DEVE passare sempre
npm run lint     # baseline: N errori (non aggiungerne)
```

## ⛔ FILE CRITICI
| File | Righe | Regola |
|------|-------|--------|
| [file1.ts] | N | Mai riscrivere intero, solo funzioni |
| [file2.ts] | N | Sync con file1 |
| [types/index.ts] | N | Impatta tutto il progetto |

## 🛡️ REGOLE ANTI-REGRESSIONE

### File grandi
- File > 400 righe → modifica SOLO la funzione specifica
- File > 1000 righe → proponi piano e chiedi conferma PRIMA

### Contesto
- Dopo ~20 messaggi → suggerisci `/clear` all'utente
- Se utente dice "hai dimenticato" → `/clear` subito
- **Mai scrivere storico in questo file** → usa `docs/STORICO-SESSIONI.md`

### Verifica
- `npm run build` deve passare dopo ogni modifica
- Dopo 2 tentativi falliti → STOP e chiedi

### Prima di modificare file critici
- Consulta `docs/REMINDERS.md` per errori noti in quell'area

## 🤖 AGENTI (usa autonomamente)
| Situazione | Comando |
|------------|---------|
| Errore/bug | `/@debug` |
| Pre-deploy | `/@security` |
| Database/RLS | `/@supabase` |
| Workflow n8n | `/@n8n` |
| Prompt AI | `/@gemini` |

## 📁 DOCUMENTAZIONE
- @ROADMAP.md → Piano sviluppo
- @docs/REMINDERS.md → Errori noti e soluzioni
- @docs/STORICO-SESSIONI.md → Cronologia lavori
- @docs/ARCHITETTURA.md → Dettagli tecnici

## 🎯 PROSSIMI PASSI
- [ ] [Task priorità alta 1]
- [ ] [Task priorità alta 2]
- [ ] [Task priorità media 1]

## ⚠️ REGOLE FERREE

1. **MAI dire "fatto" senza `npm run build` pulito**
2. **Dopo 2 tentativi falliti → STOP e chiedi**
3. **NON inventare test o dati** — usa quelli reali o chiedi
4. **Se non capisci la richiesta → chiedi PRIMA di scrivere codice**
5. **Mostra cosa hai modificato** — mai solo "ho fixato"

---
_Ultimo update: [DATA] | Righe: ~70/80 | Versione: 1.0_
