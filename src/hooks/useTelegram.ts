import { useEffect, useState } from 'react';
import { TelegramWebApp, TelegramUser } from '@/types/telegram';
import { telegramService } from '@/services/telegram';

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initTelegram = () => {
      const app = telegramService.init();
      if (app) {
        setWebApp(app);
        setUser(app.initDataUnsafe?.user || null);
        setIsValid(telegramService.validateInitData());
      }
      setIsLoading(false);
    };

    if (typeof window !== 'undefined') {
      if (window.Telegram?.WebApp) {
        initTelegram();
      } else {
        const checkTelegram = setInterval(() => {
          if (window.Telegram?.WebApp) {
            clearInterval(checkTelegram);
            initTelegram();
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkTelegram);
          setIsLoading(false);
        }, 5000);
      }
    }
  }, []);

  return {
    webApp,
    user,
    isValid,
    isLoading,
    telegramService,
  };
};