import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Tractor, AlertCircle, User, Navigation, Clock, X } from "lucide-react";

// Типы данных
interface CombineError {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

interface Combine {
  id: number;
  name: string;
  position: [number, number];
  track: [number, number][];
  status: 'active' | 'idle' | 'maintenance';
  operator: string;
  speed: number;
  fuelLevel: number;
  errors: CombineError[];
}

const MobileCombineMap = () => {
  const [selectedCombine, setSelectedCombine] = useState<Combine | null>(null);
  const [showTrack, setShowTrack] = useState<number | null>(null);

  // Данные комбайнов
  const combines: Combine[] = [
    {
      id: 1,
      name: "John Deere S780",
      position: [51.1694, 71.4491],
      track: [
        [51.1694, 71.4491],
        [51.1704, 71.4501],
        [51.1714, 71.4511],
        [51.1724, 71.4521],
      ],
      status: 'active',
      operator: "Иван Петров",
      speed: 12.5,
      fuelLevel: 78,
      errors: [
        { id: 1, type: 'warning', message: 'Низкий уровень масла', timestamp: '10:30' },
        { id: 2, type: 'info', message: 'ТО через 5 часов', timestamp: '09:15' }
      ]
    },
    {
      id: 2,
      name: "CLAAS Lexion 780",
      position: [51.1794, 71.4591],
      track: [
        [51.1794, 71.4591],
        [51.1804, 71.4601],
        [51.1814, 71.4611],
      ],
      status: 'idle',
      operator: "Алексей Сидоров",
      speed: 0,
      fuelLevel: 45,
      errors: [
        { id: 1, type: 'critical', message: 'Перегрев двигателя', timestamp: '11:00' },
        { id: 2, type: 'warning', message: 'Низкий уровень топлива', timestamp: '10:45' }
      ]
    },
    {
      id: 3,
      name: "Case IH 8250",
      position: [51.1594, 71.4391],
      track: [
        [51.1594, 71.4391],
        [51.1604, 71.4401],
        [51.1614, 71.4411],
        [51.1624, 71.4421],
        [51.1634, 71.4431],
      ],
      status: 'maintenance',
      operator: "Дмитрий Козлов",
      speed: 0,
      fuelLevel: 92,
      errors: []
    }
  ];

  const getIcon = (status: string) => {
    const color = status === 'active' ? 'green' : status === 'idle' ? 'orange' : 'red';
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" fill="white"/>
        </svg>
      `)}`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-orange-100 text-orange-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Работает';
      case 'idle': return 'Простой';
      case 'maintenance': return 'Ремонт';
      default: return status;
    }
  };

  const getErrorColor = (type: string) => {
    switch(type) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Карта техники</h3>
      </div>
      
      {/* Кнопки треков */}
      <div className="px-6 py-3 bg-gray-50 flex gap-2 overflow-x-auto">
        {combines.map(combine => (
          <button
            key={combine.id}
            onClick={() => setShowTrack(showTrack === combine.id ? null : combine.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              showTrack === combine.id 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            Трек {combine.id}
          </button>
        ))}
      </div>

      {/* Карта */}
      <div className="h-[400px]">
        <MapContainer 
          center={[51.1694, 71.4491]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {combines.map((combine) => (
            <Marker 
              key={combine.id} 
              position={combine.position}
              icon={getIcon(combine.status)}
              eventHandlers={{
                click: () => setSelectedCombine(combine),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold text-sm">{combine.name}</h4>
                  <p className="text-xs">{combine.operator}</p>
                  <button 
                    onClick={() => setSelectedCombine(combine)}
                    className="mt-2 w-full bg-green-600 text-white text-xs py-1 rounded"
                  >
                    Подробнее
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {combines.map((combine) => 
            showTrack === combine.id && (
              <Polyline 
                key={`track-${combine.id}`}
                positions={combine.track}
                color={combine.status === 'active' ? 'green' : 'orange'}
                weight={3}
                opacity={0.7}
              />
            )
          )}
        </MapContainer>
      </div>

      {/* Модальное окно для мобильной версии */}
      {selectedCombine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Tractor className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedCombine.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mt-1 ${getStatusColor(selectedCombine.status)}`}>
                      {getStatusText(selectedCombine.status)}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCombine(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Оператор */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Оператор</span>
                </div>
                <p className="font-semibold text-gray-900">{selectedCombine.operator}</p>
              </div>

              {/* Параметры */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-gray-600">Скорость</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{selectedCombine.speed} км/ч</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-gray-600">Топливо</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{selectedCombine.fuelLevel}%</p>
                </div>
              </div>

              {/* Ошибки */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                  <h4 className="font-semibold">Ошибки и предупреждения</h4>
                </div>
                {selectedCombine.errors.length === 0 ? (
                  <p className="text-gray-500 text-sm">Нет ошибок</p>
                ) : (
                  <div className="space-y-2">
                    {selectedCombine.errors.map((error) => (
                      <div 
                        key={error.id} 
                        className="bg-gray-50 rounded-xl p-3"
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getErrorColor(error.type)}`}>
                            {error.type === 'critical' ? 'Критично' : 
                             error.type === 'warning' ? 'Предупр.' : 'Инфо'}
                          </span>
                          <span className="text-xs text-gray-500">{error.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-900">{error.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCombineMap;
