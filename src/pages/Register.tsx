
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Select, SelectItem, Progress, Card, CardBody } from "@nextui-org/react";
import { Sprout, ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react";

const Register = () => {
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

  const [organizationData, setOrganizationData] = useState({
    name: "",
    identifierType: "",
    identifier: "",
    email: "",
    phone: "",
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
      color = "danger";
      progress = 25;
    } else if (score === 3) {
      strength = "Средний";
      color = "warning";
      progress = 50;
    } else if (score === 4) {
      strength = "Хороший";
      color = "primary";
      progress = 75;
    } else {
      strength = "Отличный";
      color = "success";
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

  const handleOrganizationDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizationData({
      ...organizationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIdentifierTypeChange = (value: string) => {
    setOrganizationData({
      ...organizationData,
      identifierType: value,
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User data:", userData);
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Final registration:", { userData, organizationData });
    // Логика регистрации будет добавлена после подключения Supabase
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardBody className="p-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-green-600 p-3 rounded-xl">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">Smart Center</h1>
                <p className="text-sm text-gray-600">
                  Регистрация - Шаг {currentStep} из 2
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span className={currentStep === 1 ? "text-green-600 font-medium" : ""}>
                  Данные пользователя
                </span>
                <span className={currentStep === 2 ? "text-green-600 font-medium" : ""}>
                  Данные организации
                </span>
              </div>
              <Progress 
                value={(currentStep / 2) * 100} 
                color="success"
                className="w-full"
              />
            </div>

            {/* Step 1: User Data */}
            {currentStep === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    label="Имя"
                    placeholder="Иван"
                    value={userData.firstName}
                    onChange={handleUserDataChange}
                    isRequired
                    variant="bordered"
                  />
                  <Input
                    name="lastName"
                    label="Фамилия"
                    placeholder="Иванов"
                    value={userData.lastName}
                    onChange={handleUserDataChange}
                    isRequired
                    variant="bordered"
                  />
                </div>

                <Input
                  name="middleName"
                  label="Отчество"
                  placeholder="Иванович"
                  value={userData.middleName}
                  onChange={handleUserDataChange}
                  variant="bordered"
                />

                <Input
                  name="login"
                  label="Логин"
                  placeholder="ivan_farmer"
                  value={userData.login}
                  onChange={handleUserDataChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  name="email"
                  type="email"
                  label="Email адрес"
                  placeholder="ivan@example.com"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  isRequired
                  variant="bordered"
                />

                <div className="space-y-2">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Пароль"
                    placeholder="Минимум 8 символов"
                    value={userData.password}
                    onChange={handleUserDataChange}
                    isRequired
                    variant="bordered"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    }
                  />
                  
                  {/* Индикатор сложности пароля */}
                  {userData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Сложность пароля:</span>
                        <span className={`text-sm font-medium ${
                          passwordStrength.color === 'danger' ? 'text-red-500' :
                          passwordStrength.color === 'warning' ? 'text-yellow-500' :
                          passwordStrength.color === 'primary' ? 'text-blue-500' :
                          passwordStrength.color === 'success' ? 'text-green-500' : ''
                        }`}>
                          {passwordStrength.strength}
                        </span>
                      </div>
                      
                      <Progress
                        value={passwordStrength.progress}
                        color={passwordStrength.color as any}
                        size="sm"
                        className="w-full"
                      />
                      
                      {/* Критерии пароля */}
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div className={`flex items-center gap-1 ${passwordStrength.criteria.length ? 'text-green-600' : 'text-gray-400'}`}>
                          {passwordStrength.criteria.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>Минимум 8 символов</span>
                        </div>
                        <div className={`flex items-center gap-1 ${passwordStrength.criteria.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                          {passwordStrength.criteria.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>Заглавная буква</span>
                        </div>
                        <div className={`flex items-center gap-1 ${passwordStrength.criteria.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                          {passwordStrength.criteria.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>Строчная буква</span>
                        </div>
                        <div className={`flex items-center gap-1 ${passwordStrength.criteria.number ? 'text-green-600' : 'text-gray-400'}`}>
                          {passwordStrength.criteria.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>Цифра</span>
                        </div>
                        <div className={`flex items-center gap-1 ${passwordStrength.criteria.special ? 'text-green-600' : 'text-gray-400'}`}>
                          {passwordStrength.criteria.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>Специальный символ</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Подтвердите пароль"
                  placeholder="Повторите пароль"
                  value={userData.confirmPassword}
                  onChange={handleUserDataChange}
                  isRequired
                  variant="bordered"
                  color={userData.confirmPassword && userData.password !== userData.confirmPassword ? "danger" : "default"}
                  errorMessage={userData.confirmPassword && userData.password !== userData.confirmPassword ? "Пароли не совпадают" : ""}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  }
                />

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  Далее
                </Button>
              </form>
            )}

            {/* Step 2: Organization Data */}
            {currentStep === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center mb-4">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={handlePrevStep}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-medium text-gray-900">
                    Данные организации
                  </h3>
                </div>

                <Input
                  name="name"
                  label="Название организации"
                  placeholder="ООО Зеленые поля"
                  value={organizationData.name}
                  onChange={handleOrganizationDataChange}
                  isRequired
                  variant="bordered"
                />

                <Select
                  label="Тип идентификатора"
                  placeholder="Выберите тип"
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    handleIdentifierTypeChange(selectedKey);
                  }}
                  isRequired
                  variant="bordered"
                >
                  <SelectItem key="iin" value="iin">ИИН</SelectItem>
                  <SelectItem key="bin" value="bin">БИН</SelectItem>
                </Select>

                <Input
                  name="identifier"
                  label={organizationData.identifierType === "iin" ? "ИИН" : organizationData.identifierType === "bin" ? "БИН" : "Идентификатор"}
                  placeholder={organizationData.identifierType === "iin" ? "123456789012" : "123456789012"}
                  value={organizationData.identifier}
                  onChange={handleOrganizationDataChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  name="email"
                  type="email"
                  label="Email организации"
                  placeholder="info@company.kz"
                  value={organizationData.email}
                  onChange={handleOrganizationDataChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  name="phone"
                  type="tel"
                  label="Телефон"
                  placeholder="+7 (777) 123-45-67"
                  value={organizationData.phone}
                  onChange={handleOrganizationDataChange}
                  isRequired
                  variant="bordered"
                />

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  Создать аккаунт
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Уже есть аккаунт?{" "}
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Войти
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

export default Register;
