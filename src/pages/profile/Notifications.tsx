import { useState } from "react";
import { Card, CardBody, Switch, Button, Chip } from "@nextui-org/react";
import { Bell, Mail, MessageSquare, AlertCircle, CheckCircle, Users, ChevronDown, ChevronUp } from "lucide-react";
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
  icon: any;
  enabled: boolean;
  assignedUsers: string[];
  showUsers?: boolean;
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

  const [notificationSettings, setNotificationSettings] = useState<NotificationType[]>([
    {
      id: "equipment_alerts",
      label: "Оповещения о технике",
      description: "Уведомления об ошибках и проблемах с оборудованием",
      icon: AlertCircle,
      enabled: true,
      assignedUsers: ["1", "2"],
      showUsers: false,
    },
    {
      id: "system_updates",
      label: "Системные обновления",
      description: "Информация об обновлениях системы и новых функциях",
      icon: Bell,
      enabled: true,
      assignedUsers: ["1"],
      showUsers: false,
    },
    {
      id: "email_notifications",
      label: "Email уведомления",
      description: "Получать уведомления на электронную почту",
      icon: Mail,
      enabled: false,
      assignedUsers: [],
      showUsers: false,
    },
    {
      id: "messages",
      label: "Сообщения",
      description: "Уведомления о новых сообщениях от других пользователей",
      icon: MessageSquare,
      enabled: true,
      assignedUsers: ["1", "2", "3"],
      showUsers: false,
    },
    {
      id: "success_reports",
      label: "Отчеты о выполнении",
      description: "Уведомления об успешном завершении задач",
      icon: CheckCircle,
      enabled: false,
      assignedUsers: [],
      showUsers: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotificationSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const toggleUsersList = (notificationId: string) => {
    setNotificationSettings((prev) =>
      prev.map((item) =>
        item.id === notificationId ? { ...item, showUsers: !item.showUsers } : item
      )
    );
  };

  const toggleUserAssignment = (notificationId: string, userId: string) => {
    setNotificationSettings((prev) =>
      prev.map((item) => {
        if (item.id === notificationId) {
          const isAssigned = item.assignedUsers.includes(userId);
          return {
            ...item,
            assignedUsers: isAssigned
              ? item.assignedUsers.filter((id) => id !== userId)
              : [...item.assignedUsers, userId],
          };
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    console.log("Saving notification settings:", notificationSettings);
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

      <Card>
        <CardBody className="p-6">
          <div className="space-y-4">
            {notificationSettings.map((notification) => {
              const Icon = notification.icon;
              const assignedUsersCount = notification.assignedUsers.length;
              
              return (
                <div
                  key={notification.id}
                  className="rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div className="flex items-start justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${notification.enabled ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <Icon
                          className={`h-6 w-6 ${notification.enabled ? 'text-blue-600' : 'text-gray-500'}`}
                        />
                      </div>
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
                            onClick={() => toggleUsersList(notification.id)}
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
                      onValueChange={() => toggleNotification(notification.id)}
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
                                  toggleUserAssignment(notification.id, user.id)
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
