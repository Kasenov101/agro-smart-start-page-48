
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout, ArrowLeft } from "lucide-react";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
        <div className="bg-white rounded-2xl shadow-xl p-8">
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
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: User Data */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700">
                    Имя
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={userData.firstName}
                    onChange={handleUserDataChange}
                    placeholder="Иван"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700">
                    Фамилия
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={userData.lastName}
                    onChange={handleUserDataChange}
                    placeholder="Иванов"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="middleName" className="text-gray-700">
                  Отчество
                </Label>
                <Input
                  id="middleName"
                  name="middleName"
                  type="text"
                  value={userData.middleName}
                  onChange={handleUserDataChange}
                  placeholder="Иванович"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="login" className="text-gray-700">
                  Логин
                </Label>
                <Input
                  id="login"
                  name="login"
                  type="text"
                  value={userData.login}
                  onChange={handleUserDataChange}
                  placeholder="ivan_farmer"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email адрес
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  placeholder="ivan@example.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Пароль
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleUserDataChange}
                  placeholder="Минимум 6 символов"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Подтвердите пароль
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={handleUserDataChange}
                  placeholder="Повторите пароль"
                  className="mt-1"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
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
                  type="button"
                  variant="ghost"
                  onClick={handlePrevStep}
                  className="p-1 mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-medium text-gray-900">
                  Данные организации
                </h3>
              </div>

              <div>
                <Label htmlFor="organizationName" className="text-gray-700">
                  Название организации
                </Label>
                <Input
                  id="organizationName"
                  name="name"
                  type="text"
                  value={organizationData.name}
                  onChange={handleOrganizationDataChange}
                  placeholder="ООО Зеленые поля"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="identifierType" className="text-gray-700">
                  Тип идентификатора
                </Label>
                <Select onValueChange={handleIdentifierTypeChange} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iin">ИИН</SelectItem>
                    <SelectItem value="bin">БИН</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="identifier" className="text-gray-700">
                  {organizationData.identifierType === "iin" ? "ИИН" : organizationData.identifierType === "bin" ? "БИН" : "Идентификатор"}
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={organizationData.identifier}
                  onChange={handleOrganizationDataChange}
                  placeholder={organizationData.identifierType === "iin" ? "123456789012" : "123456789012"}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="organizationEmail" className="text-gray-700">
                  Email организации
                </Label>
                <Input
                  id="organizationEmail"
                  name="email"
                  type="email"
                  value={organizationData.email}
                  onChange={handleOrganizationDataChange}
                  placeholder="info@company.kz"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  Телефон
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={organizationData.phone}
                  onChange={handleOrganizationDataChange}
                  placeholder="+7 (777) 123-45-67"
                  className="mt-1"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
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
        </div>
      </div>
    </div>
  );
};

export default Register;
