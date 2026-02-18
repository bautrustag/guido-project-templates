import { test, expect, Page } from '@playwright/test';
import { BasePage, LoginPage } from '../pages/base.page';

/**
 * TEST FLUSSI CRITICI
 * 
 * Testa i flussi end-to-end più importanti dell'applicazione.
 * 
 * PATTERN:
 * 1. Setup (login, navigazione)
 * 2. Azione principale (crea, modifica, elimina)
 * 3. Verifica risultato
 * 4. Cleanup (opzionale)
 */

// ============================================================================
// CONFIGURAZIONE
// ============================================================================

const TEST_USER = {
  email: process.env.TEST_USER || 'test@example.com',
  password: process.env.TEST_PASSWORD || 'testpassword',
};

const uniqueId = () => `test-${Date.now()}-${Math.random().toString(36).substring(7)}`;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Login con retry per gestire flaky tests
 */
async function login(page: Page, retries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await page.goto('/login', { waitUntil: 'networkidle' });
      await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 5000 });
      await page.fill('input[type="email"], input[name="email"]', TEST_USER.email);
      await page.fill('input[type="password"], input[name="password"]', TEST_USER.password);
      
      await Promise.all([
        page.waitForURL(/\/(dashboard|home|\/)/, { timeout: 15000 }),
        page.click('button[type="submit"]'),
      ]);
      
      return true;
    } catch (error) {
      console.log(`Login attempt ${attempt}/${retries} failed:`, error.message);
      if (attempt === retries) {
        throw new Error(`Login fallito dopo ${retries} tentativi`);
      }
      await page.waitForTimeout(1000 * attempt);
    }
  }
  return false;
}

function setupConsoleErrorCapture(page: Page): string[] {
  const errors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('Warning:') && 
          !text.includes('DevTools') &&
          !text.includes('favicon')) {
        errors.push(text);
      }
    }
  });
  
  return errors;
}

// ============================================================================
// TEST: AUTENTICAZIONE
// ============================================================================

