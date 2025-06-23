
import React from 'react';
import { ToastDemo } from '@/components/ToastDemo';
import { Toast } from '@/components/ui/toast-custom';

const ToastPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Демонстрация Toast уведомлений
          </h1>
          
          {/* Статические примеры */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Примеры Toast уведомлений</h2>
            <div className="space-y-4">
              <div className="relative">
                <Toast
                  type="success"
                  title="Успех"
                  message="Операция выполнена успешно!"
                  static={true}
                />
              </div>
              
              <div className="relative">
                <Toast
                  type="danger"
                  title="Ошибка"
                  message="Произошла ошибка при выполнении операции!"
                  static={true}
                />
              </div>
              
              <div className="relative">
                <Toast
                  type="info"
                  title="Информация"
                  message="Новая информация доступна для ознакомления"
                  static={true}
                />
              </div>
              
              <div className="relative">
                <Toast
                  type="warning"
                  title="Предупреждение"
                  message="Внимание! Требуется ваше действие"
                  static={true}
                />
              </div>
              
              <div className="relative">
                <Toast
                  type="default"
                  title="По умолчанию"
                  message="Обычное уведомление"
                  static={true}
                />
              </div>
            </div>
          </div>

          {/* Интерактивная демонстрация */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Интерактивная демонстрация</h2>
            <ToastDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastPage;
