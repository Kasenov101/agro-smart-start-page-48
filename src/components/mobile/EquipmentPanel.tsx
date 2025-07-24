import { Card, CardBody, Button, Chip } from "@nextui-org/react";
import { 
  Tractor, 
  Droplets, 
  Thermometer, 
  Camera,
  Power,
  AlertTriangle
} from "lucide-react";

export const EquipmentPanel = () => {
  const equipment = [
    {
      id: 1,
      name: "Трактор #1",
      status: "active",
      location: "Поле A",
      icon: Tractor,
      battery: 85
    },
    {
      id: 2,
      name: "Система полива",
      status: "active",
      location: "Поле B",
      icon: Droplets,
      battery: 92
    },
    {
      id: 3,
      name: "Датчик температуры",
      status: "warning",
      location: "Поле C",
      icon: Thermometer,
      battery: 45
    },
    {
      id: 4,
      name: "Камера наблюдения",
      status: "offline",
      location: "Поле D",
      icon: Camera,
      battery: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'offline': return 'danger';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активно';
      case 'warning': return 'Внимание';
      case 'offline': return 'Офлайн';
      default: return 'Неизвестно';
    }
  };

  return (
    <Card>
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Оборудование</h3>
          <Button size="sm" variant="light">
            Все
          </Button>
        </div>

        <div className="space-y-3">
          {equipment.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-content2 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background rounded-lg">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <Chip 
                  size="sm" 
                  color={getStatusColor(item.status)}
                  variant="flat"
                >
                  {getStatusText(item.status)}
                </Chip>
                <div className="flex items-center gap-1">
                  <Power className="h-3 w-3" />
                  <span className="text-xs">{item.battery}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          className="w-full mt-4" 
          variant="bordered"
          startContent={<AlertTriangle className="h-4 w-4" />}
        >
          Диагностика оборудования
        </Button>
      </CardBody>
    </Card>
  );
};