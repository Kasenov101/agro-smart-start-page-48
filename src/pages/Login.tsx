
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Card, CardBody, CardHeader, Checkbox } from "@nextui-org/react";
import { Sprout, Eye, EyeOff, Phone, Building2, MessageSquare, User } from "lucide-react";
import { SmsTimer } from "@/components/ui/sms-timer";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [step, setStep] = useState(1); // 1 - login form, 2 - SMS verification
  const [timer, setTimer] = useState(0);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    phone: "",
    bin: "",
    smsCode: "",
    rememberMe: false,
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === "phone" && step === 1) {
      // Симуляция отправки SMS
      setStep(2);
      setTimer(60);
    } else {
      console.log("Login data:", loginData);
    }
  };

  const handleSmsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SMS verification:", loginData.smsCode);
  };

  const resendSms = () => {
    setTimer(60);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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
                Войдите в свой аккаунт
              </p>
            </div>
          </CardHeader>

          <CardBody className="p-8">
            {step === 1 ? (
              <>
                {/* Method Selection */}
                <div className="mb-6">
                  <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setLoginMethod("email")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        loginMethod === "email"
                          ? "bg-white text-green-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <User className="h-4 w-4" />
                      Логин
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("phone")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        loginMethod === "phone"
                          ? "bg-white text-green-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <MessageSquare className="h-4 w-4" />
                      СМС
                    </button>
                  </div>
                </div>

                {/* Login Forms */}
                {loginMethod === "email" ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      name="email"
                      type="email"
                      label="Email адрес"
                      placeholder="ivan@example.com"
                      value={loginData.email}
                      onChange={handleInputChange}
                      isRequired
                      startContent={<User className="h-4 w-4 text-gray-400" />}
                      classNames={{
                        label: "text-gray-700",
                        input: "text-gray-900",
                      }}
                    />

                    <Input
                      name="password"
                      label="Пароль"
                      placeholder="Введите пароль"
                      value={loginData.password}
                      onChange={handleInputChange}
                      isRequired
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      classNames={{
                        label: "text-gray-700",
                        input: "text-gray-900",
                      }}
                    />

                    <div className="flex items-center justify-between">
                      <Checkbox
                        name="rememberMe"
                        isSelected={loginData.rememberMe}
                        onValueChange={(checked) =>
                          setLoginData({ ...loginData, rememberMe: checked })
                        }
                        classNames={{
                          label: "text-gray-700",
                        }}
                      >
                        Запомнить меня
                      </Checkbox>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-green-600 hover:text-green-700"
                      >
                        Забыли пароль?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6"
                      size="lg"
                    >
                      Войти
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      name="phone"
                      type="tel"
                      label="Номер телефона"
                      placeholder="+7 (___) ___-__-__"
                      value={loginData.phone}
                      onChange={handleInputChange}
                      isRequired
                      startContent={<Phone className="h-4 w-4 text-gray-400" />}
                      classNames={{
                        label: "text-gray-700",
                        input: "text-gray-900",
                      }}
                    />

                    <Input
                      name="bin"
                      type="text"
                      label="БИН организации"
                      placeholder="123456789012"
                      value={loginData.bin}
                      onChange={handleInputChange}
                      isRequired
                      startContent={<Building2 className="h-4 w-4 text-gray-400" />}
                      classNames={{
                        label: "text-gray-700",
                        input: "text-gray-900",
                      }}
                    />

                    <div className="flex items-center justify-between">
                      <Checkbox
                        name="rememberMe"
                        isSelected={loginData.rememberMe}
                        onValueChange={(checked) =>
                          setLoginData({ ...loginData, rememberMe: checked })
                        }
                        classNames={{
                          label: "text-gray-700",
                        }}
                      >
                        Запомнить меня
                      </Checkbox>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6"
                      size="lg"
                    >
                      Отправить SMS
                    </Button>
                  </form>
                )}
              </>
            ) : (
              <form onSubmit={handleSmsSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Введите код из SMS</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Код отправлен на номер {loginData.phone}
                  </p>
                </div>

                <Input
                  name="smsCode"
                  type="text"
                  label="SMS код"
                  placeholder="_ _ _ _ _ _"
                  value={loginData.smsCode}
                  onChange={handleInputChange}
                  isRequired
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                  classNames={{
                    label: "text-gray-700",
                    input: "text-gray-900 text-center text-xl tracking-[0.5em]",
                  }}
                />

                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-gray-600">
                      Повторная отправка через {timer} сек
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={resendSms}
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Отправить код повторно
                    </button>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6"
                  size="lg"
                >
                  Подтвердить
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-gray-600"
                  onClick={() => setStep(1)}
                >
                  ← Назад
                </Button>
              </form>
            )}

            {/* SMS Timer Demo - постоянно видимый */}
            <div className="mt-6">
              <SmsTimer 
                initialTime={60}
                onResend={() => console.log('SMS отправлен повторно')}
                isActive={true}
                phoneNumber={loginData.phone || "+7 (777) 123-45-67"}
              />
            </div>

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

export default Login;
