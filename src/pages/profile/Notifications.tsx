import { useState } from "react";
import { Card, CardBody, Switch, Button, Chip } from "@nextui-org/react";
import { Bell, AlertCircle, CheckCircle, Users, ChevronDown, ChevronUp, Tractor, Sprout, CloudRain } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface NotificationType {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  assignedUsers: string[];
  showUsers?: boolean;
}

interface NotificationCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  notifications: NotificationType[];
}

const Notifications = () => {
  // Мокап данных пользователей
  const [users] = useState<User[]>([
    { id: "1", name: "Иван Иванов", email: "ivan@example.com", role: "Администратор" },
    { id: "2", name: "Мария Петрова", email: "maria@example.com", role: "Менеджер" },
    { id: "3", name: "Алексей Сидоров", email: "alex@example.com", role: "Оператор" },
    { id: "4", name: "Елена Козлова", email: "elena@example.com", role: "Оператор" },
    { id: "5", name: "Дмитрий Волков", email: "dmitry@example.com", role: "Менеджер" },
  ]);

  const [notificationCategories, setNotificationCategories] = useState<NotificationCategory[]>([
    {
      id: "johndeere",
      name: "John Deere",
      icon: Tractor,
      color: "text-green-600",
      notifications: [
        {
          id: "jd_equipment_errors",
          label: "Ошибки техники",
          description: "Уведомления о критических ошибках и неисправностях техники John Deere",
          enabled: true,
          assignedUsers: ["1", "2", "3"],
          showUsers: false,
        },
      ],
    },
    {
      id: "field_operations",
      name: "Операции по полям",
      icon: Sprout,
      color: "text-emerald-600",
      notifications: [
        {
          id: "field_start",
          label: "Начало операций",
          description: "Уведомления о начале работ на полях",
          enabled: true,
          assignedUsers: ["1", "2"],
          showUsers: false,
        },
        {
          id: "field_complete",
          label: "Завершение операций",
          description: "Уведомления о завершении работ на полях",
          enabled: true,
          assignedUsers: ["1", "2"],
          showUsers: false,
        },
        {
          id: "field_issues",
          label: "Проблемы на полях",
          description: "Уведомления о проблемах и задержках в операциях",
          enabled: true,
          assignedUsers: ["1"],
          showUsers: false,
        },
      ],
    },
    {
      id: "field_climate",
      name: "Field Climate",
      icon: CloudRain,
      color: "text-blue-600",
      notifications: [
        {
          id: "fc_station_status",
          label: "Статус станций",
          description: "Уведомления об изменении статуса метеостанций",
          enabled: true,
          assignedUsers: ["1", "4"],
          showUsers: false,
        },
        {
          id: "fc_critical_errors",
          label: "Критические ошибки",
          description: "Уведомления о критических ошибках метеостанций и датчиков",
          enabled: true,
          assignedUsers: ["1", "2"],
          showUsers: false,
        },
      ],
    },
  ]);

  const toggleNotification = (categoryId: string, notificationId: string) => {
    setNotificationCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            notifications: category.notifications.map((notif) =>
              notif.id === notificationId ? { ...notif, enabled: !notif.enabled } : notif
            ),
          };
        }
        return category;
      })
    );
  };

  const toggleUsersList = (categoryId: string, notificationId: string) => {
    setNotificationCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            notifications: category.notifications.map((notif) =>
              notif.id === notificationId ? { ...notif, showUsers: !notif.showUsers } : notif
            ),
          };
        }
        return category;
      })
    );
  };

  const toggleUserAssignment = (categoryId: string, notificationId: string, userId: string) => {
    setNotificationCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            notifications: category.notifications.map((notif) => {
              if (notif.id === notificationId) {
                const isAssigned = notif.assignedUsers.includes(userId);
                return {
                  ...notif,
                  assignedUsers: isAssigned
                    ? notif.assignedUsers.filter((id) => id !== userId)
                    : [...notif.assignedUsers, userId],
                };
              }
              return notif;
            }),
          };
        }
        return category;
      })
    );
  };

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    console.log("Saving notification settings:", notificationCategories);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Настройки уведомлений</h1>
          <p className="text-gray-600 mt-1">
            Управляйте типами уведомлений, которые вы хотите получать
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {notificationCategories.map((category) => {
          const CategoryIcon = category.icon;
          
          return (
            <Card key={category.id}>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <CategoryIcon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                </div>

                <div className="space-y-4">
                  {category.notifications.map((notification) => {
                    const assignedUsersCount = notification.assignedUsers.length;
                    
                    return (
                      <div
                        key={notification.id}
                        className="rounded-lg border border-gray-200 overflow-hidden"
                      >
                        <div className="flex items-start justify-between p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex gap-4 flex-1">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {notification.label}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.description}
                              </p>
                              <div className="flex items-center gap-3 mt-3">
                                <Button
                                  size="sm"
                                  variant="light"
                                  color="primary"
                                  startContent={<Users className="h-4 w-4" />}
                                  endContent={
                                    notification.showUsers ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )
                                  }
                                  onClick={() => toggleUsersList(category.id, notification.id)}
                                >
                                  Назначить пользователей
                                </Button>
                                {assignedUsersCount > 0 && (
                                  <Chip size="sm" color="primary" variant="flat">
                                    {assignedUsersCount} {assignedUsersCount === 1 ? 'пользователь' : 'пользователей'}
                                  </Chip>
                                )}
                              </div>
                            </div>
                          </div>
                          <Switch
                            isSelected={notification.enabled}
                            onValueChange={() => toggleNotification(category.id, notification.id)}
                            color="primary"
                          />
                        </div>

                        {notification.showUsers && (
                          <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">
                              Выберите пользователей для получения этого типа уведомлений
                            </h4>
                            <div className="space-y-2">
                              {users.map((user) => {
                                const isAssigned = notification.assignedUsers.includes(user.id);
                                return (
                                  <div
                                    key={user.id}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors"
                                  >
                                    <Checkbox
                                      checked={isAssigned}
                                      onCheckedChange={() =>
                                        toggleUserAssignment(category.id, notification.id, user.id)
                                      }
                                    />
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-gray-900">
                                        {user.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {user.email} · {user.role}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardBody className="p-6">

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="light" color="default">
              Отмена
            </Button>
            <Button color="primary" onClick={handleSave}>
              Сохранить изменения
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Notifications;
