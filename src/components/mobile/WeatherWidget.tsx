import { Card, CardBody } from "@nextui-org/react";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer 
} from "lucide-react";

export const WeatherWidget = () => {
  const weatherData = {
    location: "Алматы",
    temperature: "24°C",
    condition: "Солнечно",
    humidity: "65%",
    windSpeed: "12 км/ч",
    pressure: "1013 мбар"
  };

  const forecast = [
    { day: "Сегодня", temp: "24°", icon: Sun },
    { day: "Завтра", temp: "22°", icon: Cloud },
    { day: "Среда", temp: "19°", icon: CloudRain },
    { day: "Четверг", temp: "21°", icon: Sun }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{weatherData.location}</h3>
            <p className="text-blue-100">{weatherData.condition}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{weatherData.temperature}</p>
            <Sun className="h-8 w-8 ml-auto" />
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <Droplets className="h-4 w-4 mx-auto mb-1" />
            <p className="text-xs text-blue-100">Влажность</p>
            <p className="text-sm font-medium">{weatherData.humidity}</p>
          </div>
          <div className="text-center">
            <Wind className="h-4 w-4 mx-auto mb-1" />
            <p className="text-xs text-blue-100">Ветер</p>
            <p className="text-sm font-medium">{weatherData.windSpeed}</p>
          </div>
          <div className="text-center">
            <Thermometer className="h-4 w-4 mx-auto mb-1" />
            <p className="text-xs text-blue-100">Давление</p>
            <p className="text-sm font-medium">{weatherData.pressure}</p>
          </div>
        </div>

        {/* Forecast */}
        <div className="grid grid-cols-4 gap-2">
          {forecast.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-blue-100 mb-1">{item.day}</p>
              <item.icon className="h-4 w-4 mx-auto mb-1" />
              <p className="text-sm font-medium">{item.temp}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};