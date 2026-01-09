---
description: Debug helper - investigazione sistematica errori
allowed-tools: Read, Grep, Glob, Bash
---

# Debug Assistant

Aiuta a investigare e risolvere errori in modo sistematico.

## ⚡ AZIONE IMMEDIATA

Quando invocato, **ESEGUI SUBITO** questi comandi (senza chiedere):

```bash
# 1. Errori di compilazione
npm run build 2>&1 | tail -30

# 2. File modificati di recente
git diff --stat 2>/dev/null || echo "Non in repo git"

# 3. Errori lint
npm run lint 2>&1 | tail -20 || echo "Lint non configurato"

# 4. Ultimi commit (contesto)
git log --oneline -5 2>/dev/null || echo "Non in repo git"
```

**POI** presenta i risultati e le ipotesi all'utente.

---

## Analisi Errore

Quando hai lo stack trace:

```
🔍 ANALISI ERRORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tipo: [TypeError | ReferenceError | SyntaxError | ...]
Messaggio: [messaggio esatto]
File: [path:linea]
Contesto: [cosa stava succedendo]
```

---

## Check Rapidi per Tipo

### TypeError: Cannot read property 'X' of undefined
```bash
# Cerca dove viene usata la variabile
grep -rn "\.X" --include="*.ts" --include="*.tsx" src/ | head -20
```
- [ ] L'oggetto esiste prima dell'accesso?
- [ ] Dati asincroni non ancora caricati?
- [ ] Optional chaining mancante (`?.`)

### ReferenceError: X is not defined
```bash
# Cerca import mancanti
grep -rn "import.*X" --include="*.ts" --include="*.tsx" src/
```
- [ ] Import mancante?
- [ ] Typo nel nome?
- [ ] Scope errato?

### Network Error / Fetch failed
- [ ] URL corretto?
- [ ] CORS configurato?
- [ ] Server running?
- [ ] Auth token valido?

### Build Error
```bash
# Dettagli errore TypeScript
npx tsc --noEmit 2>&1 | head -50
```
- [ ] Sintassi errata?
- [ ] Import circolare?
- [ ] Tipi incompatibili?

### React: Too many re-renders
- [ ] State update in render?
- [ ] useEffect senza deps?
- [ ] Callback che cambia identità?

### Supabase Error
```bash
# Controlla se RLS è il problema
# (da verificare in Supabase Dashboard)
```
- [ ] RLS policy blocca?
- [ ] Foreign key constraint?
- [ ] Column not found = typo?

---

## Ipotesi e Soluzioni

Genera 2-3 ipotesi ordinate per probabilità:

```
📋 IPOTESI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. [Più probabile] 
   Verifica: [comando o azione]
   
2. [Seconda ipotesi]
   Verifica: [comando o azione]
   
3. [Terza ipotesi]
   Verifica: [comando o azione]
```

---

## Quando Risolvi

```
✅ SOLUZIONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Causa: [spiegazione chiara]
Fix: [cosa hai fatto]
Prevenzione: [come evitare in futuro]
```

**Aggiorna REMINDERS.md** se è un errore non ovvio:

```markdown
### [Categoria] - [Problema]
- **Sintomo:** [Come si manifesta]
- **Causa:** [Cosa lo causava]
- **Soluzione:** [Fix applicato]
- **Data:** YYYY-MM-DD
```

---

## Note

- **Non indovinare**, investiga con i comandi
- Rimuovi i `console.log` di debug dopo aver risolto
- Se il problema persiste dopo 15 min → approccio diverso o chiedi aiuto
