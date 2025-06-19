
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Shield, Smartphone, TrendingUp, Calendar } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Аналитика урожайности",
      description: "Отслеживайте показатели урожайности по полям и культурам с детальной аналитикой"
    },
    {
      icon: Calendar,
      title: "Планирование посевов",
      description: "Составляйте календарь посевных работ и получайте напоминания о важных задачах"
    },
    {
      icon: TrendingUp,
      title: "Финансовый учет",
      description: "Ведите учет доходов и расходов, анализируйте рентабельность каждой культуры"
    },
    {
      icon: Users,
      title: "Управление персоналом",
      description: "Координируйте работу сотрудников и отслеживайте выполнение задач"
    },
    {
      icon: Shield,
      title: "Безопасность данных",
      description: "Ваши данные защищены современными методами шифрования и резервного копирования"
    },
    {
      icon: Smartphone,
      title: "Мобильное приложение",
      description: "Управляйте хозяйством из любой точки с помощью мобильного приложения"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Все что нужно для эффективного хозяйства
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Комплексное решение для автоматизации всех процессов в крестьянском хозяйстве
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg group bg-white"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-gray-100 group-hover:bg-green-50 transition-colors p-3 rounded-xl w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-gray-700 group-hover:text-green-600 transition-colors" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Готовы начать?</h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Присоединяйтесь к тысячам фермеров, которые уже используют Smart Center 
              для управления своими хозяйствами
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Попробовать бесплатно
              </button>
              <button className="border-2 border-gray-500 text-gray-300 hover:border-white hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Связаться с нами
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
