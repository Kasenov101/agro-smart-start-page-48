
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1920&q=80" 
          alt="Крестьянское хозяйство" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/75"></div>
      </div>

      <div className="container mx-auto text-center max-w-4xl relative z-10">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Умное управление{" "}
          <span className="text-green-600">
            хозяйством
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Современная платформа для автоматизации учета, планирования посевов 
          и управления финансами в крестьянском хозяйстве
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
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
          >
            <Play className="mr-2 h-5 w-5" />
            Смотреть демо
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8">
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
