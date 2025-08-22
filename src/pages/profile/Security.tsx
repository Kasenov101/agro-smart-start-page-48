import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Shield, Construction, Clock } from "lucide-react";

const Security = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Безопасность
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="relative mb-4">
              <Construction className="h-16 w-16 text-orange-500" />
              <Clock className="absolute -top-1 -right-1 h-6 w-6 text-orange-600 animate-pulse" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Раздел в разработке
            </h4>
            <p className="text-gray-600 mb-4 max-w-md">
              Мы работаем над улучшением настроек безопасности. 
              Этот раздел будет доступен в ближайшее время.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md">
              <p className="text-sm text-orange-800">
                <strong>Ожидаемые функции:</strong><br />
                • Смена пароля<br />
                • Двухфакторная аутентификация<br />
                • История входов<br />
                • Управление сессиями
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Security;