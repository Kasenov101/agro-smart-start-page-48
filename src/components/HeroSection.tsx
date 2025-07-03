
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from '@nextui-org/react';
import { ArrowRight, BarChart3, Users, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Управляйте бизнесом{" "}
            <span className="text-green-600">умнее</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Smart Center помогает сельскохозяйственным предприятиям оптимизировать
            процессы, увеличить прибыль и принимать обоснованные решения на основе данных.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-lg"
              size="lg"
              endContent={<ArrowRight className="h-5 w-5" />}
            >
              Начать бесплатно
            </Button>
            <Button
              as={Link}
              to="/login"
              variant="bordered"
              className="border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8 py-6 text-lg"
              size="lg"
            >
              Демо версия
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardBody className="text-center p-8">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Аналитика в реальном времени
              </h3>
              <p className="text-gray-600">
                Получайте актуальные данные о состоянии вашего бизнеса и принимайте
                обоснованные решения.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardBody className="text-center p-8">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Управление командой
              </h3>
              <p className="text-gray-600">
                Координируйте работу сотрудников и отслеживайте выполнение задач
                в едином интерфейсе.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardBody className="text-center p-8">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Автоматизация процессов
              </h3>
              <p className="text-gray-600">
                Автоматизируйте рутинные задачи и сосредоточьтесь на развитии
                вашего бизнеса.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};
