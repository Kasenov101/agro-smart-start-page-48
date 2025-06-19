
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart Center</h1>
              <p className="text-sm text-gray-600">Для крестьянских хозяйств</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Возможности
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Тарифы
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Контакты
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Войти
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Регистрация
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
