import { defineConfig, devices } from '@playwright/test';

/**
 * PLAYWRIGHT CONFIG - Test E2E
 * 
 * Configurazione per test end-to-end con Playwright.
 * 
 * IMPORTANTE: Questo file va nella ROOT del progetto, non in e2e/
 * 
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  // Directory dei test
  testDir: './e2e/tests',
  
  // Timeout per singolo test (30 secondi)
  timeout: 30000,
  
  // Timeout per expect (5 secondi)
  expect: {
    timeout: 5000,
  },
  
  // Riprova test falliti 1 volta
  retries: process.env.CI ? 2 : 1,
  
  // Numero di worker paralleli
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter - HTML per report visuale
  reporter: [
    ['html', { outputFolder: 'e2e-report', open: 'never' }],
    ['list'],
  ],
  
  // Configurazione globale
  use: {
    // URL base dell'applicazione - PERSONALIZZA
    baseURL: process.env.APP_URL || 'http://localhost:5173',
    
    // Screenshot solo su fallimento
    screenshot: 'only-on-failure',
    
    // Video solo su fallimento
    video: 'retain-on-failure',
    
    // Trace per debug su fallimento
    trace: 'retain-on-failure',
    
    // Timeout azioni (click, fill, etc.)
    actionTimeout: 10000,
    
    // Timeout navigazione
    navigationTimeout: 30000,
  },
  
  // Browser da testare
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  // Avvia dev server automaticamente
  webServer: {
    command: 'npm run dev',
    port: 5173, // PERSONALIZZA in base al tuo progetto
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  
  // Directory per risultati
  outputDir: 'e2e-results',
  
  // Ignora snapshot per ora
  ignoreSnapshots: true,
});
