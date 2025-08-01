import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer,
  MapPin
} from "lucide-react";

export const WeatherWidget = () => {
  const weatherData = {
    location: "Алматы",
    temperature: "24",
    condition: "Солнечно",
    humidity: "65",
    windSpeed: "12",
    pressure: "1013",
    feelsLike: "26"
  };

  const forecast = [
    { day: "Сегодня", temp: "24°", icon: Sun, chance: "0%" },
    { day: "Завтра", temp: "22°", icon: Cloud, chance: "20%" },
    { day: "Среда", temp: "19°", icon: CloudRain, chance: "80%" },
    { day: "Четверг", temp: "21°", icon: Sun, chance: "10%" }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{weatherData.location}</span>
          </div>
          <h3 className="text-2xl font-bold">{weatherData.temperature}°C</h3>
          <p className="text-blue-100">{weatherData.condition}</p>
        </div>
        <div className="text-right">
          <Sun className="h-16 w-16 text-yellow-300 mb-2" />
          <p className="text-xs text-blue-100">Ощущается как {weatherData.feelsLike}°</p>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center bg-white/10 rounded-xl p-3">
          <Droplets className="h-5 w-5 mx-auto mb-2 text-blue-200" />
          <p className="text-xs text-blue-100 mb-1">Влажность</p>
          <p className="text-lg font-bold">{weatherData.humidity}%</p>
        </div>
        <div className="text-center bg-white/10 rounded-xl p-3">
          <Wind className="h-5 w-5 mx-auto mb-2 text-blue-200" />
          <p className="text-xs text-blue-100 mb-1">Ветер</p>
          <p className="text-lg font-bold">{weatherData.windSpeed}</p>
          <p className="text-xs text-blue-100">км/ч</p>
        </div>
        <div className="text-center bg-white/10 rounded-xl p-3">
          <Thermometer className="h-5 w-5 mx-auto mb-2 text-blue-200" />
          <p className="text-xs text-blue-100 mb-1">Давление</p>
          <p className="text-lg font-bold">{weatherData.pressure}</p>
          <p className="text-xs text-blue-100">мбар</p>
        </div>
      </div>

      {/* 4-Day Forecast */}
      <div className="bg-white/10 rounded-xl p-4">
        <h4 className="text-sm font-semibold mb-3">Прогноз на 4 дня</h4>
        <div className="grid grid-cols-4 gap-2">
          {forecast.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-blue-100 mb-2">{item.day}</p>
              <item.icon className="h-6 w-6 mx-auto mb-2 text-blue-200" />
              <p className="text-sm font-bold mb-1">{item.temp}</p>
              <p className="text-xs text-blue-200">{item.chance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};