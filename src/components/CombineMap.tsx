import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MapPin, Tractor, Cloud } from "lucide-react";

const organizations = [
  { id: "1", name: "Агрохолдинг Казахстан" },
  { id: "2", name: "Зерно Плюс ТОО" },
  { id: "3", name: "Агро Союз КЗ" }
];

const fields = [
  { id: "1", name: "Поле №1 Северное", orgId: "1" },
  { id: "2", name: "Поле №2 Южное", orgId: "1" },
  { id: "3", name: "Поле №3 Восточное", orgId: "2" }
];

const combines = [
  {
    id: "1",
    name: "CLAAS LEXION 780",
    fieldId: "1",
    manufacturer: "CLAAS",
    model: "LEXION 780",
    vin: "WCL78012345678901",
    year: "2022",
    operator: "Иванов И.И.",
    status: "error",
    position: [51.1694, 71.4491] as [number, number],
    track: [
      [51.1694, 71.4491] as [number, number],
      [51.1704, 71.4501] as [number, number],
      [51.1714, 71.4511] as [number, number],
      [51.1724, 71.4521] as [number, number]
    ]
  },
  {
    id: "2",
    name: "John Deere S790",
    fieldId: "1",
    manufacturer: "John Deere",
    model: "S790",
    vin: "1M0S790ABCD123456",
    year: "2023",
    operator: "Петров П.П.",
    status: "warning",
    position: [51.1744, 71.4531] as [number, number],
    track: [
      [51.1744, 71.4531] as [number, number],
      [51.1754, 71.4541] as [number, number],
      [51.1764, 71.4551] as [number, number],
      [51.1774, 71.4561] as [number, number]
    ]
  },
  {
    id: "3",
    name: "New Holland CR10.90",
    fieldId: "2",
    manufacturer: "New Holland",
    model: "CR10.90",
    vin: "NHCR109087654321",
    year: "2021",
    operator: "Сидоров С.С.",
    status: "ok",
    position: [51.1794, 71.4571] as [number, number],
    track: [
      [51.1794, 71.4571] as [number, number],
      [51.1804, 71.4581] as [number, number],
      [51.1814, 71.4591] as [number, number],
      [51.1824, 71.4601] as [number, number]
    ]
  }
];

const equipmentErrors = [
  {
    id: "1",
    name: "Комбайн CLAAS LEXION 780",
    vin: "WCL78012345678901",
    error: "Перегрев двигателя. Требуется немедленная остановка и проверка системы охлаждения.",
    severity: "error"
  },
  {
    id: "2",
    name: "Комбайн John Deere S790",
    vin: "1M0S790ABCD123456",
    error: "Низкое давление масла. Рекомендуется проверка масляного фильтра.",
    severity: "warning"
  },
  {
    id: "3",
    name: "Комбайн New Holland CR10.90",
    vin: "NHCR109087654321",
    error: "Датчик уровня зерна неисправен. Требуется калибровка или замена.",
    severity: "info"
  }
];

export const CombineMap = () => {
  const [showErrors, setShowErrors] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error": return "border-red-500";
      case "warning": return "border-orange-500";
      default: return "border-yellow-500";
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case "error": return "text-red-600";
      case "warning": return "text-orange-600";
      default: return "text-yellow-700";
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader className="pb-3 flex flex-row items-center justify-end">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowErrors(!showErrors)}
            className={`p-2.5 rounded-xl transition-colors ${
              showErrors ? 'bg-green-600 text-white' : 'bg-green-50 hover:bg-green-100 text-green-600'
            }`}
          >
            <Tractor className="h-5 w-5" />
          </button>
          <button className="p-2.5 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
            <Cloud className="h-5 w-5 text-blue-600" />
          </button>
        </div>
      </CardHeader>
      <CardBody>
        {!showErrors ? (
          <div className="h-64 rounded-lg bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Здесь будет карта</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-64 overflow-y-auto py-2">
            {equipmentErrors.map((item) => (
              <div key={item.id} className={`border-l-4 ${getSeverityColor(item.severity)} pl-4 py-2 space-y-2`}>
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-xs text-gray-600">VIN: {item.vin}</p>
                <p className={`text-sm ${getSeverityTextColor(item.severity)}`}>Ошибка: {item.error}</p>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