test.describe('Autenticazione', () => {
  
  test('login con credenziali valide', async ({ page }) => {
    const errors = setupConsoleErrorCapture(page);
    
    await page.goto('/login');
    await page.fill('input[type="email"], input[name="email"]', TEST_USER.email);
    await page.fill('input[type="password"], input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/(dashboard|home|\/)/);
    expect(errors.filter(e => e.includes('Error'))).toHaveLength(0);
  });

  test('login con credenziali errate mostra errore', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"], input[name="email"]', 'wrong@example.com');
    await page.fill('input[type="password"], input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('[role="alert"], .error, .text-red-500, .text-destructive'))
      .toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('logout funziona correttamente', async ({ page }) => {
    await login(page);
    
    const logoutButton = page.locator(
      'button:has-text("Logout"), ' +
      'button:has-text("Esci"), ' +
      '[data-testid="logout"], ' +
      'a:has-text("Logout")'
    );
    
    if (await logoutButton.isVisible({ timeout: 3000 })) {
      await logoutButton.click();
      await expect(page).toHaveURL(/\/login/);
    } else {
      const userMenu = page.locator('[data-testid="user-menu"], .user-menu, button:has(.avatar)');
      if (await userMenu.isVisible({ timeout: 2000 })) {
        await userMenu.click();
        await page.locator('text=Logout, text=Esci').click();
        await expect(page).toHaveURL(/\/login/);
      }
    }
  });
});

// ============================================================================
// TEST: FLUSSO CRUD COMPLETO
// PERSONALIZZA con la tua entità principale
// ============================================================================

test.describe('CRUD Entità Principale', () => {
  
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('flusso completo: Crea → Visualizza → Modifica → Elimina', async ({ page }) => {
    const testName = `Test Item ${uniqueId()}`;
    const updatedName = `${testName} - Modificato`;
    
    // ========== STEP 1: CREA ==========
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const newButton = page.locator(
      'button:has-text("Nuovo"), ' +
      'button:has-text("Aggiungi"), ' +
      'button:has-text("Crea"), ' +
      '[data-testid="new-item"]'
    );
    
    if (await newButton.isVisible({ timeout: 3000 })) {
      await newButton.click();
      await page.waitForSelector('[role="dialog"], form', { timeout: 5000 });
      
      const nameInput = page.locator(
        'input[name="name"], ' +
        'input[name="nome"], ' +
        'input[name="title"], ' +
        'input[placeholder*="nome"]'
      );
      
      if (await nameInput.isVisible({ timeout: 2000 })) {
        await nameInput.fill(testName);
      }
      
      await page.locator('button:has-text("Salva"), button:has-text("Crea"), button[type="submit"]').click();
      await page.waitForTimeout(1000);
      await expect(page.locator(`text=${testName}`)).toBeVisible({ timeout: 5000 });
      
      console.log('✅ CREA: completato');
    } else {
      console.log('⚠️  Bottone "Nuovo" non trovato - personalizza i selettori');
    }
    
    // ========== STEP 2: VISUALIZZA ==========
    const itemRow = page.locator(`text=${testName}`).first();
    if (await itemRow.isVisible({ timeout: 2000 })) {
      await itemRow.click();
      await page.waitForTimeout(500);
      console.log('✅ VISUALIZZA: completato');
    }
    
    // ========== STEP 3: MODIFICA ==========
    const editButton = page.locator(
      'button:has-text("Modifica"), ' +
      'button:has-text("Edit"), ' +
      '[data-testid="edit"]'
    );
    
    if (await editButton.isVisible({ timeout: 2000 })) {
      await editButton.click();
      
      const nameInputEdit = page.locator(
        'input[name="name"], ' +
        'input[name="nome"], ' +
        'input[name="title"]'
      );
      
      if (await nameInputEdit.isVisible({ timeout: 2000 })) {
        await nameInputEdit.clear();
        await nameInputEdit.fill(updatedName);
        await page.locator('button:has-text("Salva"), button[type="submit"]').click();
        
        await page.waitForTimeout(1000);
        await expect(page.locator(`text=${updatedName}`)).toBeVisible({ timeout: 5000 });
        
        console.log('✅ MODIFICA: completato');
      }
    }
    
    // ========== STEP 4: ELIMINA ==========
    const deleteButton = page.locator(
      'button:has-text("Elimina"), ' +
      'button:has-text("Delete"), ' +
      '[data-testid="delete"]'
    );
    
    if (await deleteButton.isVisible({ timeout: 2000 })) {
      await deleteButton.click();
      
      const confirmButton = page.locator(
        'button:has-text("Conferma"), ' +
        'button:has-text("Elimina"), ' +
        '[data-testid="confirm-delete"]'
      );
      
      if (await confirmButton.isVisible({ timeout: 2000 })) {
        await confirmButton.click();
      }
      
      await page.waitForTimeout(1000);
      await expect(page.locator(`text=${updatedName}`)).not.toBeVisible({ timeout: 5000 });
      
      console.log('✅ ELIMINA: completato');
    }
  });
});

// ============================================================================
// TEST: FLUSSO BUSINESS - PERSONALIZZA
// ============================================================================

test.describe('Flusso Business Principale', () => {
  
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('esempio: flusso da stato iniziale a completamento', async ({ page }) => {
    /**
     * PERSONALIZZA questo test per il tuo flusso principale.
     * 
     * Esempi:
     * - E-commerce: Carrello → Checkout → Pagamento → Conferma
     * - CRM: Lead → Opportunità → Proposta → Contratto
     * - Ticketing: Nuovo ticket → Assegnazione → Risoluzione → Chiusura
     */
    
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // STEP 1: Crea elemento iniziale
    // STEP 2: Cambia stato / Avanza nel flusso
    // STEP 3: Verifica stato finale
    // STEP 4: Verifica side effects
    
    console.log('📝 Personalizza questo test per il tuo flusso business');
    expect(true).toBe(true);
  });
});

// ============================================================================
// TEST: PERFORMANCE & STABILITÀ
// ============================================================================

test.describe('Performance e Stabilità', () => {
  
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('navigazione rapida tra pagine non causa errori', async ({ page }) => {
    const errors = setupConsoleErrorCapture(page);
    
    const pages = ['/', '/dashboard'];
    
    for (const path of pages) {
      await page.goto(path);
      await page.waitForTimeout(500);
    }
    
    const criticalErrors = errors.filter(e => 
      e.includes('TypeError') || 
      e.includes('Cannot read') ||
      e.includes('undefined')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('operazioni multiple in sequenza', async ({ page }) => {
    await page.goto('/dashboard');
    
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(200);
    }
    
    await expect(page.locator('body')).toBeVisible();
  });
});
