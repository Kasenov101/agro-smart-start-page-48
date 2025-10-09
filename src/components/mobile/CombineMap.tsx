import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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

export const CombineMap = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Карта техники</h3>
        <div className="flex items-center gap-3">
          <Tractor className="h-5 w-5 text-gray-600" />
          <Cloud className="h-5 w-5 text-gray-600" />
        </div>
      </div>
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        <div className="text-center px-4">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Здесь будет карта</p>
        </div>
      </div>
    </div>
  );
};
