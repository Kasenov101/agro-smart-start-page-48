import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { 
  User, 
  Building, 
  Shield,
  Calendar,
  Users,
  CreditCard,
  Building2
} from "lucide-react";

const Profile = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      id: 'personal',
      label: 'Личная информация',
      icon: User,
      path: '/profile/personal',
      color: 'text-blue-600'
    },
    {
      id: 'organization',
      label: 'Информация об организации',
      icon: Building,
      path: '/profile/organization',
      color: 'text-green-600'
    },
    {
      id: 'security',
      label: 'Безопасность',
      icon: Shield,
      path: '/profile/security',
      color: 'text-red-600'
    },
    {
      id: 'activity',
      label: 'Активность',
      icon: Calendar,
      path: '/profile/activity',
      color: 'text-purple-600'
    },
    {
      id: 'users',
      label: 'Пользователи',
      icon: Users,
      path: '/profile/users',
      color: 'text-orange-600'
    },
    {
      id: 'subscriptions',
      label: 'Подписки',
      icon: CreditCard,
      path: '/profile/subscriptions',
      color: 'text-indigo-600'
    },
    {
      id: 'organizations',
      label: 'Дочерние организации',
      icon: Building2,
      path: '/profile/organizations',
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Профиль</h1>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Card className="bg-white h-full">
            <CardBody className="p-6">
              <Outlet />
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Profile;