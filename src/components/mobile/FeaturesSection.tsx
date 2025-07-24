import { Card, CardBody } from "@nextui-org/react";
import { 
  Thermometer, 
  Droplets, 
  BarChart3, 
  Smartphone,
  Zap,
  Shield
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Thermometer,
      title: "Мониторинг климата",
      description: "Отслеживание температуры, влажности и других показателей"
    },
    {
      icon: Droplets,
      title: "Управление поливом",
      description: "Автоматизированная система орошения"
    },
    {
      icon: BarChart3,
      title: "Аналитика",
      description: "Детальные отчеты и прогнозы урожайности"
    },
    {
      icon: Smartphone,
      title: "Мобильное приложение",
      description: "Контроль и управление с любого устройства"
    },
    {
      icon: Zap,
      title: "Автоматизация",
      description: "Умные алгоритмы для оптимизации процессов"
    },
    {
      icon: Shield,
      title: "Надежность",
      description: "Защищенная система с резервным копированием"
    }
  ];

  return (
    <section id="features" className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Возможности платформы
        </h2>
        <p className="text-muted-foreground text-base">
          Все необходимые инструменты для современного фермера
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
            <CardBody className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};