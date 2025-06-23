
import { useState, useCallback } from 'react';
import { ToastType } from '@/components/ui/toast-custom';

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

let toastCounter = 0;

export const useCustomToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((
    type: ToastType,
    message: string,
    title?: string,
    duration?: number
  ) => {
    const id = `toast-${++toastCounter}`;
    const newToast: ToastItem = {
      id,
      type,
      title,
      message,
      duration
    };

    setToasts(prev => [...prev, newToast]);

    // Автоматически удаляем toast через указанное время
    if (duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration || 5000);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string, title?: string, duration?: number) => 
    addToast('success', message, title, duration), [addToast]);

  const danger = useCallback((message: string, title?: string, duration?: number) => 
    addToast('danger', message, title, duration), [addToast]);

  const info = useCallback((message: string, title?: string, duration?: number) => 
    addToast('info', message, title, duration), [addToast]);

  const warning = useCallback((message: string, title?: string, duration?: number) => 
    addToast('warning', message, title, duration), [addToast]);

  const show = useCallback((message: string, title?: string, duration?: number) => 
    addToast('default', message, title, duration), [addToast]);

  return {
    toasts,
    removeToast,
    success,
    danger,
    info,
    warning,
    show
  };
};
