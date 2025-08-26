import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, Gift, History, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Bonuses = () => {
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
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/profile/organization')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к информации о организации
        </Button>
      </div>

      {/* Current Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-green-600" />
            Текущий баланс бонусов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-muted-foreground">
              Доступно для использования
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bonus History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <History className="h-6 w-6 text-blue-600" />
            История начислений
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bonusHistory.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    +${transaction.amount}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-purple-600" />
            Часто задаваемые вопросы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bonuses;