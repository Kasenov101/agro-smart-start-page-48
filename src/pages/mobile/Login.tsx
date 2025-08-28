import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Sprout, User, Lock, Mail, Phone, Building2, MessageSquare } from "lucide-react";

const MobileLogin = () => {
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
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === "phone" && step === 1) {
      // Симуляция отправки SMS
      setStep(2);
      setTimer(60);
    } else {
      console.log("Mobile Login data:", loginData);
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
        <Link
          to="/mobile"
          className="flex items-center gap-2 text-gray-600 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Вход</h1>
      </div>

      <div className="px-6 py-8">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sprout className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Center</h2>
          <p className="text-gray-600">Добро пожаловать обратно</p>
        </div>

        {step === 1 ? (
          <>
            {/* Login Method Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  loginMethod === "email"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                <Mail className="h-4 w-4 mx-auto mb-1" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  loginMethod === "phone"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                <Phone className="h-4 w-4 mx-auto mb-1" />
                Телефон
              </button>
            </div>

            {loginMethod === "email" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Введите ваш email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Пароль</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type={isVisible ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Введите ваш пароль"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute right-4 top-4 text-gray-400"
                    >
                      {isVisible ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Запомнить меня</span>
                  </label>
                  <Link to="#" className="text-sm text-green-600 font-medium">
                    Забыли пароль?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:bg-green-700 transition-colors"
                >
                  Войти
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Номер телефона</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={loginData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                </div>

                {/* BIN Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">БИН организации</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="bin"
                      value={loginData.bin}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="123456789012"
                      required
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Запомнить меня</span>
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:bg-green-700 transition-colors"
                >
                  Отправить SMS
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="space-y-6">
            {/* SMS Verification Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Введите код из SMS</h3>
              <p className="text-gray-600">
                Код отправлен на номер<br />
                <span className="font-medium">{loginData.phone}</span>
              </p>
            </div>

            <form onSubmit={handleSmsSubmit} className="space-y-6">
              {/* SMS Code Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">SMS код</label>
                <input
                  type="text"
                  name="smsCode"
                  value={loginData.smsCode}
                  onChange={handleInputChange}
                  className="w-full py-4 px-4 bg-white border border-gray-200 rounded-xl text-gray-900 text-center text-2xl tracking-[0.5em] placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="_ _ _ _ _ _"
                  maxLength={6}
                  required
                />
              </div>

              {/* Timer / Resend */}
              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Повторная отправка через {timer} сек
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={resendSms}
                    className="text-sm text-green-600 font-medium"
                  >
                    Отправить код повторно
                  </button>
                )}
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:bg-green-700 transition-colors"
              >
                Подтвердить
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-gray-600 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                ← Назад
              </button>
            </form>
          </div>
        )}

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Нет аккаунта?{" "}
            <Link to="/mobile/register" className="text-green-600 font-semibold">
              Зарегистрироваться
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Или войти через</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="text-xl mr-2">🔵</span>
              Facebook
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="text-xl mr-2">📧</span>
              Google
            </button>
          </div>
        </div>
      </div>

      {/* Safe area */}
      <div className="h-8"></div>
    </div>
  );
};

export default MobileLogin;