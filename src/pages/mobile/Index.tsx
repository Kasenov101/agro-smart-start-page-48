import { Link } from "react-router-dom";
import { 
  Sprout, 
  ChevronRight, 
  Smartphone, 
  BarChart3, 
  Droplets,
  Shield,
  Zap,
  Users
} from "lucide-react";

const MobileIndex = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Аналитика",
      description: "Детальные отчеты и прогнозы",
      color: "bg-blue-500"
    },
    {
      icon: Droplets,
      title: "Полив",
      description: "Автоматизированная система",
      color: "bg-cyan-500"
    },
    {
      icon: Shield,
      title: "Безопасность",
      description: "Защищенные данные",
      color: "bg-green-500"
    },
    {
      icon: Zap,
      title: "Автоматизация",
      description: "Умные алгоритмы",
      color: "bg-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar Mockup */}
      <div className="h-11 bg-background flex items-center justify-center">
        <div className="w-full max-w-sm flex items-center justify-between px-6 text-xs font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* App Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-center">
          <Sprout className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Smart Center</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-12 text-center bg-white">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sprout className="h-10 w-10 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Умное управление
          <br />
          <span className="text-green-600">сельским хозяйством</span>
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Современные технологии для максимизации урожайности и оптимизации ресурсов
        </p>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link
            to="/mobile/register"
            className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-green-700 transition-colors"
          >
            Начать работу
            <ChevronRight className="h-5 w-5" />
          </Link>
          
          <Link
            to="/mobile/dashboard"
            className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Демо версия
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 py-8 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Возможности платформы
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-8 bg-white">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600 mb-1">500+</div>
            <div className="text-sm text-gray-600">Ферм</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-1">99.9%</div>
            <div className="text-sm text-gray-600">Надежность</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Поддержка</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-sm mx-auto">
        <div className="flex items-center justify-around">
          <Link to="/mobile" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            <span className="text-xs font-medium text-green-600">Главная</span>
          </Link>
          <Link to="/mobile/dashboard" className="flex flex-col items-center gap-1">
            <BarChart3 className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Дашборд</span>
          </Link>
          <Link to="/mobile/login" className="flex flex-col items-center gap-1">
            <Users className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Вход</span>
          </Link>
        </div>
      </div>

      {/* Safe area for bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default MobileIndex;