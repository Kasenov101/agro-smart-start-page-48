import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import { Card, CardBody, Button } from "@nextui-org/react";
import { 
  Award, 
  Coins,
  CreditCard,
  Globe,
  LogOut,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      id: 'plan-requests',
      label: 'Запросы на подключение планов',
      icon: CreditCard,
      path: '/admin/plan-requests',
      color: 'text-indigo-600'
    },
    {
      id: 'ecoin',
      label: 'eCoin',
      icon: Coins,
      path: '/admin/ecoin',
      color: 'text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <div className="bg-indigo-600 p-2 rounded-lg mr-3">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Админ-панель</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button isIconOnly variant="light" className="text-gray-600">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem className="cursor-pointer">🇷🇺 Русский</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">🇺🇸 English</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">🇰🇿 Қазақша</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button isIconOnly variant="light" className="text-gray-600">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile/personal" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Личный кабинет
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Выход
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex gap-6 h-[calc(100vh-125px)]">
          {/* Sidebar Navigation */}
          <aside className="w-64 bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Подписки
              </h3>
            </div>
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
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : item.color}`} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <Card className="bg-white h-full">
              <CardBody className="p-6">
                <Outlet />
              </CardBody>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;