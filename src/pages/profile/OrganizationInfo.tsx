import { Card, CardBody, CardHeader, Button, Divider } from "@nextui-org/react";
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Calendar,
  Edit
} from "lucide-react";

const OrganizationInfo = () => {
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
    </div>
  );
};

export default OrganizationInfo;