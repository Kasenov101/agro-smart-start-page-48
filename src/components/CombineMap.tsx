import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardBody, CardHeader, Button, Modal, ModalContent, ModalHeader, ModalBody, Chip } from "@nextui-org/react";
import { Tractor, AlertCircle, User, Navigation, Clock } from "lucide-react";

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

const CombineMap = () => {
  const [selectedCombine, setSelectedCombine] = useState<Combine | null>(null);
  const [showTrack, setShowTrack] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Данные комбайнов (пример)
  const combines: Combine[] = [
    {
      id: 1,
      name: "John Deere S780",
      position: [51.1694, 71.4491], // Астана
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
        { id: 1, type: 'warning', message: 'Низкий уровень масла в двигателе', timestamp: '10:30' },
        { id: 2, type: 'info', message: 'Плановое ТО через 5 часов', timestamp: '09:15' }
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

  // Иконки для разных статусов
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

  const handleCombineClick = (combine: Combine) => {
    setSelectedCombine(combine);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'success';
      case 'idle': return 'warning';
      case 'maintenance': return 'danger';
      default: return 'default';
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
      case 'critical': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'primary';
      default: return 'default';
    }
  };

  return (
    <>
      <Card className="bg-white h-[500px]">
        <CardHeader className="pb-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Карта техники
          </h3>
          <div className="flex gap-2">
            {combines.map(combine => (
              <Button
                key={combine.id}
                size="sm"
                variant={showTrack === combine.id ? "solid" : "bordered"}
                color={getStatusColor(combine.status) as any}
                onPress={() => setShowTrack(showTrack === combine.id ? null : combine.id)}
              >
                Трек {combine.id}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardBody className="p-0 overflow-hidden">
          <MapContainer 
            center={[51.1694, 71.4491]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Маркеры комбайнов */}
            {combines.map((combine) => (
              <Marker 
                key={combine.id} 
                position={combine.position}
                icon={getIcon(combine.status)}
                eventHandlers={{
                  click: () => handleCombineClick(combine),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-bold">{combine.name}</h4>
                    <p className="text-sm">Оператор: {combine.operator}</p>
                    <p className="text-sm">Скорость: {combine.speed} км/ч</p>
                    <Button 
                      size="sm" 
                      color="primary"
                      className="mt-2"
                      onPress={() => handleCombineClick(combine)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Отображение треков */}
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
        </CardBody>
      </Card>

      {/* Модальное окно с деталями */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Tractor className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="text-xl font-bold">{selectedCombine?.name}</h3>
                <Chip 
                  size="sm" 
                  color={getStatusColor(selectedCombine?.status || '') as any}
                  variant="flat"
                >
                  {getStatusText(selectedCombine?.status || '')}
                </Chip>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="pb-6">
            {selectedCombine && (
              <div className="space-y-6">
                {/* Информация об операторе */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <h4 className="font-semibold">Оператор</h4>
                  </div>
                  <p className="text-gray-900 font-medium">{selectedCombine.operator}</p>
                </div>

                {/* Текущие параметры */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Navigation className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Скорость</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedCombine.speed} км/ч</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Топливо</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedCombine.fuelLevel}%</p>
                  </div>
                </div>

                {/* Ошибки и предупреждения */}
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
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <Chip 
                            size="sm" 
                            color={getErrorColor(error.type) as any}
                            variant="flat"
                          >
                            {error.type === 'critical' ? 'Критично' : 
                             error.type === 'warning' ? 'Предупреждение' : 'Инфо'}
                          </Chip>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{error.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{error.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CombineMap;
