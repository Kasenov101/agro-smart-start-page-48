import { Card, CardBody, CardHeader, Button, Divider, Avatar } from "@nextui-org/react";
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  ArrowLeft,
  Shield,
  Briefcase
} from "lucide-react";

const Profile = () => {
  const userInfo = {
    name: "Алексей Иванов",
    email: "alexey.ivanov@example.com",
    phone: "+7 (777) 123-45-67",
    position: "Управляющий",
    joinDate: "15 января 2023",
    avatar: "/placeholder-avatar.jpg"
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <Button 
              isIconOnly 
              variant="light" 
              className="mr-3"
              as="a"
              href="/dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Профиль</h1>
          </div>
          <Button 
            color="primary" 
            startContent={<Edit className="h-4 w-4" />}
          >
            Редактировать
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Личная информация
                  </h3>
                </div>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  startContent={<Edit className="h-4 w-4" />}
                >
                  Редактировать
                </Button>
              </div>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    className="w-16 h-16"
                    isBordered
                    color="primary"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {userInfo.name}
                    </h4>
                    <p className="text-gray-600">{userInfo.position}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="light"
                  isIconOnly
                  color="primary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <Divider />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{userInfo.email}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="light" isIconOnly>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Телефон</p>
                      <p className="font-medium text-gray-900">{userInfo.phone}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="light" isIconOnly>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Должность</p>
                    <p className="font-medium text-gray-900">{userInfo.position}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Дата присоединения</p>
                    <p className="font-medium text-gray-900">{userInfo.joinDate}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Organization Information */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Информация об организации
                  </h3>
                </div>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="success"
                  startContent={<Edit className="h-4 w-4" />}
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
        </div>

        {/* Additional Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Security Settings */}
          <Card className="bg-white">
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

          {/* Activity Summary */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Активность
                </h3>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Последний вход</span>
                <span className="font-medium text-gray-900">Сегодня, 14:30</span>
              </div>
              
              <Divider />
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Проектов создано</span>
                <span className="font-medium text-gray-900">12</span>
              </div>
              
              <Divider />
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Отчетов сгенерировано</span>
                <span className="font-medium text-gray-900">24</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;