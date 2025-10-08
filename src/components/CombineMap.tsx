import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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

export const CombineMap = () => {
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedCombine, setSelectedCombine] = useState("");
  const [showTrack, setShowTrack] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredFields = fields.filter(f => !selectedOrg || f.orgId === selectedOrg);
  const filteredCombines = combines.filter(c => !selectedField || c.fieldId === selectedField);
  const selectedCombineData = combines.find(c => c.id === selectedCombine);

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "error": return "red";
      case "warning": return "orange";
      default: return "green";
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Карта техники</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-green-600 text-white">
              <MapPin className="h-4 w-4 mr-2" />
              Выбрать технику
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Выбор техники</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Организация</Label>
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите организацию" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map(org => (
                      <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Поле</Label>
                <Select value={selectedField} onValueChange={setSelectedField} disabled={!selectedOrg}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите поле" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredFields.map(field => (
                      <SelectItem key={field.id} value={field.id}>{field.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Комбайн</Label>
                <Select value={selectedCombine} onValueChange={setSelectedCombine} disabled={!selectedField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите комбайн" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCombines.map(combine => (
                      <SelectItem key={combine.id} value={combine.id}>{combine.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCombineData && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
                  <h4 className="font-semibold text-gray-900">Информация о технике</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Модель:</span> {selectedCombineData.model}</p>
                    <p><span className="font-medium">Производитель:</span> {selectedCombineData.manufacturer}</p>
                    <p><span className="font-medium">VIN:</span> {selectedCombineData.vin}</p>
                    <p><span className="font-medium">Год:</span> {selectedCombineData.year}</p>
                    <p><span className="font-medium">Оператор:</span> {selectedCombineData.operator}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="flat"
                    className="w-full mt-2"
                    onClick={() => {
                      setShowTrack(true);
                      setDialogOpen(false);
                    }}
                  >
                    Показать трек на карте
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardBody>
        <div className="h-64 rounded-lg overflow-hidden">
          <MapContainer
            center={[51.1694, 71.4491]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {combines.map((combine) => (
              <Marker key={combine.id} position={combine.position}>
                <Popup>
                  <div className="text-sm">
                    <strong>{combine.name}</strong>
                    <br />
                    <span>Оператор: {combine.operator}</span>
                    <br />
                    <span>VIN: {combine.vin}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
            {showTrack && selectedCombineData && (
              <Polyline
                positions={selectedCombineData.track}
                color="blue"
                weight={3}
                opacity={0.7}
              />
            )}
          </MapContainer>
        </div>
      </CardBody>
    </Card>
  );
};
