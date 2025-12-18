import { useState } from "react";
import { Card, CardBody, Button, Chip, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Bell, 
  Check, 
  CheckCheck,
  Trash2,
  Filter
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      action: "Обновлен план посева",
      time: "2 часа назад",
      user: "Алексей Иванов",
      type: "success",
      isRead: false
    },
    {
      id: 2,
      action: "Завершена обработка поля №5",
      time: "4 часа назад",
      user: "Мария Петрова",
      type: "default",
      isRead: false
    },
    {
      id: 3,
      action: "Новый отчет по удобрениям",
      time: "6 часов назад",
      user: "Система",
      type: "warning",
      isRead: true
    },
    {
      id: 4,
      action: "Требуется техническое обслуживание",
      time: "8 часов назад",
      user: "Система",
      type: "warning",
      isRead: false
    },
    {
      id: 5,
      action: "Получена новая заявка",
      time: "10 часов назад",
      user: "Иван Сидоров",
      type: "default",
      isRead: true
    },
    {
      id: 6,
      action: "Завершена инвентаризация",
      time: "12 часов назад",
      user: "Анна Козлова",
      type: "success",
      isRead: true
    },
    {
      id: 7,
      action: "Обновлены данные метеостанции",
      time: "1 день назад",
      user: "Система",
      type: "default",
      isRead: true
    },
    {
      id: 8,
      action: "Критическая ошибка оборудования",
      time: "1 день назад",
      user: "Система",
      type: "warning",
      isRead: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              as={Link}
              to="/dashboard"
              isIconOnly
              variant="light"
              className="text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Bell className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Уведомления</h1>
                <p className="text-sm text-gray-500">
                  {unreadCount > 0 ? `${unreadCount} непрочитанных` : "Все прочитано"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="light"
              startContent={<Filter className="h-4 w-4" />}
              className="text-gray-600"
            >
              Фильтр
            </Button>
            <Button
              variant="flat"
              color="primary"
              startContent={<CheckCheck className="h-4 w-4" />}
              onClick={markAllAsRead}
              isDisabled={unreadCount === 0}
            >
              Прочитать все
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-white">
          <CardBody className="p-0">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                  <Bell className="h-12 w-12 mb-4 opacity-50" />
                  <p>Нет уведомлений</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${
                        !notification.isRead ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                        notification.type === "success" ? "bg-green-500" :
                        notification.type === "warning" ? "bg-orange-500" :
                        "bg-gray-400"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${
                          !notification.isRead 
                            ? "font-semibold text-gray-900" 
                            : "font-medium text-gray-700"
                        }`}>
                          {notification.action}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.user} • {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.isRead && (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-400 hover:text-green-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardNotifications;
