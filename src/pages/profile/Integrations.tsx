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
      id: 'zapier',
      name: 'Zapier',
      description: 'Автоматизируйте рабочие процессы с помощью тысяч приложений',
      icon: Zap,
      color: 'bg-orange-500',
      status: 'available',
      category: 'Автоматизация'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Интеграция с электронной почтой для уведомлений',
      icon: Mail,
      color: 'bg-red-500',
      status: 'connected',
      category: 'Почта'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Получайте уведомления в командном чате',
      icon: MessageSquare,
      color: 'bg-purple-500',
      status: 'available',
      category: 'Коммуникации'
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Синхронизация событий и планирование встреч',
      icon: Calendar,
      color: 'bg-blue-500',
      status: 'available',
      category: 'Планирование'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM интеграция для управления клиентами',
      icon: Database,
      color: 'bg-cyan-500',
      status: 'premium',
      category: 'CRM'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Облачное хранилище для файлов проекта',
      icon: Cloud,
      color: 'bg-blue-600',
      status: 'connected',
      category: 'Хранилище'
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      description: 'Уведомления через Telegram бота',
      icon: Smartphone,
      color: 'bg-blue-400',
      status: 'available',
      category: 'Мессенджеры'
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      description: 'Отслеживание метрик и аналитики',
      icon: BarChart3,
      color: 'bg-yellow-500',
      status: 'available',
      category: 'Аналитика'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Синхронизация документации и заметок',
      icon: FileText,
      color: 'bg-gray-700',
      status: 'premium',
      category: 'Документы'
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Интеграция с корпоративным мессенджером',
      icon: Users,
      color: 'bg-indigo-500',
      status: 'available',
      category: 'Коммуникации'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Обработка платежей и биллинг',
      icon: DollarSign,
      color: 'bg-purple-600',
      status: 'premium',
      category: 'Платежи'
    },
    {
      id: 'okta',
      name: 'Okta',
      description: 'Single Sign-On и управление доступом',
      icon: Shield,
      color: 'bg-green-600',
      status: 'enterprise',
      category: 'Безопасность'
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

  const categories = Array.from(new Set(integrations.map(i => i.category)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Интеграции</h2>
        <p className="text-gray-600">
          Подключите внешние сервисы для расширения функциональности платформы
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter(integration => integration.category === category)
              .map((integration) => {
                const Icon = integration.icon;
                return (
                  <Card key={integration.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${integration.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                        </div>
                        {getStatusBadge(integration.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {integration.description}
                      </p>
                      <Button 
                        variant={getButtonVariant(integration.status)}
                        className="w-full"
                        disabled={integration.status === 'enterprise'}
                      >
                        {getButtonText(integration.status)}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900">
              Нужна кастомная интеграция?
            </h3>
          </div>
          <p className="text-blue-700 mb-4">
            Мы можем разработать индивидуальную интеграцию специально для ваших потребностей.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Связаться с нами
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;