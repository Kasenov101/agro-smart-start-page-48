import { Card, CardBody, CardHeader, Button, Divider } from "@nextui-org/react";
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Calendar,
  Edit,
  DollarSign,
  Gift,
  Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrganizationInfo = () => {
  const navigate = useNavigate();
  
  // Для демонстрации - можно переключить на false чтобы увидеть неподключенное состояние
  const isBonusServiceEnabled = true;
  
  const organizationInfo = {
    name: "ТОО \"АгроТех Казахстан\"",
    identifier: "БИН: 123456789012",
    address: "г. Алматы, ул. Абая 150/230",
    phone: "+7 (727) 123-45-67",
    email: "info@agrotech.kz",
    employees: "48 сотрудников",
    founded: "2020"
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Информация об организации
              </h3>
            </div>
            <Button 
              size="sm" 
              variant="flat" 
              color="primary"
              startContent={<Edit className="h-3 w-3" />}
            >
              Редактировать
            </Button>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-1">
              {organizationInfo.name}
            </h4>
            <p className="text-gray-600">{organizationInfo.identifier}</p>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Адрес</p>
                <p className="font-medium text-gray-900">{organizationInfo.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Телефон</p>
                <p className="font-medium text-gray-900">{organizationInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email организации</p>
                <p className="font-medium text-gray-900">{organizationInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Сотрудники</p>
                <p className="font-medium text-gray-900">{organizationInfo.employees}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Год основания</p>
                <p className="font-medium text-gray-900">{organizationInfo.founded}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Bonus Balance Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Бонусный баланс
              </h3>
            </div>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          {isBonusServiceEnabled ? (
            // Активный бонусный баланс
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">$2,450.75</p>
                    <p className="text-sm text-gray-600">Доступно к использованию</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  onClick={() => navigate('/profile/organization/bonuses')}
                >
                  Подробнее
                </Button>
              </div>
              
              <Divider />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Программа лояльности</span>
                </div>
                <p className="text-xs text-blue-700">
                  За каждую покупку начисляется 2% бонусов. 
                  Используйте бонусы для оплаты до 50% от суммы заказа.
                </p>
              </div>
            </>
          ) : (
            // Неподключенная бонусная система
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Lock className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-500">Недоступно</p>
                    <p className="text-sm text-gray-600">Услуга не подключена</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  onClick={() => navigate('/profile/subscriptions')}
                >
                  Подключить
                </Button>
              </div>
              
              <Divider />
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Программа лояльности</span>
                </div>
                <p className="text-xs text-orange-700">
                  Подключите бонусную систему в подписках, чтобы получать 2% бонусов 
                  за каждую покупку и оплачивать ими до 50% от суммы заказа.
                </p>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default OrganizationInfo;