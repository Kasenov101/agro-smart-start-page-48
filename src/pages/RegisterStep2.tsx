
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardBody } from "@nextui-org/react";
import { Sprout, ArrowLeft, Building2, Phone, Mail, CreditCard } from "lucide-react";

const RegisterStep2 = () => {
  const navigate = useNavigate();
  
  const [organizationData, setOrganizationData] = useState({
    name: "",
    identifierType: "",
    identifier: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizationData({
      ...organizationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIdentifierTypeChange = (value: string) => {
    setOrganizationData({
      ...organizationData,
      identifierType: value,
      identifier: "", // Очищаем поле при смене типа
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Organization registration:", organizationData);
    // Здесь будет логика регистрации организации
    // После успешной регистрации перенаправляем на dashboard
    navigate("/dashboard");
  };

  const getIdentifierPlaceholder = () => {
    switch (organizationData.identifierType) {
      case "iin":
        return "Введите 12-значный ИИН";
      case "bin":
        return "Введите 12-значный БИН";
      default:
        return "Выберите тип идентификатора";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardBody className="p-8">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-green-600 p-3 rounded-xl">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">Smart Center</h1>
                <p className="text-sm text-gray-600">
                  Регистрация организации - Шаг 2 из 2
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span className="text-gray-400">Данные пользователя</span>
                <span className="text-green-600 font-medium">Данные организации</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full transition-all duration-300"></div>
              </div>
            </div>

            {/* Back button and title */}
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/register")}
                className="mr-2 p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center">
                <Building2 className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Данные организации
                </h2>
              </div>
            </div>

            {/* Organization registration form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Название организации *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="ООО Зеленые поля"
                  value={organizationData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              {/* Identifier type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Тип идентификатора *
                </Label>
                <Select onValueChange={handleIdentifierTypeChange} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите тип идентификатора" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iin">ИИН (Индивидуальный идентификационный номер)</SelectItem>
                    <SelectItem value="bin">БИН (Бизнес идентификационный номер)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Identifier number */}
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                  {organizationData.identifierType === "iin" ? "ИИН *" : organizationData.identifierType === "bin" ? "БИН *" : "Идентификатор *"}
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="identifier"
                    name="identifier"
                    placeholder={getIdentifierPlaceholder()}
                    value={organizationData.identifier}
                    onChange={handleInputChange}
                    required
                    disabled={!organizationData.identifierType}
                    className="pl-10"
                    maxLength={12}
                  />
                </div>
                {organizationData.identifierType && (
                  <p className="text-xs text-gray-500">
                    {organizationData.identifierType === "iin" 
                      ? "12-значный номер для индивидуальных предпринимателей" 
                      : "12-значный номер для юридических лиц"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email организации *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="info@company.kz"
                    value={organizationData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Телефон *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+7 (777) 123-45-67"
                    value={organizationData.phone}
                    onChange={handleInputChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base font-medium"
                size="lg"
              >
                Завершить регистрацию
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
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

export default RegisterStep2;
