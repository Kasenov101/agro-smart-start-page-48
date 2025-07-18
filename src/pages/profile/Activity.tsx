import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Calendar } from "lucide-react";

const Activity = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Активность
            </h3>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Последний вход</span>
            <span className="font-medium text-gray-900">Сегодня, 14:30</span>
          </div>
          
          <Divider />
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Проектов создано</span>
            <span className="font-medium text-gray-900">12</span>
          </div>
          
          <Divider />
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Отчетов сгенерировано</span>
            <span className="font-medium text-gray-900">24</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Activity;