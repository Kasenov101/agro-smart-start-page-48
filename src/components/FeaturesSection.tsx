
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { 
  Smartphone, 
  Shield, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Database 
} from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      title: "Мобильное приложение",
      description: "Управляйте бизнесом из любой точки мира с нашим мобильным приложением."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Безопасность данных",
      description: "Ваши данные защищены современными методами шифрования и резервного копирования."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Прогнозирование",
      description: "Используйте ИИ для прогнозирования урожайности и планирования ресурсов."
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Экономия времени",
      description: "Автоматизация отчетности и документооборота экономит до 40% рабочего времени."
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-600" />,
      title: "GPS мониторинг",
      description: "Отслеживайте местоположение техники и оптимизируйте маршруты."
    },
    {
      icon: <Database className="h-8 w-8 text-indigo-600" />,
      title: "Интеграция систем",
      description: "Подключайте существующие системы учета и CRM через API."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Все необходимые инструменты в одном месте
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Smart Center предоставляет полный набор инструментов для эффективного
            управления современным сельскохозяйственным предприятием.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="bg-white p-3 rounded-lg shadow-sm w-fit">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
