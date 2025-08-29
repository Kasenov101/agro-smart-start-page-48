import React, { useState, useEffect } from 'react';
import { MessageSquare, RotateCcw } from 'lucide-react';
import { Button } from '@nextui-org/react';

interface SmsTimerProps {
  initialTime?: number;
  onResend?: () => void;
  isActive?: boolean;
  phoneNumber?: string;
}

export const SmsTimer: React.FC<SmsTimerProps> = ({ 
  initialTime = 60, 
  onResend,
  isActive = true,
  phoneNumber = "+7 (777) 123-45-67"
}) => {
  const [timer, setTimer] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(isActive);

  useEffect(() => {
    if (isRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsRunning(false);
    }
  }, [timer, isRunning]);

  const handleResend = () => {
    setTimer(initialTime);
    setIsRunning(true);
    onResend?.();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-green-600 p-2 rounded-lg">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">SMS Верификация</h3>
          <p className="text-sm text-gray-600">Код отправлен на {phoneNumber}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {formatTime(timer)}
          </div>
          <div className="text-xs text-gray-500">
            {timer > 0 ? 'до повторной отправки' : 'можно отправить заново'}
          </div>
        </div>
        
        <Button
          size="sm"
          variant={timer > 0 ? "flat" : "solid"}
          color={timer > 0 ? "default" : "success"}
          isDisabled={timer > 0}
          onClick={handleResend}
          startContent={<RotateCcw className="h-4 w-4" />}
        >
          {timer > 0 ? 'Ожидание' : 'Отправить'}
        </Button>
      </div>
      
      {timer > 0 && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((initialTime - timer) / initialTime) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};