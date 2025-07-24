import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Sprout } from "lucide-react";
import { Card, CardBody, Input, Button, Checkbox, Link } from "@nextui-org/react";

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
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <Button
          as={Link}
          href="/mobile"
          variant="light"
          size="sm"
          startContent={<ArrowLeft className="h-4 w-4" />}
        >
          Назад
        </Button>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <Sprout className="h-8 w-8 mr-2 text-primary" />
        <span className="text-2xl font-bold">Smart Center</span>
      </div>

      {/* Login Form */}
      <Card className="max-w-sm mx-auto w-full">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Вход</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              variant="bordered"
              size="lg"
              isRequired
            />

            <Input
              label="Пароль"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              variant="bordered"
              size="lg"
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            <div className="flex items-center justify-between">
              <Checkbox
                name="rememberMe"
                isSelected={loginData.rememberMe}
                onChange={handleInputChange}
                size="sm"
              >
                Запомнить меня
              </Checkbox>
              <Link href="#" size="sm" className="text-primary">
                Забыли пароль?
              </Link>
            </div>

            <Button 
              type="submit" 
              color="primary" 
              size="lg"
              className="w-full"
            >
              Войти
            </Button>
          </form>

          <div className="text-center mt-6 space-y-3">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{" "}
              <Link href="/mobile/register" className="text-primary font-medium">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MobileLogin;