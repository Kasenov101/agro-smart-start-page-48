import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Sprout, MessageSquare, ArrowLeft, RotateCcw } from "lucide-react";

const LoginSms = () => {
  const [smsCode, setSmsCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(true);

  // Имитация данных пользователя
  const mockData = {
    phone: "+7 (777) 123-45-67",
    bin: "123456789012"
  };

  useEffect(() => {
    if (isActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsActive(false);
    }
  }, [timer, isActive]);

  const handleResend = () => {
    setTimer(60);
    setIsActive(true);
    console.log('SMS отправлен повторно');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SMS код:", smsCode);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-xl">
          <CardHeader className="flex flex-col items-center pb-0 pt-8">
            <div className="bg-green-600 p-3 rounded-xl mb-4">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Smart Center</h1>
              <p className="text-sm text-gray-600 mt-1">
                SMS Верификация
              </p>
            </div>
          </CardHeader>

          <CardBody className="p-8">
            {/* SMS Timer */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">SMS Верификация</h3>
                  <p className="text-sm text-gray-600">Код отправлен на {mockData.phone}</p>
                  <p className="text-xs text-gray-500">БИН: {mockData.bin}</p>
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
                      style={{ width: `${((60 - timer) / 60) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* SMS Code Input */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Введите код из SMS</h3>
                <p className="text-sm text-gray-600 mt-1">
                  6-значный код подтверждения
                </p>
              </div>

              <Input
                name="smsCode"
                type="text"
                label="SMS код"
                placeholder="_ _ _ _ _ _"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                isRequired
                maxLength={6}
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900 text-center text-xl tracking-[0.5em]",
                  inputWrapper: "h-14"
                }}
              />

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6"
                size="lg"
                isDisabled={smsCode.length < 6}
              >
                Подтвердить
              </Button>

              <Link to="/login">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-gray-600"
                  startContent={<ArrowLeft className="h-4 w-4" />}
                >
                  Назад к входу
                </Button>
              </Link>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Нет аккаунта?{" "}
                <Link
                  to="/register"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Вернуться на главную
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginSms;