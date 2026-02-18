# 🧪 Guida Testing

Questa guida spiega come usare e estendere il sistema di testing automatico.

## 📋 Comandi

```bash
npm run audit           # Health check (pagine + API)
npm run schema-check    # Confronto schema DB
npm run test:e2e        # Test E2E
npm run test:e2e:ui     # UI interattiva
npm run test:e2e:headed # Browser visibile
npm run test:e2e:debug  # Step-by-step
```

---

## 🔍 Audit (`npm run audit`)

Naviga automaticamente tutte le pagine e verifica:
- ✅ Caricamento senza errori HTTP
- ✅ Nessun errore JavaScript in console
- ✅ API funzionanti
- ✅ Score salute (0-100%)

### Configurare Audit

Modifica `scripts/audit.mjs`:

```javascript
// Pagine da testare
const PAGES = [
  '/',
  '/dashboard',
  '/clienti',
  '/contratti',
];

// Tabelle Supabase da verificare
const SUPABASE_TABLES = [
  'clienti',
  'contratti',
  'prodotti',
];

// Configurazione login
const AUTH_CONFIG = {
  loginUrl: '/login',
  usernameSelector: 'input[type="email"]',
  passwordSelector: 'input[type="password"]',
  submitSelector: 'button[type="submit"]',
};
```

---

## 📝 Come Aggiungere Test

### Nuova Pagina

1. Aggiungi a `scripts/audit.mjs`:
```javascript
const PAGES = [
  // ... esistenti
  '/nuova-pagina',
];
```

2. Aggiungi a `e2e/tests/pagine.spec.ts`:
```javascript
const PAGES = [
  // ... esistenti
  { path: '/nuova-pagina', name: 'Nuova Pagina' },
];
```

3. Verifica: `npm run audit`

### Nuovo Flusso CRUD

In `e2e/tests/critical-path.spec.ts`:

```typescript
test.describe('Gestione Clienti', () => {
  
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('crea cliente', async ({ page }) => {
    const testName = `Cliente Test ${Date.now()}`;
    
    await page.goto('/clienti');
    await page.click('button:has-text("Nuovo")');
    await page.fill('input[name="nome"]', testName);
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button:has-text("Salva")');
    
    await expect(page.locator(`text=${testName}`)).toBeVisible();
  });

  test('modifica cliente', async ({ page }) => {
    // ...
  });

  test('elimina cliente', async ({ page }) => {
    // ...
  });
});
```

### Nuovo Flusso Business

Esempio: Opportunità → Contratto

```typescript
test('opportunità chiusa vinta crea contratto', async ({ page }) => {
  await login(page);
  
  // Crea opportunità
  await page.goto('/opportunita');
  await page.click('button:has-text("Nuova")');
  await page.fill('input[name="nome"]', 'Test Opp');
  await page.click('button:has-text("Salva")');
  
  // Cambia stato
  await page.click('text=Test Opp');
  await page.selectOption('select[name="stato"]', 'chiusa_vinta');
  
  // Verifica wizard contratto
  await expect(page.locator('[role="dialog"]')).toBeVisible();
  await page.click('button:has-text("Conferma")');
  
  // Verifica contratto creato
  await page.goto('/contratti');
  await expect(page.locator('text=Test Opp')).toBeVisible();
});
```

---

## 🔧 Best Practices

### 1. Selettori Robusti

```typescript
// ❌ Fragile
await page.click('.btn-primary');

// ✅ Semantico
await page.click('button:has-text("Salva")');

// ✅ Data-testid (ancora meglio)
await page.click('[data-testid="save-button"]');
```

### 2. Attese Esplicite

```typescript
// ❌ Race condition
await page.goto('/dashboard');
await page.click('button');

// ✅ Attendi caricamento
await page.goto('/dashboard');
await page.waitForLoadState('networkidle');
await page.click('button');
```

### 3. ID Unici nei Test

```typescript
// ❌ Conflitti tra test paralleli
const testName = 'Test Item';

// ✅ ID unico
const testName = `Test Item ${Date.now()}`;
```

### 4. Login con Retry

```typescript
async function login(page: Page, retries = 3) {
  for (let i = 1; i <= retries; i++) {
    try {
      await page.goto('/login');
      await page.fill('input[type="email"]', email);
      await page.fill('input[type="password"]', password);
      await page.click('button[type="submit"]');
      await page.waitForURL('/dashboard', { timeout: 10000 });
      return;
    } catch (e) {
      if (i === retries) throw e;
      await page.waitForTimeout(1000 * i);
    }
  }
}
```

---

## ❓ Troubleshooting

### Timeout

```bash
# Vedi cosa succede
npm run test:e2e:headed
```

### Element not found

1. Apri DevTools (F12)
2. Verifica selettore
3. Aggiungi `data-testid` al componente

### Test flaky

1. Aggiungi retry: `retries: 2` in config
2. Usa `waitForLoadState('networkidle')`
3. Aumenta timeout per azioni lente

### CI fallisce, locale passa

1. Aumenta timeout (CI è più lento)
2. Evita dipendenze da timing
3. Usa `waitFor` invece di `waitForTimeout`

---

## 🚀 Checklist Pre-Deploy

```bash
# 1. Health check
npm run audit

# 2. Schema allineato
npm run schema-check

# 3. Test E2E
npm run test:e2e

# Se tutto passa → deploy sicuro
```
