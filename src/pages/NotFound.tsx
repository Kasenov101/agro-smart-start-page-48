
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-white shadow-xl">
        <CardBody className="text-center p-12">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Страница не найдена
            </h2>
            <p className="text-gray-600 mb-8">
              К сожалению, запрашиваемая страница не существует или была перемещена.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              as="a"
              href="/"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
              size="lg"
              startContent={<Home className="h-5 w-5" />}
            >
              Вернуться на главную
            </Button>
            
            <Button
              onClick={() => window.history.back()}
              variant="bordered"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              size="lg"
              startContent={<ArrowLeft className="h-5 w-5" />}
            >
              Назад
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Если проблема повторяется, обратитесь в службу поддержки
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotFound;
