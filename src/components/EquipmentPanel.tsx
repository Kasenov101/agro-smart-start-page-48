
import { Tractor, Truck, Bell, MapPin } from "lucide-react";

const EquipmentPanel = () => {
  const equipment = [
    {
      id: 1,
      name: "Трактор МТЗ-82",
      status: "active",
      location: "Поле №3",
      fuelLevel: 78,
      hours: 1250
    },
    {
      id: 2,
      name: "Комбайн John Deere",
      status: "maintenance",
      location: "Гараж",
      fuelLevel: 45,
      hours: 890
    },
    {
      id: 3,
      name: "Культиватор",
      status: "active",
      location: "Поле №1",
      fuelLevel: 92,
      hours: 567
    },
    {
      id: 4,
      name: "Грузовик КамАЗ",
      status: "inactive",
      location: "Склад",
      fuelLevel: 34,
      hours: 2100
    }
  ];


  const getEquipmentIcon = (name: string) => {
    if (name.includes("Трактор")) return <Tractor className="h-6 w-6 text-green-600" />;
    if (name.includes("Комбайн")) return <Tractor className="h-6 w-6 text-blue-600" />;
    if (name.includes("Грузовик")) return <Truck className="h-6 w-6 text-gray-600" />;
    return <Tractor className="h-6 w-6 text-green-600" />;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Сельхозтехника
      </h3>
      
      {equipment.map((item) => (
        <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getEquipmentIcon(item.name)}
              <div>
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.location}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <span className="text-gray-600">Топливо:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.fuelLevel > 50 ? 'bg-green-500' : 
                      item.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.fuelLevel}%` }}
                  />
                </div>
                <span className="font-medium">{item.fuelLevel}%</span>
              </div>
            </div>
            
            <div>
              <span className="text-gray-600">Моточасы:</span>
              <div className="font-medium mt-1">{item.hours} ч</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
              <Bell className="h-4 w-4" />
              Уведомления
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
              <MapPin className="h-4 w-4" />
              Локации
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentPanel;
