import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Database, 
  Cloud,
  Smartphone,
  BarChart3,
  FileText,
  Users,
  DollarSign,
  Shield
} from 'lucide-react';

const Integrations = () => {
  const integrations = [
    {
      id: 'johndeere',
      name: 'John Deere Operations Center',
      description: 'Синхронизация данных с техникой John Deere для мониторинга работы',
      icon: BarChart3,
      color: 'bg-green-600',
      status: 'available'
    },
    {
      id: 'fieldclimate',
      name: 'FieldClimate',
      description: 'Метеорологические данные и мониторинг условий полей',
      icon: Cloud,
      color: 'bg-blue-500',
      status: 'connected'
    },
    {
      id: 'claas',
      name: 'CLAAS Telematics',
      description: 'Телематика комбайнов и другой техники CLAAS',
      icon: Smartphone,
      color: 'bg-orange-600',
      status: 'available'
    },
    {
      id: 'newholland',
      name: 'New Holland PLM Connect',
      description: 'Система точного земледелия и управления техникой',
      icon: Database,
      color: 'bg-blue-700',
      status: 'available'
    },
    {
      id: 'trimble',
      name: 'Trimble Agriculture',
      description: 'GPS-навигация и системы точного земледелия',
      icon: Shield,
      color: 'bg-purple-600',
      status: 'premium'
    },
    {
      id: 'agleader',
      name: 'Ag Leader Technology',
      description: 'Системы контроля высева и внесения удобрений',
      icon: BarChart3,
      color: 'bg-green-500',
      status: 'available'
    },
    {
      id: 'climate',
      name: 'Climate FieldView',
      description: 'Цифровая платформа для анализа полей и урожайности',
      icon: FileText,
      color: 'bg-teal-600',
      status: 'premium'
    },
    {
      id: 'topcon',
      name: 'Topcon Agriculture',
      description: 'Прецизионные системы земледелия и автопилот',
      icon: Zap,
      color: 'bg-red-600',
      status: 'available'
    },
    {
      id: 'raven',
      name: 'Raven Slingshot',
      description: 'Платформа для управления операциями и данными поля',
      icon: Calendar,
      color: 'bg-gray-700',
      status: 'enterprise'
    },
    {
      id: 'valtra',
      name: 'Valtra Connect',
      description: 'Телематические решения для тракторов Valtra',
      icon: Users,
      color: 'bg-red-500',
      status: 'available'
    },
    {
      id: 'case',
      name: 'Case IH AFS Connect',
      description: 'Система управления фермой и мониторинга техники',
      icon: DollarSign,
      color: 'bg-red-700',
      status: 'available'
    },
    {
      id: 'fendt',
      name: 'Fendt Connect',
      description: 'Телематика и цифровые сервисы для техники Fendt',
      icon: Smartphone,
      color: 'bg-green-700',
      status: 'premium'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Подключено</Badge>;
      case 'premium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Premium</Badge>;
      case 'enterprise':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Enterprise</Badge>;
      default:
        return <Badge variant="outline">Доступно</Badge>;
    }
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Настроить';
      case 'premium':
        return 'Обновить план';
      case 'enterprise':
        return 'Связаться с продажами';
      default:
        return 'Подключить';
    }
  };

  const getButtonVariant = (status: string) => {
    switch (status) {
      case 'connected':
        return 'outline' as const;
      case 'premium':
        return 'secondary' as const;
      case 'enterprise':
        return 'secondary' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <div className="space-y-8">
      {/* Описание интеграций */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-gray-600 leading-relaxed">
          Подключите вашу сельскохозяйственную технику и системы мониторинга для автоматического сбора данных, 
          оптимизации работы полей и повышения эффективности операций.
        </p>
      </div>

      {/* Сетка интеграций */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <Card key={integration.id} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${integration.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{integration.name}</CardTitle>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {integration.description}
                </p>
                <Button 
                  variant={getButtonVariant(integration.status)}
                  className="w-full group-hover:shadow-md transition-all duration-300"
                  disabled={integration.status === 'enterprise'}
                >
                  {getButtonText(integration.status)}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 border-0 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Нужна кастомная интеграция?
            </h3>
          </div>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Мы можем разработать индивидуальную интеграцию специально для ваших потребностей.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Связаться с нами
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;