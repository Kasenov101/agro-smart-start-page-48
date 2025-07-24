import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sprout } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="py-12 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Hero Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Sprout className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Hero Text */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          Умное управление
          <span className="text-primary block">сельским хозяйством</span>
        </h1>
        
        <p className="text-lg text-muted-foreground leading-relaxed px-4">
          Современные технологии для максимизации урожайности и оптимизации ресурсов
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 px-4">
          <Button 
            as={Link}
            to="/mobile/register"
            color="primary"
            size="lg"
            endContent={<ArrowRight className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Начать работу
          </Button>
          <Button 
            as={Link}
            to="/mobile/dashboard"
            variant="bordered"
            size="lg"
            className="w-full sm:w-auto"
          >
            Демо версия
          </Button>
        </div>
      </div>
    </section>
  );
};