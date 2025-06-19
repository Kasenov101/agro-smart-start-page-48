
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, BarChart3, Users, Shield, Smartphone, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sprout className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">Smart Center</span>
          </div>
          <p className="text-green-200">© 2024 Smart Center. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
