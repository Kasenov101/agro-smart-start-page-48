import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Sprout, User, Lock, Mail } from "lucide-react";

const MobileLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
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
    console.log("Mobile Login data:", loginData);
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

        {/* Login Form */}
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