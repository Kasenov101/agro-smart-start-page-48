import { Card, CardBody, CardHeader, Button, Avatar } from "@nextui-org/react";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase,
  Calendar,
  Edit
} from "lucide-react";

const PersonalInfo = () => {
  const userInfo = {
    name: "Алексей Иванов",
    email: "alexey.ivanov@example.com",
    phone: "+7 (777) 123-45-67",
    position: "Управляющий",
    joinDate: "15 января 2023",
    avatar: "/placeholder-avatar.jpg"
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Avatar
            src={userInfo.avatar}
            alt={userInfo.name}
            className="w-20 h-20"
            isBordered
            color="primary"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {userInfo.name}
            </h2>
            <p className="text-gray-600 text-lg">{userInfo.position}</p>
          </div>
        </div>
        <Button 
          color="primary" 
          size="lg"
          startContent={<Edit className="h-4 w-4" />}
          className="animate-fade-in"
        >
          Редактировать профиль
        </Button>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
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
              startContent={<Edit className="h-3 w-3" />}
            >
              Редактировать
            </Button>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
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
    </div>
  );
};

export default PersonalInfo;