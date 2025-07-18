import { Card, CardBody, CardHeader, Button, Divider } from "@nextui-org/react";
import { Shield } from "lucide-react";

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
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Пароль</h4>
              <p className="text-sm text-gray-600">Последнее изменение: 15 дней назад</p>
            </div>
            <Button size="sm" variant="flat" color="primary">
              Изменить
            </Button>
          </div>
          
          <Divider />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Двухфакторная аутентификация</h4>
              <p className="text-sm text-gray-600">Не активирована</p>
            </div>
            <Button size="sm" variant="flat" color="success">
              Включить
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Security;