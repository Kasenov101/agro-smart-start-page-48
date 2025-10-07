import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { AlertCircle, User, Activity } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Define combine icon
const combineIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface CombineData {
  id: string;
  name: string;
  position: [number, number];
  operator: string;
  status: 'active' | 'idle' | 'error';
  errors: string[];
  track: [number, number][];
}

export const CombineMap = () => {
  const [selectedCombine, setSelectedCombine] = useState<CombineData | null>(null);

  // Sample combine data
  const combines: CombineData[] = [
    {
      id: '1',
      name: 'Комбайн #1',
      position: [51.1694, 71.4491],
      operator: 'Иванов Иван',
      status: 'active',
      errors: [],
      track: [
        [51.1694, 71.4491],
        [51.1704, 71.4501],
        [51.1714, 71.4511],
        [51.1724, 71.4521]
      ]
    },
    {
      id: '2',
      name: 'Комбайн #2',
      position: [51.1594, 71.4391],
      operator: 'Петров Петр',
      status: 'error',
      errors: ['Низкий уровень топлива', 'Требуется техобслуживание'],
      track: [
        [51.1594, 71.4391],
        [51.1604, 71.4401],
        [51.1614, 71.4411]
      ]
    },
    {
      id: '3',
      name: 'Комбайн #3',
      position: [51.1794, 71.4591],
      operator: 'Сидоров Сергей',
      status: 'idle',
      errors: [],
      track: [
        [51.1794, 71.4591],
        [51.1804, 71.4601],
        [51.1814, 71.4611],
        [51.1824, 71.4621]
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'error': return 'danger';
      case 'idle': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Работает';
      case 'error': return 'Ошибка';
      case 'idle': return 'Простой';
      default: return 'Неизвестно';
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Карта техники
        </h3>
      </CardHeader>
      <CardBody>
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Map */}
          <div className="lg:col-span-2 h-[500px] rounded-lg overflow-hidden">
            <MapContainer
              center={[51.1694, 71.4491]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {combines.map((combine) => (
                <div key={combine.id}>
                  {/* Track */}
                  <Polyline
                    positions={combine.track}
                    color={combine.status === 'error' ? '#ef4444' : combine.status === 'active' ? '#22c55e' : '#f59e0b'}
                    weight={3}
                    opacity={0.7}
                  />
                  
                  {/* Marker */}
                  <Marker
                    position={combine.position}
                    icon={combineIcon}
                    eventHandlers={{
                      click: () => setSelectedCombine(combine)
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-bold text-gray-900">{combine.name}</h4>
                        <p className="text-sm text-gray-600">Оператор: {combine.operator}</p>
                        <p className="text-sm">
                          Статус: <span className={`font-medium ${
                            combine.status === 'error' ? 'text-red-600' :
                            combine.status === 'active' ? 'text-green-600' :
                            'text-orange-600'
                          }`}>
                            {getStatusText(combine.status)}
                          </span>
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </div>
              ))}
            </MapContainer>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            {selectedCombine ? (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {selectedCombine.name}
                  </h4>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCombine.status === 'error' ? 'bg-red-100 text-red-700' :
                    selectedCombine.status === 'active' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {getStatusText(selectedCombine.status)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Оператор</p>
                      <p className="font-medium text-gray-900">{selectedCombine.operator}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Координаты</p>
                      <p className="font-medium text-gray-900 text-xs">
                        {selectedCombine.position[0].toFixed(4)}, {selectedCombine.position[1].toFixed(4)}
                      </p>
                    </div>
                  </div>

                  {selectedCombine.errors.length > 0 && (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-2">Ошибки</p>
                        <div className="space-y-2">
                          {selectedCombine.errors.map((error, index) => (
                            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-2">
                              <p className="text-sm text-red-800">{error}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedCombine.errors.length === 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <p className="text-sm text-green-800">Ошибок не обнаружено</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">Выберите комбайн на карте</p>
              </div>
            )}

            {/* Combines List */}
            <div className="space-y-2">
              <h5 className="font-semibold text-gray-900 text-sm mb-3">Все комбайны</h5>
              {combines.map((combine) => (
                <button
                  key={combine.id}
                  onClick={() => setSelectedCombine(combine)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedCombine?.id === combine.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{combine.name}</p>
                      <p className="text-xs text-gray-600">{combine.operator}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      combine.status === 'error' ? 'bg-red-500' :
                      combine.status === 'active' ? 'bg-green-500' :
                      'bg-orange-500'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
