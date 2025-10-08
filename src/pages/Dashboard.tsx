
import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Progress, Chip, Divider } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Sprout, 
  Calendar, 
  MapPin,
  Settings,
  Bell,
  Search,
  Globe,
  User,
  LogOut,
  Coins,
  Info,
  Eye
} from "lucide-react";
import { CombineMap } from "@/components/CombineMap";
import { 
  Dropdown,
  DropdownTrigger,
  DropdownMenu as NextUIDropdownMenu,
  DropdownItem
} from "@nextui-org/react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Общая прибыль",
      value: "2,450,000 ₸",
      change: "+12.5%",
      color: "success",
      icon: <TrendingUp className="h-6 w-6" />,
      showButton: false
    },
    {
      title: "Активные проекты",
      value: "24",
      change: "+3",
      color: "primary",
      icon: <BarChart3 className="h-6 w-6" />,
      showButton: false
    },
    {
      title: "E-Coin",
      value: "15,340",
      change: "+120",
      color: "secondary",
      icon: <Coins className="h-6 w-6" />,
      showButton: true,
      buttonType: "icon"
    },
    {
      title: "E-Coin",
      value: "15,340",
      change: "+120",
      color: "warning",
      icon: <Coins className="h-6 w-6" />,
      showButton: true,
      buttonType: "text"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Обновлен план посева",
      time: "2 часа назад",
      user: "Алексей Иванов",
      type: "success"
    },
    {
      id: 2,
      action: "Завершена обработка поля №5",
      time: "4 часа назад",
      user: "Мария Петрова",
      type: "default"
    },
    {
      id: 3,
      action: "Новый отчет по удобрениям",
      time: "6 часов назад",
      user: "Система",
      type: "warning"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <div className="bg-green-600 p-2 rounded-lg mr-3">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Smart Center Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button isIconOnly variant="light">
              <Search className="h-5 w-5" />
            </Button>
            <Button isIconOnly variant="light">
              <Bell className="h-5 w-5" />
            </Button>
            <Button isIconOnly variant="light">
              <Settings className="h-5 w-5" />
            </Button>
            
            {/* Language Switcher */}
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" className="text-gray-600">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownTrigger>
              <NextUIDropdownMenu aria-label="Language Selection">
                <DropdownItem key="ru">🇷🇺 Русский</DropdownItem>
                <DropdownItem key="en">🇺🇸 English</DropdownItem>
                <DropdownItem key="kz">🇰🇿 Қазақша</DropdownItem>
              </NextUIDropdownMenu>
            </Dropdown>

            {/* User Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" className="text-gray-600">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownTrigger>
              <NextUIDropdownMenu aria-label="User Menu">
                <DropdownItem key="profile" as={Link} href="/profile/personal" className="text-inherit">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Личный кабинет
                  </div>
                </DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger">
                  <div className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Выход
                  </div>
                </DropdownItem>
              </NextUIDropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    stat.color === 'success' ? 'bg-green-100 text-green-600' :
                    stat.color === 'primary' ? 'bg-blue-100 text-blue-600' :
                    stat.color === 'secondary' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {stat.icon}
                  </div>
                  <Chip 
                    size="sm" 
                    color={stat.color as any}
                    variant="flat"
                  >
                    {stat.change}
                  </Chip>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </div>
                  {stat.showButton && stat.buttonType === "text" && (
                    <Button 
                      size="sm" 
                      variant="flat"
                      color={stat.color as any}
                      as={Link}
                      to="/profile/bonuses"
                    >
                      Подробнее
                    </Button>
                  )}
                  {stat.showButton && stat.buttonType === "icon" && (
                    <Button 
                      size="sm" 
                      isIconOnly
                      variant="flat"
                      color={stat.color as any}
                      as={Link}
                      to="/profile/bonuses"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Card */}
            <CombineMap />

            {/* Equipment Errors */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Ошибки техники
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Комбайн CLAAS LEXION 780</h4>
                        <p className="text-sm text-gray-600 mt-1">VIN: WCL78012345678901</p>
                        <p className="text-sm text-red-600 mt-2">Ошибка: Перегрев двигателя. Требуется немедленная остановка и проверка системы охлаждения.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="border-l-4 border-orange-500 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Комбайн John Deere S790</h4>
                        <p className="text-sm text-gray-600 mt-1">VIN: 1M0S790ABCD123456</p>
                        <p className="text-sm text-orange-600 mt-2">Ошибка: Низкое давление масла. Рекомендуется проверка масляного фильтра.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Комбайн New Holland CR10.90</h4>
                        <p className="text-sm text-gray-600 mt-1">VIN: NHCR109087654321</p>
                        <p className="text-sm text-yellow-700 mt-2">Ошибка: Датчик уровня зерна неисправен. Требуется калибровка или замена.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Последние действия
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-orange-500' :
                      'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Weather Widget */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Погода
                  </h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">22°C</div>
                  <p className="text-gray-600 mb-4">Солнечно</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Влажность</p>
                      <p className="font-medium">65%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Ветер</p>
                      <p className="font-medium">12 км/ч</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Быстрые действия
                </h3>
              </CardHeader>
              <CardBody className="space-y-3">
                <Button 
                  className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100" 
                  variant="flat"
                  startContent={<Sprout className="h-4 w-4" />}
                >
                  Новый план посева
                </Button>
                <Button 
                  className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100" 
                  variant="flat"
                  startContent={<Calendar className="h-4 w-4" />}
                >
                  Планировщик задач
                </Button>
                <Button 
                  className="w-full justify-start bg-purple-50 text-purple-700 hover:bg-purple-100" 
                  variant="flat"
                  startContent={<BarChart3 className="h-4 w-4" />}
                >
                  Создать отчет
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
