import { useState } from "react";
import { Card, CardBody, Switch, Button } from "@nextui-org/react";
import { Bell, Mail, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

interface NotificationType {
  id: string;
  label: string;
  description: string;
  icon: any;
  enabled: boolean;
}

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationType[]>([
    {
      id: "equipment_alerts",
      label: "Оповещения о технике",
      description: "Уведомления об ошибках и проблемах с оборудованием",
      icon: AlertCircle,
      enabled: true,
    },
    {
      id: "system_updates",
      label: "Системные обновления",
      description: "Информация об обновлениях системы и новых функциях",
      icon: Bell,
      enabled: true,
    },
    {
      id: "email_notifications",
      label: "Email уведомления",
      description: "Получать уведомления на электронную почту",
      icon: Mail,
      enabled: false,
    },
    {
      id: "messages",
      label: "Сообщения",
      description: "Уведомления о новых сообщениях от других пользователей",
      icon: MessageSquare,
      enabled: true,
    },
    {
      id: "success_reports",
      label: "Отчеты о выполнении",
      description: "Уведомления об успешном завершении задач",
      icon: CheckCircle,
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotificationSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
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
          <div className="space-y-6">
            {notificationSettings.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
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
                    </div>
                  </div>
                  <Switch
                    isSelected={notification.enabled}
                    onValueChange={() => toggleNotification(notification.id)}
                    color="primary"
                  />
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
