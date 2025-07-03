
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Card, CardBody, CardHeader, Checkbox } from "@nextui-org/react";
import { Sprout, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
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
    console.log("Login data:", loginData);
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
                Войдите в свой аккаунт
              </p>
            </div>
          </CardHeader>

          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                name="email"
                type="email"
                label="Email адрес"
                placeholder="ivan@example.com"
                value={loginData.email}
                onChange={handleInputChange}
                isRequired
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
