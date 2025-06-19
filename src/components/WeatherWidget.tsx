
import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from "lucide-react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: 22,
    condition: "sunny",
    humidity: 65,
    windSpeed: 12,
    location: "Краснодар"
  });

  // Симуляция получения данных о погоде
  useEffect(() => {
    const conditions = ["sunny", "cloudy", "rainy"];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * 20) + 15;
    
    setWeather(prev => ({
      ...prev,
      temperature: randomTemp,
      condition: randomCondition
    }));
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="h-16 w-16 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-16 w-16 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-16 w-16 text-blue-500" />;
      default:
        return <Sun className="h-16 w-16 text-yellow-500" />;
    }
  };

  const getConditionText = () => {
    switch (weather.condition) {
      case "sunny":
        return "Солнечно";
      case "cloudy":
        return "Облачно";
      case "rainy":
        return "Дождь";
      default:
        return "Солнечно";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Погода в {weather.location}
        </h3>
        <div className="flex justify-center mb-4">
          {getWeatherIcon()}
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {weather.temperature}°C
        </div>
        <div className="text-gray-600 font-medium">
          {getConditionText()}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Ощущается</div>
          <div className="font-semibold">{weather.temperature + 2}°C</div>
        </div>
        
        <div className="text-center">
          <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Влажность</div>
          <div className="font-semibold">{weather.humidity}%</div>
        </div>
        
        <div className="text-center">
          <Wind className="h-6 w-6 text-gray-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Ветер</div>
          <div className="font-semibold">{weather.windSpeed} км/ч</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
