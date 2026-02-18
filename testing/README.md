# 🧪 Testing Automatico

Questa cartella contiene tutto il necessario per il testing automatico del progetto.

## 📁 Struttura

```
testing/
├── playwright.config.ts      # Config Playwright (copia in ROOT progetto)
├── scripts/
│   ├── audit.mjs             # Health check automatico
│   └── schema-check.mjs      # Confronto schema DB
└── e2e/
    ├── pages/
    │   └── base.page.ts      # Page Object base
    └── tests/
        ├── pagine.spec.ts    # Test caricamento pagine
        └── critical-path.spec.ts  # Test flussi business
```

## 🚀 Setup

### 1. Copia i file nel progetto

```bash
# Dalla root del progetto
cp -r testing/scripts ./scripts
cp -r testing/e2e ./e2e
cp testing/playwright.config.ts ./playwright.config.ts
```

### 2. Installa dipendenze

```bash
npm install --save-dev @playwright/test puppeteer
npx playwright install chromium
```

### 3. Aggiungi script a package.json

```json
{
  "scripts": {
    "audit": "node scripts/audit.mjs",
    "schema-check": "node scripts/schema-check.mjs",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

### 4. Personalizza

1. **`scripts/audit.mjs`** → Aggiungi le tue PAGES e SUPABASE_TABLES
2. **`e2e/tests/pagine.spec.ts`** → Aggiungi le tue PAGES
3. **`e2e/tests/critical-path.spec.ts`** → Personalizza per i tuoi flussi business

## 📋 Comandi

```bash
npm run audit           # Health check (pagine + API)
npm run schema-check    # Confronto schema Supabase/Airtable
npm run test:e2e        # Test E2E
npm run test:e2e:ui     # Test E2E con UI interattiva
npm run test:e2e:headed # Test E2E con browser visibile
npm run test:e2e:debug  # Test E2E step-by-step
```

## 🔧 Variabili Ambiente

Crea `.env.test`:

```bash
APP_URL=http://localhost:5173
TEST_USER=test@example.com
TEST_PASSWORD=testpassword
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx
```

## 📖 Documentazione

Vedi `docs-templates/TESTING.md` per la guida completa su:
- Come aggiungere test per nuove feature
- Best practices
- Troubleshooting
