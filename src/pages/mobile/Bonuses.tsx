import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, Gift, History, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MobileBonuses = () => {
  const navigate = useNavigate();
  
  const currentBalance = 2450.75;
  
  const bonusHistory = [
    {
      date: "2024-03-15",
      description: "Покупка оборудования - Трактор John Deere",
      amount: 125.50,
      status: "Зачислено"
    },
    {
      date: "2024-03-10",
      description: "Покупка семян подсолнечника",
      amount: 45.25,
      status: "Зачислено"
    },
    {
      date: "2024-03-05",
      description: "Заказ удобрений",
      amount: 78.90,
      status: "Зачислено"
    },
    {
      date: "2024-02-28",
      description: "Покупка запчастей",
      amount: 32.15,
      status: "Зачислено"
    },
    {
      date: "2024-02-20",
      description: "Консультационные услуги",
      amount: 89.60,
      status: "Зачислено"
    }
  ];

  const faqItems = [
    {
      question: "Как начисляются бонусы?",
      answer: "Бонусы начисляются автоматически при совершении покупок в размере 2% от суммы заказа. Бонусы поступают на ваш счет в течение 24 часов после подтверждения оплаты."
    },
    {
      question: "Куда можно потратить бонусы?",
      answer: "Бонусы можно использовать для оплаты до 50% стоимости любого заказа. Также бонусы принимаются к оплате консультационных услуг и технической поддержки."
    },
    {
      question: "Есть ли срок действия у бонусов?",
      answer: "Бонусы действительны в течение 12 месяцев с момента зачисления. За месяц до истечения срока мы отправим вам уведомление на электронную почту."
    },
    {
      question: "Можно ли передать бонусы другой организации?",
      answer: "Передача бонусов между организациями не предусмотрена. Бонусы привязаны к конкретному аккаунту организации и не подлежат передаче."
    },
    {
      question: "Как увеличить процент начисления бонусов?",
      answer: "Процент начисления бонусов увеличивается в зависимости от статуса клиента. Регулярные покупки и участие в программе лояльности позволяют получить статус 'Премиум' с начислением 3.5% бонусов."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="h-11 bg-white flex items-center justify-center">
        <div className="w-full max-w-sm flex items-center justify-between px-6 text-xs font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/mobile/profile/organization')}
              className="flex items-center gap-2 text-gray-600 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Gift className="h-4 w-4 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Бонусы</h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4 pb-24">
        {/* Current Balance */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6" />
              <span className="text-lg font-medium">Баланс бонусов</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-green-100">
              Доступно для использования
            </p>
          </div>
        </div>

        {/* Bonus History */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">История начислений</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {bonusHistory.map((transaction, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 pr-3">
                    <div className="font-medium text-gray-900 text-sm mb-1">
                      {transaction.description}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 mb-1">
                      +${transaction.amount}
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">Часто задаваемые вопросы</h3>
            </div>
          </div>
          <div className="p-4">
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-100 rounded-xl px-4">
                  <AccordionTrigger className="text-left hover:no-underline text-sm font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-sm mx-auto">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigate('/mobile')}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-400">Главная</span>
          </button>
          <button 
            onClick={() => navigate('/mobile/dashboard')}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-400">Дашборд</span>
          </button>
          <button 
            onClick={() => navigate('/mobile/profile')}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            <span className="text-xs font-medium text-blue-600">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileBonuses;