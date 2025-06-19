
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        {/* Badge */}
        <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
          🌱 Новое поколение управления хозяйством
        </Badge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Умное управление вашим{" "}
          <span className="text-green-600 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
            крестьянским хозяйством
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Автоматизируйте учет, планируйте посевы, отслеживайте урожайность и управляйте 
          финансами с помощью современных технологий.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold group"
          >
            Начать бесплатно
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-semibold group"
          >
            <Play className="mr-2 h-5 w-5" />
            Смотреть демо
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
            <div className="text-gray-600">Довольных фермеров</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50M+</div>
            <div className="text-gray-600">Гектаров под управлением</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Повышение эффективности</div>
          </div>
        </div>
      </div>
    </section>
  );
};
