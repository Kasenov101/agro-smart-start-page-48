import { useState } from "react";
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

const equipment = [
  {
    id: "1",
    name: "CLAAS LEXION 780",
    type: "Combine",
    orgId: "1",
    manufacturer: "CLAAS",
    model: "LEXION 780",
    vin: "WCL78012345678901",
    year: "2022",
    operator: "Иванов И.И.",
    status: "error"
  },
  {
    id: "2",
    name: "John Deere S790",
    type: "Combine",
    orgId: "1",
    manufacturer: "John Deere",
    model: "S790",
    vin: "1M0S790ABCD123456",
    year: "2023",
    operator: "Петров П.П.",
    status: "warning"
  },
  {
    id: "3",
    name: "New Holland CR10.90",
    type: "Combine",
    orgId: "2",
    manufacturer: "New Holland",
    model: "CR10.90",
    vin: "NHCR109087654321",
    year: "2021",
    operator: "Сидоров С.С.",
    status: "ok"
  },
  {
    id: "4",
    name: "John Deere 8R 410",
    type: "Tractor",
    orgId: "1",
    manufacturer: "John Deere",
    model: "8R 410",
    vin: "1M08R410XYZ789012",
    year: "2023",
    operator: "Козлов К.К.",
    status: "ok"
  },
  {
    id: "5",
    name: "Case IH Magnum 380",
    type: "Tractor",
    orgId: "2",
    manufacturer: "Case IH",
    model: "Magnum 380",
    vin: "CIH380ABC456789",
    year: "2022",
    operator: "Морозов М.М.",
    status: "warning"
  },
  {
    id: "6",
    name: "John Deere R4045",
    type: "Sprayer",
    orgId: "1",
    manufacturer: "John Deere",
    model: "R4045",
    vin: "JDR4045DEF123456",
    year: "2021",
    operator: "Федоров Ф.Ф.",
    status: "ok"
  },
  {
    id: "7",
    name: "Amazone UX 11200",
    type: "Sprayer",
    orgId: "3",
    manufacturer: "Amazone",
    model: "UX 11200",
    vin: "AMZ11200GHI789",
    year: "2023",
    operator: "Воронов В.В.",
    status: "ok"
  }
];

const viewTypes = ["Все", "Поля", "Техника"];
const equipmentTypes = ["Все", "Combine", "Tractor", "Sprayer"];

export const CombineMap = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string>("operation-center");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<string>("all");
  const [selectedView, setSelectedView] = useState<string>("Все");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState<string>("Все");

  const filteredEquipment = equipment.filter(item => {
    const orgMatch = selectedOrg === "all" || item.orgId === selectedOrg;
    const typeMatch = selectedEquipmentType === "Все" || item.type === selectedEquipmentType;
    return orgMatch && typeMatch;
  });

  const filteredFields = fields.filter(field => {
    const orgMatch = selectedOrg === "all" || field.orgId === selectedOrg;
    return orgMatch;
  });

  const getDisplayItems = () => {
    if (selectedView === "Поля") return filteredFields;
    if (selectedView === "Техника") return filteredEquipment;
    return [...filteredFields, ...filteredEquipment];
  };

  const displayItems = getDisplayItems();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "error": return "bg-red-100 text-red-700";
      case "warning": return "bg-orange-100 text-orange-700";
      default: return "bg-green-100 text-green-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "error": return "Ошибка";
      case "warning": return "Внимание";
      default: return "Работает";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Интеграции</h3>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" style={{ scrollbarWidth: 'thin' }}>
          <div className="flex items-center gap-2 w-fit">
            <button 
              onClick={() => {
                setSelectedIntegration("operation-center");
                setShowFilters(true);
              }}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                selectedIntegration === "operation-center" ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600 active:bg-green-100'
              }`}
            >
              Operation Center
            </button>
            <button 
              onClick={() => {
                setSelectedIntegration("field-climate");
                setShowFilters(false);
              }}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                selectedIntegration === "field-climate" ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 active:bg-blue-100'
              }`}
            >
              Field Climate
            </button>
            <button 
              onClick={() => {
                setSelectedIntegration("weather-api");
                setShowFilters(false);
              }}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                selectedIntegration === "weather-api" ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600 active:bg-purple-100'
              }`}
            >
              Weather API
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        <div className="text-center px-4">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {selectedIntegration === "operation-center" ? "Здесь будет карта техники" : "Здесь будет карта погоды"}
          </p>
        </div>
      </div>

      {selectedIntegration === "operation-center" && showFilters && (
        <div className="p-6 space-y-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Организация</label>
            <select 
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Все организации</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Отображение</label>
            <div className="grid grid-cols-3 gap-2">
              {viewTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedView(type)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedView === type 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {(selectedView === "Техника" || selectedView === "Все") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип техники</label>
              <div className="grid grid-cols-4 gap-2">
                {equipmentTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedEquipmentType(type)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedEquipmentType === type 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 max-h-96 overflow-y-auto">
            <h4 className="text-sm font-semibold text-gray-900">
              {selectedView === "Поля" ? `Список полей (${displayItems.length})` : 
               selectedView === "Техника" ? `Список техники (${displayItems.length})` :
               `Все объекты (${displayItems.length})`}
            </h4>
            {displayItems.map((item: any) => {
              const isField = 'name' in item && !('manufacturer' in item);
              
              if (isField) {
                return (
                  <div key={`field-${item.id}`} className="border border-gray-200 rounded-lg p-3 active:border-green-500 transition-colors">
                    <div className="flex items-start justify-between">
                      <h5 className="font-semibold text-gray-900 text-sm">{item.name}</h5>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Поле
                      </span>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={`equipment-${item.id}`} className="border border-gray-200 rounded-lg p-3 active:border-green-500 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-gray-900 text-sm">{item.name}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{item.manufacturer} {item.model}</p>
                  <p className="text-xs text-gray-500 mt-1">VIN: {item.vin}</p>
                  <p className="text-xs text-gray-500">Оператор: {item.operator}</p>
                  <p className="text-xs text-gray-500">Год: {item.year}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
