import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sprout, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  User,
  Mail,
  Lock,
  AtSign,
  ChevronRight
} from "lucide-react";

const MobileRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Функция для проверки сложности пароля
  const getPasswordStrength = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(criteria).filter(Boolean).length;
    
    let strength = "";
    let color = "";
    let progress = 0;

    if (score === 0) {
      strength = "";
      color = "";
      progress = 0;
    } else if (score <= 2) {
      strength = "Слабый";
      color = "bg-red-500";
      progress = 25;
    } else if (score === 3) {
      strength = "Средний";
      color = "bg-yellow-500";
      progress = 50;
    } else if (score === 4) {
      strength = "Хороший";
      color = "bg-blue-500";
      progress = 75;
    } else {
      strength = "Отличный";
      color = "bg-green-500";
      progress = 100;
    }

    return { criteria, strength, color, progress };
  };

  const passwordStrength = getPasswordStrength(userData.password);

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User data:", userData);
    setCurrentStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Final registration:", userData);
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
        <Link to="/mobile" className="flex items-center gap-2 text-gray-600 mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Регистрация</h1>
      </div>

      <div className="px-6 py-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sprout className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Center</h2>
          <p className="text-gray-600">Создайте свой аккаунт</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className={currentStep === 1 ? "text-green-600 font-medium" : ""}>
              Шаг 1
            </span>
            <span className={currentStep === 2 ? "text-green-600 font-medium" : ""}>
              Шаг 2
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: User Data */}
        {currentStep === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Имя</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleUserDataChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Иван"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Фамилия</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleUserDataChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Иванов"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Middle Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Отчество</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  name="middleName"
                  value={userData.middleName}
                  onChange={handleUserDataChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Иванович"
                />
              </div>
            </div>

            {/* Login */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Логин</label>
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  name="login"
                  value={userData.login}
                  onChange={handleUserDataChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ivan_farmer"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ivan@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleUserDataChange}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Минимум 8 символов"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Подтвердите пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleUserDataChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    userData.confirmPassword && userData.password !== userData.confirmPassword 
                      ? 'border-red-300' 
                      : 'border-gray-200'
                  }`}
                  placeholder="Повторите пароль"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {userData.confirmPassword && userData.password !== userData.confirmPassword && (
                <p className="text-red-500 text-sm">Пароли не совпадают</p>
              )}
            </div>

            {/* Password Strength */}
            {userData.password && (
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Сложность пароля:</span>
                  <span className="text-sm font-medium text-gray-900">{passwordStrength.strength}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${passwordStrength.progress}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`flex items-center gap-1 ${passwordStrength.criteria.length ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.criteria.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>8+ символов</span>
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.criteria.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.criteria.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>Заглавная</span>
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.criteria.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.criteria.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>Строчная</span>
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.criteria.number ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.criteria.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>Цифра</span>
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.criteria.special ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.criteria.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>Спецсимвол</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              Далее
              <ChevronRight className="h-5 w-5" />
            </button>
          </form>
        )}

        {/* Sign In Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Уже есть аккаунт?{" "}
            <Link to="/mobile/login" className="text-green-600 font-semibold">
              Войти
            </Link>
          </p>
        </div>
      </div>

      {/* Safe area */}
      <div className="h-8"></div>
    </div>
  );
};

export default MobileRegister;