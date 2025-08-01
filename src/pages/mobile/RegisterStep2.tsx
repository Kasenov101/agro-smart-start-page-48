import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sprout, 
  ArrowLeft, 
  Building2, 
  Phone, 
  Mail, 
  CreditCard,
  ChevronDown
} from "lucide-react";

const MobileRegisterStep2 = () => {
  const navigate = useNavigate();
  
  const [organizationData, setOrganizationData] = useState({
    name: "",
    identifierType: "",
    identifier: "",
    email: "",
    phone: "",
  });

  const [showIdentifierSelect, setShowIdentifierSelect] = useState(false);

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
      identifier: "",
    });
    setShowIdentifierSelect(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Organization registration:", organizationData);
    navigate("/mobile/dashboard");
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
        <Link to="/mobile/register" className="flex items-center gap-2 text-gray-600 mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Организация</h1>
      </div>

      <div className="px-6 py-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Данные организации</h2>
          <p className="text-gray-600">Шаг 2 из 2</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="text-gray-400">Шаг 1</span>
            <span className="text-green-600 font-medium">Шаг 2</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-full transition-all duration-300"></div>
          </div>
        </div>

        {/* Organization Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Название организации</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                name="name"
                value={organizationData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="ООО Зеленые поля"
                required
              />
            </div>
          </div>

          {/* Identifier Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Тип идентификатора</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowIdentifierSelect(!showIdentifierSelect)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <span className={organizationData.identifierType ? "text-gray-900" : "text-gray-500"}>
                  {organizationData.identifierType === "iin" ? "ИИН" :
                   organizationData.identifierType === "bin" ? "БИН" :
                   "Выберите тип"}
                </span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              
              {showIdentifierSelect && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  <button
                    type="button"
                    onClick={() => handleIdentifierTypeChange("iin")}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl"
                  >
                    ИИН (Индивидуальный идентификационный номер)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIdentifierTypeChange("bin")}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 last:rounded-b-xl border-t border-gray-100"
                  >
                    БИН (Бизнес идентификационный номер)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Identifier Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {organizationData.identifierType === "iin" ? "ИИН" : 
               organizationData.identifierType === "bin" ? "БИН" : "Идентификатор"}
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                name="identifier"
                value={organizationData.identifier}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={getIdentifierPlaceholder()}
                disabled={!organizationData.identifierType}
                maxLength={12}
                required
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

          {/* Organization Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email организации</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={organizationData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="info@company.kz"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Телефон</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={organizationData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+7 (777) 123-45-67"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:bg-green-700 transition-colors"
          >
            Завершить регистрацию
          </button>
        </form>

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

export default MobileRegisterStep2;