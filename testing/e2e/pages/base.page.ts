import { Page, Locator, expect } from '@playwright/test';

/**
 * BASE PAGE - Classe base per tutti i Page Objects
 * 
 * Contiene metodi comuni riusabili da tutte le pagine.
 * Estendi questa classe per creare Page Objects specifici.
 * 
 * @example
 * ```typescript
 * import { BasePage } from './base.page';
 * 
 * export class DashboardPage extends BasePage {
 *   readonly title = this.page.locator('h1');
 *   
 *   async goto() {
 *     await this.page.goto('/dashboard');
 *     await this.waitForPageLoad();
 *   }
 * }
 * ```
 */
export class BasePage {
  readonly loadingSpinner: Locator;
  readonly toast: Locator;
  readonly modal: Locator;
  readonly errorMessage: Locator;

  constructor(protected page: Page) {
    this.loadingSpinner = page.locator('[data-testid="loading"], .loading, .spinner');
    this.toast = page.locator('[data-testid="toast"], .toast, [role="alert"]');
    this.modal = page.locator('[data-testid="modal"], [role="dialog"]');
    this.errorMessage = page.locator('[data-testid="error"], .error-message');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    try {
      await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 5000 });
    } catch {
      // Spinner non presente, ok
    }
  }

  async waitForElement(selector: string, timeout = 10000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async expectPageLoaded() {
    const body = await this.page.locator('body').textContent();
    expect(body).not.toContain('500');
    expect(body).not.toContain('Internal Server Error');
    expect(body).not.toContain('404');
  }

  async closeModalIfOpen() {
    try {
      const closeButton = this.page.locator('[data-testid="modal-close"], button:has-text("×"), button:has-text("Chiudi")');
      if (await closeButton.isVisible({ timeout: 1000 })) {
        await closeButton.click();
        await this.modal.waitFor({ state: 'hidden', timeout: 5000 });
      }
    } catch {
      // Nessun modale aperto
    }
  }

  async expectSuccessToast(text?: string) {
    await expect(this.toast).toBeVisible({ timeout: 5000 });
    if (text) {
      await expect(this.toast).toContainText(text);
    }
  }

  async fillInput(selector: string, value: string) {
    const input = this.page.locator(selector);
    await input.clear();
    await input.fill(value);
  }

  async selectOption(selector: string, value: string) {
    await this.page.locator(selector).click();
    await this.page.locator(`[role="option"]:has-text("${value}")`).click();
  }

  async clickButton(text: string) {
    await this.page.locator(`button:has-text("${text}")`).click();
  }

  async expectUrl(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `e2e-results/${name}.png`, fullPage: true });
  }
}

/**
 * LOGIN PAGE - Pagina di login
 */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"], input[name="email"], #email');
    this.passwordInput = page.locator('input[type="password"], input[name="password"], #password');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorAlert = page.locator('[role="alert"], .error');
  }

  async goto() {
    await this.page.goto('/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForURL(/\/(dashboard|home|\/)/, { timeout: 10000 });
  }

  async expectLoginError() {
    await expect(this.errorAlert).toBeVisible();
  }
}
