
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarTrigger,
  SidebarInset 
} from "@/components/ui/sidebar";
import { Sprout, LayoutDashboard, Tractor, BarChart3, Settings, LogOut } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import EquipmentPanel from "@/components/EquipmentPanel";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Дашборд", icon: LayoutDashboard },
    { id: "equipment", label: "Техника", icon: Tractor },
    { id: "analytics", label: "Аналитика", icon: BarChart3 },
    { id: "settings", label: "Настройки", icon: Settings },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Smart Center</h1>
                <p className="text-xs text-gray-600">Панель управления</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeSection === item.id 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>
            
            <div className="mt-8 pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Выйти
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h2 className="text-xl font-semibold text-gray-900">
                  {menuItems.find(item => item.id === activeSection)?.label || "Дашборд"}
                </h2>
              </div>
              <div className="text-sm text-gray-600">
                Добро пожаловать! Сегодня {new Date().toLocaleDateString('ru-RU')}
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {activeSection === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <WeatherWidget />
                </div>
                <div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Быстрая статистика
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">4</div>
                        <div className="text-sm text-gray-600">Единиц техники</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-gray-600">Полей</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">85%</div>
                        <div className="text-sm text-gray-600">Готовность</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">2.5т</div>
                        <div className="text-sm text-gray-600">Урожай/га</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "equipment" && (
              <div className="max-w-4xl">
                <EquipmentPanel />
              </div>
            )}

            {activeSection === "analytics" && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Аналитика
                </h3>
                <p className="text-gray-600">
                  Здесь будут отображаться графики и статистика по работе хозяйства.
                </p>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Настройки
                </h3>
                <p className="text-gray-600">
                  Настройки системы и профиля пользователя.
                </p>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
