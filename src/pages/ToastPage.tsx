
import React from 'react';
import { Card, CardBody, CardHeader, Button, Chip } from '@nextui-org/react';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const ToastPage = () => {
  const toastExamples = [
    {
      type: 'success',
      title: 'Успех',
      message: 'Операция выполнена успешно!',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'success'
    },
    {
      type: 'error',
      title: 'Ошибка',
      message: 'Произошла ошибка при выполнении операции!',
      icon: <XCircle className="h-5 w-5" />,
      color: 'danger'
    },
    {
      type: 'info',
      title: 'Информация',
      message: 'Новая информация доступна для ознакомления',
      icon: <Info className="h-5 w-5" />,
      color: 'primary'
    },
    {
      type: 'warning',
      title: 'Предупреждение',
      message: 'Внимание! Требуется ваше действие',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'warning'
    }
  ];

  const showToast = (type: string) => {
    // Здесь будет логика показа toast уведомлений
    console.log(`Показать ${type} уведомление`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Демонстрация Toast уведомлений
            </h1>
            <p className="text-gray-600">
              Примеры различных типов уведомлений в системе
            </p>
          </div>
          
          {/* Статические примеры */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold">Примеры Toast уведомлений</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              {toastExamples.map((toast, index) => (
                <Card key={index} className={`border-l-4 ${
                  toast.color === 'success' ? 'border-l-green-500 bg-green-50' :
                  toast.color === 'danger' ? 'border-l-red-500 bg-red-50' :
                  toast.color === 'primary' ? 'border-l-blue-500 bg-blue-50' :
                  'border-l-orange-500 bg-orange-50'
                }`}>
                  <CardBody>
                    <div className="flex items-center space-x-3">
                      <div className={`${
                        toast.color === 'success' ? 'text-green-600' :
                        toast.color === 'danger' ? 'text-red-600' :
                        toast.color === 'primary' ? 'text-blue-600' :
                        'text-orange-600'
                      }`}>
                        {toast.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {toast.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {toast.message}
                        </p>
                      </div>
                      <Chip
                        size="sm"
                        color={toast.color as any}
                        variant="flat"
                      >
                        {toast.type}
                      </Chip>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </CardBody>
          </Card>

          {/* Интерактивные кнопки */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold">Тестирование уведомлений</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  color="success"
                  variant="flat"
                  className="w-full"
                  onClick={() => showToast('success')}
                >
                  Успех
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  className="w-full"
                  onClick={() => showToast('error')}
                >
                  Ошибка
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  className="w-full"
                  onClick={() => showToast('info')}
                >
                  Инфо
                </Button>
                <Button
                  color="warning"
                  variant="flat"
                  className="w-full"
                  onClick={() => showToast('warning')}
                >
                  Предупреждение
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Описание функциональности */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold">О Toast уведомлениях</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <p className="text-gray-600">
                Toast уведомления - это небольшие всплывающие сообщения, которые 
                информируют пользователя о состоянии операций или важных событиях 
                в системе.
              </p>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Типы уведомлений:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <strong>Успех:</strong> Подтверждение успешного выполнения операции
                  </li>
                  <li className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-600 mr-2" />
                    <strong>Ошибка:</strong> Уведомление о возникшей проблеме
                  </li>
                  <li className="flex items-center">
                    <Info className="h-4 w-4 text-blue-600 mr-2" />
                    <strong>Информация:</strong> Общая информация для пользователя
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" />
                    <strong>Предупреждение:</strong> Важная информация, требующая внимания
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToastPage;
