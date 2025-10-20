import { 
  Tractor, 
  Droplets, 
  Thermometer, 
  Camera,
  Battery,
  Bell,
  MapPin,
  Wifi,
  WifiOff
} from "lucide-react";

export const EquipmentPanel = () => {
  const equipment = [
    {
      id: 1,
      name: "Трактор #1",
      status: "active",
      location: "Поле A",
      icon: Tractor,
      battery: 85,
      connected: true,
      lastUpdate: "2 мин назад"
    },
    {
      id: 2,
      name: "Система полива",
      status: "active",
      location: "Поле B",
      icon: Droplets,
      battery: 92,
      connected: true,
      lastUpdate: "1 мин назад"
    },
    {
      id: 3,
      name: "Датчик температуры",
      status: "warning",
      location: "Поле C",
      icon: Thermometer,
      battery: 45,
      connected: true,
      lastUpdate: "5 мин назад"
    },
    {
      id: 4,
      name: "Камера наблюдения",
      status: "offline",
      location: "Поле D",
      icon: Camera,
      battery: 0,
      connected: false,
      lastUpdate: "2 часа назад"
    }
  ];


  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-600';
    if (battery > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Оборудование</h3>
          <button className="text-green-600 text-sm font-medium">Все</button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {equipment.map((item) => {
          return (
            <div key={item.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <item.icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {item.connected ? (
                    <Wifi className="h-3 w-3 text-green-600" />
                  ) : (
                    <WifiOff className="h-3 w-3 text-red-600" />
                  )}
                  <span className="text-xs text-gray-500">{item.lastUpdate}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Battery className={`h-4 w-4 ${getBatteryColor(item.battery)}`} />
                  <span className={`text-sm font-medium ${getBatteryColor(item.battery)}`}>
                    {item.battery}%
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      item.battery > 60 ? 'bg-green-500' : 
                      item.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.battery}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium active:bg-blue-100 transition-colors">
                  <Bell className="h-3.5 w-3.5" />
                  Уведомления
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-medium active:bg-green-100 transition-colors">
                  <MapPin className="h-3.5 w-3.5" />
                  Локации
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};