import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import { 
  User, 
  Building, 
  Shield,
  Calendar,
  Users,
  CreditCard,
  Building2,
  Globe,
  LogOut,
  ChevronRight,
  Settings
} from "lucide-react";

const MobileProfile = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      id: 'personal',
      label: 'Личная информация',
      icon: User,
      path: '/mobile/profile/personal',
      color: 'bg-blue-500'
    },
    {
      id: 'organization',
      label: 'Информация об организации',
      icon: Building,
      path: '/mobile/profile/organization',
      color: 'bg-green-500'
    },
    {
      id: 'security',
      label: 'Безопасность',
      icon: Shield,
      path: '/mobile/profile/security',
      color: 'bg-red-500'
    },
    {
      id: 'activity',
      label: 'Активность',
      icon: Calendar,
      path: '/mobile/profile/activity',
      color: 'bg-purple-500'
    },
    {
      id: 'users',
      label: 'Пользователи',
      icon: Users,
      path: '/mobile/profile/users',
      color: 'bg-orange-500'
    },
    {
      id: 'subscriptions',
      label: 'Подписки',
      icon: CreditCard,
      path: '/mobile/profile/subscriptions',
      color: 'bg-indigo-500'
    },
    {
      id: 'organizations',
      label: 'Дочерние организации',
      icon: Building2,
      path: '/mobile/profile/organizations',
      color: 'bg-emerald-500'
    }
  ];

  // Check if we're on the main profile page (should show navigation)
  const isMainProfilePage = currentPath === '/mobile/profile' || currentPath === '/mobile/profile/';

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
          <div className="flex items-center">
            {!isMainProfilePage && (
              <Link 
                to="/mobile/profile" 
                className="flex items-center gap-2 text-gray-600 mr-4"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Link>
            )}
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Профиль</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-gray-100 rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {isMainProfilePage ? (
        /* Main Profile Navigation */
        <div className="px-6 py-6 space-y-6">
          {/* User Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Иван Иванов</h2>
                <p className="text-gray-600">ivan@example.com</p>
                <p className="text-sm text-green-600 font-medium">Активный аккаунт</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-1">24</div>
              <div className="text-sm text-gray-600">Проекта</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-sm text-gray-600">Пользователей</div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Настройки аккаунта</h3>
            </div>
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Быстрые действия</h3>
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Globe className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">Изменить язык</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-red-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <LogOut className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="font-medium">Выйти из аккаунта</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Nested Page Content */
        <div className="px-6 py-6">
          <div className="bg-white rounded-2xl shadow-sm min-h-[500px] p-6">
            <Outlet />
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-sm mx-auto">
        <div className="flex items-center justify-around">
          <Link to="/mobile" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-400">Главная</span>
          </Link>
          <Link to="/mobile/dashboard" className="flex flex-col items-center gap-1">
            <Settings className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Дашборд</span>
          </Link>
          <Link to="/mobile/profile" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            <span className="text-xs font-medium text-blue-600">Профиль</span>
          </Link>
        </div>
      </div>

      {/* Safe area for bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default MobileProfile;