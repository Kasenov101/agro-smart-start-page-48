import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1); // 1 = user, 2 = organization

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    surname: "",
    email: "",
    organization: {
      name: "",
      identifier: "",
      identifierType: "TIN",
      phone: "",
      email: "",
      isHolding: false,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: "user" | "org" = "user"
  ) => {
    const { name, value, type, checked } = e.target;
    if (section === "user") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        organization: {
          ...formData.organization,
          [name]: type === "checkbox" ? checked : value,
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
  
    const payload = {
      login: formData.login,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      surname: formData.surname,
      email: formData.email,
      organization: {
        name: formData.organization.name,
        identifier: formData.organization.identifier,
        identifierType: "TIN", // фиксированное значение
        phone: formData.organization.phone,
        email: formData.organization.email,
        isHolding: formData.organization.isHolding,
      },
    };
  
    try {console.log(payload);
      const response = await fetch("https://your-api.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert("Регистрация прошла успешно!");
        // Redirect или сброс формы
      } else {
        const errorData = await response.json();
        console.error("Ошибка регистрации:", errorData);
        alert(`Ошибка: ${errorData.message || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Сетевая ошибка:", error);
      alert("Ошибка сети. Проверьте подключение к интернету.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-green-600 p-3 rounded-xl">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-gray-900">Smart Center</h1>
              <p className="text-sm text-gray-600">Регистрация</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <InputField label="Телефон (логин)" name="login" type="text" value={formData.login} onChange={handleChange} />
                <InputField label="Имя" name="firstName" value={formData.firstName} onChange={handleChange} />
                <InputField label="Фамилия" name="lastName" value={formData.lastName} onChange={handleChange} />
                <InputField label="Отчество" name="surname" value={formData.surname} onChange={handleChange} />
                <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                <InputField label="Пароль" name="password" type="password" value={formData.password} onChange={handleChange} />
                <InputField label="Подтверждение пароля" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
                <Button type="button" className="w-full bg-green-600 text-white" onClick={() => setStep(2)}>Далее</Button>
              </>
            )}

            {step === 2 && (
              <>
                <InputField label="Название организации" name="name" value={formData.organization.name} onChange={(e) => handleChange(e, "org")} />
                <InputField label="ИНН/Идентификатор" name="identifier" value={formData.organization.identifier} onChange={(e) => handleChange(e, "org")} />
                <InputField label="Email организации" name="email" type="email" value={formData.organization.email} onChange={(e) => handleChange(e, "org")} />
                <InputField label="Телефон организации" name="phone" value={formData.organization.phone} onChange={(e) => handleChange(e, "org")} />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isHolding"
                    name="isHolding"
                    checked={formData.organization.isHolding}
                    onChange={(e) => handleChange(e, "org")}
                  />
                  <Label htmlFor="isHolding">Это холдинг?</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="button" onClick={() => setStep(1)}>Назад</Button>
                  <Button type="submit" className="bg-green-600 text-white">Зарегистрироваться</Button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <Label htmlFor={name} className="text-gray-700">
      {label}
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="mt-1"
      required
    />
  </div>
);

export default Register;
