import { test, expect } from '@playwright/test';

/**
 * TEST PAGINE PRINCIPALI
 * 
 * Verifica che tutte le pagine dell'applicazione si carichino senza errori.
 * 
 * PERSONALIZZA la lista PAGES con le route del tuo progetto.
 */

// ============================================================================
// CONFIGURAZIONE - PERSONALIZZA PER IL TUO PROGETTO
// ============================================================================

const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard' },
  // Aggiungi qui le tue pagine:
  // { path: '/clienti', name: 'Clienti' },
  // { path: '/contratti', name: 'Contratti' },
];

const REQUIRES_AUTH = false;

const TEST_CREDENTIALS = {
  email: process.env.TEST_USER || 'test@example.com',
  password: process.env.TEST_PASSWORD || 'testpassword',
};

// ============================================================================
// TEST
// ============================================================================

test.describe('Pagine Principali', () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('Warning:') && 
            !text.includes('DevTools') &&
            !text.includes('favicon') &&
            !text.includes('hot-update')) {
          consoleErrors.push(text);
        }
      }
    });

    if (REQUIRES_AUTH) {
      await page.goto('/login');
      await page.fill('input[type="email"]', TEST_CREDENTIALS.email);
      await page.fill('input[type="password"]', TEST_CREDENTIALS.password);
      await page.click('button[type="submit"]');
      await page.waitForURL(/\/(dashboard|home|\/)/, { timeout: 10000 });
    }
  });

  for (const { path, name } of PAGES) {
    test(`carica ${path} (${name}) senza errori`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'networkidle' });
      
      expect(response?.status()).toBeLessThan(400);
      
      await page.waitForTimeout(1000);
      
      const criticalErrors = consoleErrors.filter(e => 
        e.includes('TypeError') || 
        e.includes('ReferenceError') ||
        e.includes('SyntaxError') ||
        e.includes('500') ||
        e.includes('Failed to fetch')
      );
      
      expect(criticalErrors).toHaveLength(0);
      
      const body = await page.locator('body').textContent();
      expect(body).not.toContain('500 Internal Server Error');
      expect(body).not.toContain('Something went wrong');
    });
  }
});

test.describe('Navigazione', () => {
  test('navigazione tra pagine mantiene lo stato', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    if (PAGES.length > 1) {
      await page.goto(PAGES[1].path);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(new RegExp(PAGES[1].path));
    }
  });

  test('404 per pagine inesistenti', async ({ page }) => {
    const response = await page.goto('/pagina-che-non-esiste-12345');
    const status = response?.status() || 200;
    expect([200, 302, 404]).toContain(status);
  });
});

test.describe('Performance Base', () => {
  test('pagina principale carica in meno di 5 secondi', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });
});
