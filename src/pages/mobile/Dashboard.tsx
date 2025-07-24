import { useState } from "react";
import { Card, CardBody, Progress, Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Search, Bell, Settings, Menu, User, LogOut, Globe, TrendingUp, Users, Target, Sprout } from "lucide-react";
import { WeatherWidget } from "@/components/mobile/WeatherWidget";
import { EquipmentPanel } from "@/components/mobile/EquipmentPanel";

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Прибыль", value: "₸2,450,000", icon: TrendingUp, color: "text-green-600" },
    { title: "Проекты", value: "24", icon: Target, color: "text-blue-600" },
    { title: "Сотрудники", value: "156", icon: Users, color: "text-purple-600" },
    { title: "Урожайность", value: "89%", icon: Sprout, color: "text-orange-600" }
  ];

  const projects = [
    { name: "Пшеница - Поле A", progress: 85, status: "Активен" },
    { name: "Кукуруза - Поле B", progress: 65, status: "В процессе" },
    { name: "Соя - Поле C", progress: 40, status: "Планирование" }
  ];

  const activities = [
    { time: "10:30", action: "Полив поля A завершен", type: "success" },
    { time: "09:15", action: "Датчик влажности требует внимания", type: "warning" },
    { time: "08:45", action: "Новый отчет готов", type: "info" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="bg-card border-b p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" size="sm" isIconOnly>
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="ru">🇷🇺 Русский</DropdownItem>
                <DropdownItem key="en">🇺🇸 English</DropdownItem>
                <DropdownItem key="kz">🇰🇿 Қазақша</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* User Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Avatar size="sm" />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="profile" startContent={<User className="h-4 w-4" />}>
                  Личный кабинет
                </DropdownItem>
                <DropdownItem key="logout" startContent={<LogOut className="h-4 w-4" />}>
                  Выход
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card">
              <CardBody className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Active Projects */}
        <Card>
          <CardBody className="p-4">
            <h3 className="text-lg font-semibold mb-4">Активные проекты</h3>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{project.name}</span>
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Weather Widget */}
        <WeatherWidget />

        {/* Equipment Panel */}
        <EquipmentPanel />

        {/* Recent Activities */}
        <Card>
          <CardBody className="p-4">
            <h3 className="text-lg font-semibold mb-4">Последние активности</h3>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
};

export default MobileDashboard;