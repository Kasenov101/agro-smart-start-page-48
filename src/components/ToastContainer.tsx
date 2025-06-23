
import React from 'react';
import { Toast } from '@/components/ui/toast-custom';
import { useCustomToast } from '@/hooks/use-custom-toast';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCustomToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
