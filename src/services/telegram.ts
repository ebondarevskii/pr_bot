import { TelegramWebApp, TelegramUser } from '@/types/telegram';
import { validateTelegramHash } from '@/utils/security';
import { TELEGRAM_CONFIG } from '@/utils/constants';

class TelegramService {
  private webApp: TelegramWebApp | null = null;

  init(): TelegramWebApp | null {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.webApp = window.Telegram.WebApp;
      this.webApp.ready();
      return this.webApp;
    }
    return null;
  }

  getWebApp(): TelegramWebApp | null {
    return this.webApp;
  }

  getUser(): TelegramUser | null {
    return this.webApp?.initDataUnsafe?.user || null;
  }

  getInitData(): string {
    return this.webApp?.initData || '';
  }

  validateInitData(): boolean {
    if (!TELEGRAM_CONFIG.botToken) {
      console.error('Telegram bot token not configured');
      return false;
    }
    return validateTelegramHash(this.getInitData(), TELEGRAM_CONFIG.botToken);
  }

  showMainButton(text: string, callback: () => void): void {
    if (!this.webApp) return;
    
    this.webApp.MainButton.setText(text);
    this.webApp.MainButton.onClick(callback);
    this.webApp.MainButton.show();
  }

  hideMainButton(): void {
    if (!this.webApp) return;
    this.webApp.MainButton.hide();
  }

  showBackButton(callback: () => void): void {
    if (!this.webApp) return;
    
    this.webApp.BackButton.onClick(callback);
    this.webApp.BackButton.show();
  }

  hideBackButton(): void {
    if (!this.webApp) return;
    this.webApp.BackButton.hide();
  }

  close(): void {
    if (!this.webApp) return;
    this.webApp.close();
  }

  expand(): void {
    if (!this.webApp) return;
    this.webApp.expand();
  }

  hapticFeedback(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void {
    if (!this.webApp) return;
    this.webApp.HapticFeedback.impactOccurred(style);
  }

  getThemeParams() {
    return this.webApp?.themeParams || {};
  }

  getColorScheme(): 'light' | 'dark' {
    return this.webApp?.colorScheme || 'light';
  }
}

export const telegramService = new TelegramService();