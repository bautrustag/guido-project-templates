---
description: Verifica stato contesto e salute CLAUDE.md
allowed-tools: Bash, Read
---

# Context Health Check

Verifica rapida dello stato del contesto.

## 1. Dimensione CLAUDE.md

```bash
wc -l CLAUDE.md
```

### Valutazione
| Righe | Status | Azione |
|-------|--------|--------|
| < 80 | ✅ OK | Nessuna |
| 80-150 | ⚠️ Alto | Pianifica riduzione |
| > 150 | ❌ Critico | Riduci ORA |

## 2. Contenuti Problematici

Cerca in CLAUDE.md:

```bash
grep -c "STORICO\|storico\|Sessione\|sessione" CLAUDE.md || echo "0"
```

Se > 0: **Sposta lo storico in `docs/STORICO-SESSIONI.md`**

```bash
grep -c "^|.*|.*|$" CLAUDE.md || echo "0"
```

Se > 10 righe di tabelle: **Valuta se spostarle in docs/**

## 3. File docs/ esistenti

```bash
ls -la docs/*.md 2>/dev/null || echo "Cartella docs/ vuota o mancante"
```

Verifica esistenza di:
- [ ] `docs/STORICO-SESSIONI.md`
- [ ] `docs/REMINDERS.md`
- [ ] `docs/ARCHITETTURA.md`

---

## Output

```markdown
# 📊 Context Check - [DATA]

## CLAUDE.md
- Righe: [N]/80
- Status: ✅/⚠️/❌
- Storico interno: Sì/No

## Raccomandazioni
[Se necessario, lista azioni]
```

---

## Se CLAUDE.md è troppo grande

Suggerisci all'utente:

```
⚠️ CLAUDE.md ha [N] righe (limite consigliato: 80)

Azioni consigliate:
1. Sposta storico sessioni → docs/STORICO-SESSIONI.md
2. Sposta dettagli tecnici → docs/ARCHITETTURA.md  
3. Sposta bug risolti → docs/REMINDERS.md
4. Mantieni solo: stack, comandi, file critici, regole, TODO

Vuoi che ti aiuti a ristrutturare il file?
```
