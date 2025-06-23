
import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'danger' | 'info' | 'default' | 'warning';

interface ToastProps {
  type?: ToastType;
  title?: string;
  message: string;
  onClose?: () => void;
  duration?: number;
  static?: boolean;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700',
    closeColor: 'text-green-400 hover:text-green-600'
  },
  danger: {
    icon: XCircle,
    bgColor: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700',
    closeColor: 'text-red-400 hover:text-red-600'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700',
    closeColor: 'text-blue-400 hover:text-blue-600'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700',
    closeColor: 'text-yellow-400 hover:text-yellow-600'
  },
  default: {
    icon: AlertCircle,
    bgColor: 'bg-gray-50 border-gray-200',
    iconColor: 'text-gray-600',
    titleColor: 'text-gray-800',
    messageColor: 'text-gray-700',
    closeColor: 'text-gray-400 hover:text-gray-600'
  }
};

export const Toast: React.FC<ToastProps> = ({
  type = 'default',
  title,
  message,
  onClose,
  duration = 5000,
  static: isStatic = false
}) => {
  const config = toastConfig[type];
  const Icon = config.icon;

  React.useEffect(() => {
    if (duration > 0 && !isStatic) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isStatic]);

  return (
    <div
      className={cn(
        'max-w-md w-full mx-auto rounded-lg border p-4 shadow-lg',
        isStatic ? 'relative' : 'fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300',
        config.bgColor
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={cn('h-5 w-5', config.iconColor)} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn('text-sm font-medium', config.titleColor)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', config.messageColor, title ? 'mt-1' : '')}>
            {message}
          </div>
        </div>
        {onClose && (
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className={cn(
                'inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                config.closeColor
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
