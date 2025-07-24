import { Header } from "@/components/mobile/Header";
import { HeroSection } from "@/components/mobile/HeroSection";
import { FeaturesSection } from "@/components/mobile/FeaturesSection";
import { Sprout } from "lucide-react";

const MobileIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4">
        <HeroSection />
        <FeaturesSection />
      </main>
      
      {/* Mobile Footer */}
      <footer className="bg-card text-card-foreground py-6 mt-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-3">
            <Sprout className="h-5 w-5 mr-2 text-primary" />
            <span className="text-lg font-bold">Smart Center</span>
          </div>
          <p className="text-muted-foreground text-sm">© 2024 Smart Center. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default MobileIndex;