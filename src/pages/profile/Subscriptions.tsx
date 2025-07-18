import { Card, CardBody, CardHeader, Button, Chip, Divider } from "@nextui-org/react";
import { CreditCard, Check, X } from "lucide-react";

const Subscriptions = () => {
  const currentSubscription = {
    name: "Профессиональный",
    price: "15,000 ₸/месяц",
    status: "active",
    nextBilling: "15 августа 2024",
    features: [
      "До 100 пользователей",
      "Неограниченные проекты",
      "Приоритетная поддержка",
      "Расширенная аналитика"
    ]
  };

  const availableSubscriptions = [
    {
      name: "Базовый",
      price: "5,000 ₸/месяц",
      features: [
        "До 10 пользователей",
        "5 проектов",
        "Базовая поддержка",
        "Стандартная аналитика"
      ],
      current: false
    },
    {
      name: "Профессиональный",
      price: "15,000 ₸/месяц",
      features: [
        "До 100 пользователей",
        "Неограниченные проекты",
        "Приоритетная поддержка",
        "Расширенная аналитика"
      ],
      current: true
    },
    {
      name: "Корпоративный",
      price: "50,000 ₸/месяц",
      features: [
        "Неограниченные пользователи",
        "Неограниченные проекты",
        "24/7 поддержка",
        "Пользовательская аналитика",
        "API доступ"
      ],
      current: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Текущая подписка
            </h3>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{currentSubscription.name}</h4>
              <p className="text-gray-600">{currentSubscription.price}</p>
            </div>
            <Chip color="success" variant="flat">
              Активна
            </Chip>
          </div>
          
          <div className="text-sm text-gray-600">
            Следующее списание: <span className="font-medium">{currentSubscription.nextBilling}</span>
          </div>
          
          <Divider />
          
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Включенные функции:</h5>
            <ul className="space-y-1">
              {currentSubscription.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button color="danger" variant="flat">
              Отменить подписку
            </Button>
            <Button color="primary" variant="flat">
              Изменить план
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Available Subscriptions */}
      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Доступные планы
          </h3>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4">
            {availableSubscriptions.map((plan, index) => (
              <div 
                key={index}
                className={`p-4 border rounded-lg ${
                  plan.current ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                    <p className="text-gray-600">{plan.price}</p>
                  </div>
                  {plan.current ? (
                    <Chip color="primary" variant="flat">
                      Текущий план
                    </Chip>
                  ) : (
                    <Button 
                      color="primary" 
                      size="sm"
                      variant={plan.name === "Корпоративный" ? "solid" : "flat"}
                    >
                      Выбрать план
                    </Button>
                  )}
                </div>
                
                <ul className="space-y-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <Check className="h-3 w-3 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Subscriptions;