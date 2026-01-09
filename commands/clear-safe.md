---
description: Salva stato e prepara per /clear
allowed-tools: Read, Write, Bash
---

# Clear Safe - Salvataggio Prima di Reset

Questo comando salva lo stato del lavoro prima di fare `/clear`.

## Step 1: Raccogli Info Sessione

Chiedi mentalmente (o verifica):
- Cosa abbiamo fatto in questa sessione?
- Quali file sono stati modificati?
- Ci sono task incompleti?
- Problemi incontrati?

## Step 2: Aggiorna Storico

Aggiungi una riga a `docs/STORICO-SESSIONI.md`:

```markdown
| [DATA OGGI] | [Descrizione breve lavoro] | [file1.ts, file2.tsx] | [Note] |
```

**NON aggiungere a CLAUDE.md** - lo storico va SOLO in docs/

## Step 3: Aggiorna TODO

Se ci sono task incompleti, aggiorna la sezione "PROSSIMI PASSI" in CLAUDE.md:

```markdown
## 🎯 PROSSIMI PASSI
- [ ] [Task incompleto da questa sessione]
- [ ] [Altro task]
```

## Step 4: Aggiorna REMINDERS (se necessario)

Se abbiamo risolto un bug non ovvio, aggiungi entry in `docs/REMINDERS.md`:

```markdown
### [Categoria] - [Problema]
- **Sintomo:** [Come si manifestava]
- **Causa:** [Cosa lo causava]
- **Soluzione:** [Come risolto]
- **Data:** [OGGI]
```

## Step 5: Conferma

Rispondi all'utente:

```
✅ Stato salvato!

📝 Aggiornati:
- docs/STORICO-SESSIONI.md (nuova entry)
- CLAUDE.md > PROSSIMI PASSI (se task incompleti)
- docs/REMINDERS.md (se nuovi bug risolti)

🔄 Ora puoi digitare /clear per resettare il contesto.

Quando riparti, i TODO saranno visibili in CLAUDE.md.
```

---

## Note

- Questo comando NON esegue /clear automaticamente
- L'utente deve digitare /clear manualmente dopo
- Serve a non perdere contesto importante
