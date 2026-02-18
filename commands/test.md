# Command: /test

Esegue i test del progetto.

## Uso

```
/test              # Esegue audit + test E2E
/test audit        # Solo health check
/test e2e          # Solo test E2E
/test e2e:ui       # Test E2E con UI debug
/test schema       # Confronto schema DB
```

## Azioni

### /test (completo)

1. Esegui `npm run audit`
2. Se audit passa, esegui `npm run test:e2e`
3. Riporta risultati

### /test audit

1. Esegui `npm run audit`
2. Mostra:
   - Pagine testate e risultato
   - Errori console trovati
   - Errori network
   - Score salute sistema (%)

### /test e2e

1. Esegui `npm run test:e2e`
2. Mostra:
   - Test passati/falliti
   - Errori specifici
   - Link a report HTML se disponibile

### /test e2e:ui

1. Esegui `npm run test:e2e:ui`
2. Apre UI interattiva Playwright per debug

### /test schema

1. Esegui `npm run schema-check`
2. Mostra:
   - Tabelle Supabase
   - Tabelle Airtable (se configurato)
   - Differenze e azioni consigliate

## Output atteso

```
📊 AUDIT APPLICAZIONE
==================================================
🌐 Pagine: 24/24 ✅
⚠️  Errori Console: 0 ✅
🔌 Errori Network: 0 ✅
🗄️  API: 27/27 ✅

🏥 SALUTE SISTEMA: OTTIMA (100%)
==================================================

🎭 TEST E2E
==================================================
✅ Autenticazione (3 test)
✅ CRUD Entità (1 test)
✅ Performance (2 test)

Totale: 6/6 passati
==================================================
```

## Troubleshooting

Se i test falliscono:

1. **Timeout** → Aumenta timeout in playwright.config.ts
2. **Element not found** → Verifica selettori con `npm run test:e2e:headed`
3. **Login flaky** → Usa helper `login()` con retry
4. **CI fails, local passes** → Aumenta timeout, usa `waitForLoadState`
