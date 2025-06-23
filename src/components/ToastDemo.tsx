
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCustomToast } from '@/hooks/use-custom-toast';

export const ToastDemo: React.FC = () => {
  const toast = useCustomToast();

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">Демонстрация Toast уведомлений</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Button
          onClick={() => toast.success('Операция выполнена успешно!', 'Успех')}
          className="bg-green-600 hover:bg-green-700"
        >
          Success
        </Button>
        
        <Button
          onClick={() => toast.danger('Произошла ошибка при выполнении операции!', 'Ошибка')}
          variant="destructive"
        >
          Danger
        </Button>
        
        <Button
          onClick={() => toast.info('Новая информация доступна для ознакомления', 'Информация')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Info
        </Button>
        
        <Button
          onClick={() => toast.warning('Внимание! Требуется ваше действие', 'Предупреждение')}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          Warning
        </Button>
        
        <Button
          onClick={() => toast.show('Обычное уведомление', 'По умолчанию')}
          variant="outline"
        >
          Default
        </Button>
      </div>
    </div>
  );
};
