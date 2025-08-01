import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Info, AlertTriangle, ArrowLeft } from 'lucide-react';

const MobileToastPage = () => {
  const toastExamples = [
    {
      type: 'success',
      title: 'Успех',
      message: 'Операция выполнена успешно!',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      type: 'error',
      title: 'Ошибка',
      message: 'Произошла ошибка при выполнении операции!',
      icon: <XCircle className="h-5 w-5" />,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      type: 'info',
      title: 'Информация',
      message: 'Новая информация доступна для ознакомления',
      icon: <Info className="h-5 w-5" />,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      type: 'warning',
      title: 'Предупреждение',
      message: 'Внимание! Требуется ваше действие',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  const showToast = (type: string) => {
    console.log(`Показать ${type} уведомление`);
    // Здесь будет логика показа toast уведомлений
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="h-11 bg-white flex items-center justify-center">
        <div className="w-full max-w-sm flex items-center justify-between px-6 text-xs font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center shadow-sm">
        <Link to="/mobile/dashboard" className="flex items-center gap-2 text-gray-600 mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Toast уведомления</h1>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Демонстрация Toast</h2>
          <p className="text-gray-600">Примеры различных типов уведомлений</p>
        </div>

        {/* Toast Examples */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Примеры уведомлений</h3>
          </div>
          <div className="p-6 space-y-4">
            {toastExamples.map((toast, index) => (
              <div 
                key={index} 
                className={`${toast.bgColor} ${toast.borderColor} border rounded-2xl p-4`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${toast.color} rounded-full p-2 flex items-center justify-center text-white`}>
                    {toast.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {toast.title}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {toast.message}
                    </p>
                  </div>
                  <div className={`${toast.color} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                    {toast.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Buttons */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Тестирование</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => showToast('success')}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                Успех
              </button>
              <button
                onClick={() => showToast('error')}
                className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Ошибка
              </button>
              <button
                onClick={() => showToast('info')}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors"
              >
                Инфо
              </button>
              <button
                onClick={() => showToast('warning')}
                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-yellow-600 transition-colors"
              >
                Предупреждение
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">О Toast уведомлениях</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Toast уведомления - это небольшие всплывающие сообщения, которые 
              информируют пользователя о состоянии операций или важных событиях 
              в системе.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Типы уведомлений:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Успех</div>
                    <div className="text-sm text-gray-600">Подтверждение успешного выполнения операции</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Ошибка</div>
                    <div className="text-sm text-gray-600">Уведомление о возникшей проблеме</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Информация</div>
                    <div className="text-sm text-gray-600">Общая информация для пользователя</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Предупреждение</div>
                    <div className="text-sm text-gray-600">Важная информация, требующая внимания</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safe area */}
      <div className="h-8"></div>
    </div>
  );
};

export default MobileToastPage;