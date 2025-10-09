import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Bell, 
  Settings, 
  Menu, 
  User, 
  LogOut, 
  Globe, 
  TrendingUp, 
  Users, 
  Target, 
  Sprout,
  Home,
  BarChart3,
  ChevronRight,
  MapPin,
  Calendar,
  AlertCircle,
  Coins,
  Eye
} from "lucide-react";
import { WeatherWidget } from "@/components/mobile/WeatherWidget";
import { EquipmentPanel } from "@/components/mobile/EquipmentPanel";
import { CombineMap } from "@/components/mobile/CombineMap";

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Прибыль", value: "₸2.45М", icon: TrendingUp, color: "bg-green-500", change: "+12%", showButton: false },
    { title: "Проекты", value: "24", icon: Target, color: "bg-blue-500", change: "+3", showButton: false },
    { title: "E-Coin", value: "15,340", icon: Coins, color: "bg-purple-500", change: "+120", showButton: true, buttonType: "icon" },
    { title: "E-Coin", value: "15,340", icon: Coins, color: "bg-orange-500", change: "+120", showButton: true, buttonType: "text" }
  ];

  const activities = [
    { time: "10:30", action: "Полив поля A завершен", type: "success", icon: "✅" },
    { time: "09:15", action: "Датчик влажности требует внимания", type: "warning", icon: "⚠️" },
    { time: "08:45", action: "Новый отчет готов", type: "info", icon: "📊" }
  ];

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
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Доброе утро!</h1>
            <p className="text-sm text-gray-600">Вот обзор вашей фермы</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по дашборду..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
                {stat.showButton && stat.buttonType === "text" && (
                  <Link to="/profile/bonuses">
                    <button className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg font-medium text-gray-700 hover:bg-gray-200">
                      Подробнее
                    </button>
                  </Link>
                )}
                {stat.showButton && stat.buttonType === "icon" && (
                  <Link to="/profile/bonuses">
                    <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                      <Eye className="h-4 w-4 text-gray-700" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <CombineMap />

        {/* Weather Widget */}
        <WeatherWidget />

        {/* Equipment Panel */}
        <EquipmentPanel />

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Последние активности</h3>
          </div>
          <div className="p-6 space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">{activity.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-sm mx-auto">
        <div className="flex items-center justify-around">
          <Link to="/mobile" className="flex flex-col items-center gap-1">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Главная</span>
          </Link>
          <Link to="/mobile/dashboard" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            <span className="text-xs font-medium text-green-600">Дашборд</span>
          </Link>
          <Link to="/mobile/profile" className="flex flex-col items-center gap-1">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Профиль</span>
          </Link>
        </div>
      </div>

      {/* Safe area for bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default MobileDashboard;