import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { AlertCircle, User, Activity, ChevronRight } from 'lucide-react';
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
  const [showDetails, setShowDetails] = useState(false);

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Работает';
      case 'error': return 'Ошибка';
      case 'idle': return 'Простой';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Карта техники</h3>
      </div>
      
      {/* Map */}
      <div className="h-[300px] relative">
        <MapContainer
          center={[51.1694, 71.4491]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
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
                  click: () => {
                    setSelectedCombine(combine);
                    setShowDetails(true);
                  }
                }}
              >
                <Popup>
                  <div className="p-1">
                    <h4 className="font-bold text-sm">{combine.name}</h4>
                    <p className="text-xs text-gray-600">{combine.operator}</p>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
      </div>

      {/* Combines List */}
      <div className="p-6 space-y-3">
        {combines.map((combine) => (
          <button
            key={combine.id}
            onClick={() => {
              setSelectedCombine(combine);
              setShowDetails(true);
            }}
            className="w-full bg-gray-50 p-4 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                combine.status === 'error' ? 'bg-red-100' :
                combine.status === 'active' ? 'bg-green-100' :
                'bg-orange-100'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  combine.status === 'error' ? 'bg-red-500' :
                  combine.status === 'active' ? 'bg-green-500' :
                  'bg-orange-500'
                }`} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm">{combine.name}</p>
                <p className="text-xs text-gray-600">{combine.operator}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Details Modal */}
      {showDetails && selectedCombine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedCombine.name}</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  selectedCombine.status === 'error' ? 'bg-red-100 text-red-700' :
                  selectedCombine.status === 'active' ? 'bg-green-100 text-green-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {getStatusText(selectedCombine.status)}
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <User className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Оператор</p>
                  <p className="font-medium text-gray-900">{selectedCombine.operator}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <Activity className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Координаты</p>
                  <p className="font-medium text-gray-900 text-xs">
                    {selectedCombine.position[0].toFixed(4)}, {selectedCombine.position[1].toFixed(4)}
                  </p>
                </div>
              </div>

              {selectedCombine.errors.length > 0 ? (
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <p className="font-semibold text-red-900">Обнаружены ошибки</p>
                  </div>
                  <div className="space-y-2 pl-8">
                    {selectedCombine.errors.map((error, index) => (
                      <div key={index} className="bg-white rounded-lg p-3">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-green-800 font-medium">Ошибок не обнаружено</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
