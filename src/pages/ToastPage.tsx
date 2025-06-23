
import React from 'react';
import { ToastDemo } from '@/components/ToastDemo';

const ToastPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Демонстрация Toast уведомлений
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ToastDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastPage;
