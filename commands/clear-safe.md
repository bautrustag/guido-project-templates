---
description: Salva stato nei file condivisi e prepara per reset/switch tool
allowed-tools: Read, Write, Bash
---

# Clear Safe — Salvataggio Stato Condiviso

Questo comando salva lo stato nei **file condivisi** prima di fare `/clear` o switchare tool.
I file condivisi sono il ponte tra Claude Code, Codex e Gemini.

## Step 1: Raccogli Info Sessione

Verifica mentalmente:
- Cosa abbiamo fatto in questa sessione?
- Quali file sono stati modificati?
- Ci sono task incompleti?
- Problemi incontrati e risolti?

## Step 2: Aggiorna SESSION-STATE.md

Aggiorna `docs/SESSION-STATE.md` con lo stato attuale:

```markdown
## Ultimo Aggiornamento
- **Data:** [DATA OGGI e ORA]
- **Tool usato:** Claude Code
- **Cosa è stato fatto:** [Descrizione]

## Stato Build
- **`npm run build`:** ✅ / ❌
- **Errori noti:** [...]

## Lavori in Corso
- [ ] [Se qualcosa è incompleto]

## Prossimi Passi
1. [Prossimo task concreto]
2. [...]

## Note per il Prossimo LLM
- [Qualcosa di importante]
```

## Step 3: Aggiorna Storico

Aggiungi una riga a `docs/STORICO-SESSIONI.md`:

```markdown
| [DATA OGGI] | [Descrizione breve lavoro] | [file1.ts, file2.tsx] | CC | [Note] |
```

**Tool:** CC = Claude Code, Codex = Codex, Gemini = Gemini

## Step 4: Aggiorna TODO in CLAUDE.md

Se ci sono task incompleti, aggiorna "PROSSIMI PASSI" in CLAUDE.md:

```markdown
## 🎯 PROSSIMI PASSI
- [ ] [Task incompleto da questa sessione]
```

## Step 5: Aggiorna REMINDERS (se necessario)

Se abbiamo risolto un bug non ovvio, aggiungi entry in `docs/REMINDERS.md`:

```markdown
### [Problema in breve]
- **Sintomo:** [Come si manifestava]
- **Causa:** [Cosa lo causava]
- **Soluzione:** [Come risolto]
- **Data:** [OGGI]
```

## Step 6: Conferma

```
✅ Stato salvato nei file condivisi!

📝 Aggiornati:
- docs/SESSION-STATE.md (stato attuale)
- docs/STORICO-SESSIONI.md (nuova entry, tool: CC)
- CLAUDE.md > PROSSIMI PASSI (se task incompleti)
- docs/REMINDERS.md (se nuovi bug risolti)

🔄 Ora puoi:
- /clear → reset contesto Claude Code
- Aprire Codex/Gemini → /status per ripartire da qui
```

---

## Note

- Questo comando NON esegue /clear automaticamente
- I file condivisi sono leggibili da TUTTI i tool AI
- Il prossimo tool (qualsiasi) troverà lo stato aggiornato
