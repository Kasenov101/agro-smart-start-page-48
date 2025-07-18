import { Card, CardBody, CardHeader, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { Building2, Plus, Calendar, MapPin } from "lucide-react";

const Organizations = () => {
  const childOrganizations = [
    {
      id: 1,
      name: "АгроТех Алматы",
      type: "Филиал",
      address: "г. Алматы, ул. Сатпаева 90",
      employees: 25,
      created: "15 марта 2023",
      status: "active"
    },
    {
      id: 2,
      name: "АгроТех Астана",
      type: "Филиал",
      address: "г. Астана, пр. Мәңгілік Ел 55",
      employees: 18,
      created: "28 июня 2023",
      status: "active"
    },
    {
      id: 3,
      name: "АгроТех Шымкент",
      type: "Подразделение",
      address: "г. Шымкент, ул. Кунаева 120",
      employees: 12,
      created: "10 октября 2023",
      status: "pending"
    }
  ];

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { color: "success", text: "Активна" },
      pending: { color: "warning", text: "В ожидании" },
      disabled: { color: "danger", text: "Отключена" }
    };
    return statusConfig[status] || { color: "default", text: "Неизвестно" };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Дочерние организации
              </h3>
            </div>
            <Button 
              color="primary" 
              startContent={<Plus className="h-4 w-4" />}
            >
              Добавить организацию
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Table aria-label="Таблица дочерних организаций">
            <TableHeader>
              <TableColumn>НАЗВАНИЕ</TableColumn>
              <TableColumn>ТИП</TableColumn>
              <TableColumn>АДРЕС</TableColumn>
              <TableColumn>СОТРУДНИКИ</TableColumn>
              <TableColumn>ДАТА СОЗДАНИЯ</TableColumn>
              <TableColumn>СТАТУС</TableColumn>
            </TableHeader>
            <TableBody>
              {childOrganizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{org.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{org.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm">{org.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{org.employees}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm">{org.created}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusChip(org.status).color} 
                      variant="flat"
                      size="sm"
                    >
                      {getStatusChip(org.status).text}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="text-center">
            <h4 className="text-2xl font-bold text-blue-600">3</h4>
            <p className="text-gray-600">Всего организаций</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <h4 className="text-2xl font-bold text-green-600">55</h4>
            <p className="text-gray-600">Общее количество сотрудников</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <h4 className="text-2xl font-bold text-orange-600">2</h4>
            <p className="text-gray-600">Активных филиала</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Organizations;