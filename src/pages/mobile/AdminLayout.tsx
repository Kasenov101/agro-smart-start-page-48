import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import { 
  Settings,
  CreditCard,
  ArrowLeft,
  ChevronRight,
  Shield
} from "lucide-react";

const MobileAdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      id: 'subscriptions',
      label: 'Подписки',
      icon: CreditCard,
      path: '/mobile/admin/plan-requests',
      color: 'bg-indigo-500',
      submenu: [
        {
          id: 'plan-requests',
          label: 'Запросы на подключение планов',
          path: '/mobile/admin/plan-requests'
        }
      ]
    }
  ];

  // Check if we're on the main admin page
  const isMainAdminPage = currentPath === '/mobile/admin' || currentPath === '/mobile/admin/';

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
            {!isMainAdminPage && (
              <Link 
                to="/mobile/admin" 
                className="flex items-center gap-2 text-gray-600 mr-4"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Link>
            )}
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <Shield className="h-4 w-4 text-red-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Администрирование</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-gray-100 rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {isMainAdminPage ? (
        /* Main Admin Navigation */
        <div className="px-6 py-6 space-y-6">
          {/* Admin Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Панель администратора</h2>
                <p className="text-gray-600">Управление системой</p>
                <p className="text-sm text-red-600 font-medium">Режим администратора</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-1">45</div>
              <div className="text-sm text-gray-600">Запросов</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
              <div className="text-sm text-gray-600">Пользователей</div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Управление</h3>
            </div>
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id}>
                    <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{item.label}</span>
                      </div>
                    </div>
                    {/* Submenu */}
                    {item.submenu && (
                      <div className="bg-gray-25">
                        {item.submenu.map((subItem) => (
                          <NavLink
                            key={subItem.id}
                            to={subItem.path}
                            className="flex items-center justify-between px-6 py-3 pl-16 hover:bg-gray-50 transition-colors border-l-4 border-gray-200"
                          >
                            <span className="text-gray-700">{subItem.label}</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
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
              <Link 
                to="/mobile/dashboard"
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ArrowLeft className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Вернуться в дашборд</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
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
          <Link to="/mobile/admin" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-red-600 rounded-full"></div>
            <span className="text-xs font-medium text-red-600">Админ</span>
          </Link>
        </div>
      </div>

      {/* Safe area for bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default MobileAdminLayout;