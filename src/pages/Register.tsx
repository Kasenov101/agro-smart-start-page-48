
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Select, SelectItem, Progress } from "@nextui-org/react";
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
            <Progress 
              value={(currentStep / 2) * 100} 
              classNames={{
                base: "w-full",
                track: "bg-gray-200",
                indicator: "bg-green-600"
              }}
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
                  classNames={{
                    label: "text-gray-700",
                    input: "text-gray-900",
                  }}
                />
                <Input
                  name="lastName"
                  label="Фамилия"
                  placeholder="Иванов"
                  value={userData.lastName}
                  onChange={handleUserDataChange}
                  isRequired
                  classNames={{
                    label: "text-gray-700",
                    input: "text-gray-900",
                  }}
                />
              </div>

              <Input
                name="middleName"
                label="Отчество"
                placeholder="Иванович"
                value={userData.middleName}
                onChange={handleUserDataChange}
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Input
                name="login"
                label="Логин"
                placeholder="ivan_farmer"
                value={userData.login}
                onChange={handleUserDataChange}
                isRequired
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Input
                name="email"
                type="email"
                label="Email адрес"
                placeholder="ivan@example.com"
                value={userData.email}
                onChange={handleUserDataChange}
                isRequired
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Input
                name="password"
                type="password"
                label="Пароль"
                placeholder="Минимум 6 символов"
                value={userData.password}
                onChange={handleUserDataChange}
                isRequired
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Input
                name="confirmPassword"
                type="password"
                label="Подтвердите пароль"
                placeholder="Повторите пароль"
                value={userData.confirmPassword}
                onChange={handleUserDataChange}
                isRequired
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
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
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Select
                label="Тип идентификатора"
                placeholder="Выберите тип"
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  handleIdentifierTypeChange(selectedKey);
                }}
                isRequired
                classNames={{
                  label: "text-gray-700",
                  value: "text-gray-900",
                }}
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
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Input
                name="email"
                type="email"
                label="Email организации"
                placeholder="info@company.kz"
                value={organizationData.email}
                onChange={handleOrganizationDataChange}
                isRequired
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Input
                name="phone"
                type="tel"
                label="Телефон"
                placeholder="+7 (777) 123-45-67"
                value={organizationData.phone}
                onChange={handleOrganizationDataChange}
                isRequired
                classNames={{
                  label: "text-gray-700",
                  input: "text-gray-900",
                }}
              />

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
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
        </div>
      </div>
    </div>
  );
};

export default Register;
