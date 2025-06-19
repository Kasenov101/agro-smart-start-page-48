
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Sprout } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sprout className="h-6 w-6 mr-2 text-green-500" />
            <span className="text-xl font-bold">Smart Center</span>
          </div>
          <p className="text-gray-400">© 2024 Smart Center. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
