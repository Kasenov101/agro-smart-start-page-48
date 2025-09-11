
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardBody } from "@nextui-org/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sprout, ArrowLeft, Building2, Phone, Mail, CreditCard, MessageSquare, RotateCcw, CheckCircle } from "lucide-react";

const RegisterStep2 = () => {
  const navigate = useNavigate();
  
  const [organizationData, setOrganizationData] = useState({
    name: "",
    identifierType: "",
    identifier: "",
    email: "",
    phone: "",
  });

  const [smsState, setSmsState] = useState({
    isSent: true,
    isVerified: false,
    timer: 60,
    isActive: true,
    smsCode: "",
    error: null as string | null,
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

  useEffect(() => {
    if (smsState.isActive && smsState.timer > 0) {
      const interval = setInterval(() => {
        setSmsState(prev => ({
          ...prev,
          timer: prev.timer - 1
        }));
      }, 1000);
      return () => clearInterval(interval);
    } else if (smsState.timer === 0) {
      setSmsState(prev => ({
        ...prev,
        isActive: false
      }));
    }
  }, [smsState.timer, smsState.isActive]);

  const handleSendSms = () => {
    if (!organizationData.phone) return;
    
    setSmsState({
      ...smsState,
      isSent: true,
      timer: 60,
      isActive: true,
      error: null,
    });
    console.log("SMS отправлен на:", organizationData.phone);
  };

  const handleResendSms = () => {
    setSmsState({
      ...smsState,
      timer: 60,
      isActive: true,
      error: null,
    });
    console.log("SMS отправлен повторно на:", organizationData.phone);
  };

  const handleSmsCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSmsState({
      ...smsState,
      smsCode: e.target.value,
      error: null,
    });
  };

  const handleVerifySms = () => {
    // Имитация проверки кода
    if (smsState.smsCode === "123456") {
      setSmsState({
        ...smsState,
        isVerified: true,
        error: null,
      });
    } else {
      setSmsState({
        ...smsState,
        error: "Неверный код подтверждения",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!smsState.isVerified) {
      setSmsState({
        ...smsState,
        error: "Необходимо подтвердить номер телефона",
      });
      return;
    }
    
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
                <div className="flex gap-2">
                  <div className="relative flex-1">
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
                      disabled={smsState.isVerified}
                    />
                    {smsState.isVerified && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                    )}
                  </div>
                  {!smsState.isVerified && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={smsState.isSent ? handleResendSms : handleSendSms}
                      disabled={!organizationData.phone || (smsState.isActive && smsState.timer > 0)}
                      className="whitespace-nowrap"
                    >
                      {smsState.isSent ? 
                        (smsState.timer > 0 ? `${formatTime(smsState.timer)}` : "Отправить") 
                        : "SMS"
                      }
                    </Button>
                  )}
                </div>

                {/* SMS Verification Panel */}
                {smsState.isSent && !smsState.isVerified && (
                  <div className="bg-white rounded border border-gray-200 p-2 mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <div className="bg-green-600 p-1 rounded">
                          <MessageSquare className="h-2 w-2 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-xs">SMS код</h3>
                          <p className="text-xs text-gray-500">{organizationData.phone}</p>
                        </div>
                      </div>
                      {smsState.timer > 0 && (
                        <span className="text-xs font-mono text-green-600 bg-green-50 px-1 py-0.5 rounded">
                          {formatTime(smsState.timer)}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[...Array(6)].map((_, index) => (
                          <Input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={smsState.smsCode[index] || ''}
                            onChange={(e) => {
                              const newCode = smsState.smsCode.split('');
                              newCode[index] = e.target.value;
                              setSmsState({
                                ...smsState,
                                smsCode: newCode.join('').slice(0, 6),
                                error: null,
                              });
                              
                              // Auto-focus next input
                              if (e.target.value && index < 5) {
                                const nextInput = (e.target as HTMLInputElement).parentElement?.nextElementSibling?.querySelector('input');
                                nextInput?.focus();
                              }
                            }}
                            onKeyDown={(e) => {
                              // Auto-focus previous input on backspace
                              if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
                                const prevInput = (e.target as HTMLInputElement).parentElement?.previousElementSibling?.querySelector('input');
                                prevInput?.focus();
                              }
                            }}
                            className="text-center text-xs font-mono h-6 w-6 rounded border focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            placeholder="0"
                          />
                        ))}
                        <Button
                          type="button"
                          onClick={handleVerifySms}
                          disabled={smsState.smsCode.length < 6}
                          className="ml-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs h-6 rounded"
                        >
                          OK
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleResendSms}
                          disabled={smsState.timer > 0}
                          className="text-xs h-auto p-1 text-gray-600 hover:text-green-600"
                        >
                          {smsState.timer > 0 ? 'Ожидание...' : 'Отправить снова'}
                        </Button>
                        
                        {smsState.timer > 0 && (
                          <div className="w-16 bg-gray-200 rounded-full h-0.5">
                            <div 
                              className="bg-green-500 h-0.5 rounded-full transition-all duration-1000"
                              style={{ width: `${((60 - smsState.timer) / 60) * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* SMS Error */}
                {smsState.error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription className="text-sm">
                      {smsState.error}
                    </AlertDescription>
                  </Alert>
                )}
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
