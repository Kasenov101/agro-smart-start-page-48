import { Outlet, Link } from "react-router-dom";
import { 
  User, 
  Globe,
  LogOut,
  ArrowLeft,
  Sprout
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

const Profile = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-muted/30">
        <ProfileSidebar />
        
        <SidebarInset className="flex flex-col flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex items-center justify-between h-14 px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="" />
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Назад</span>
                </Link>
                <div className="h-5 w-px bg-border" />
                <Link to="/" className="flex items-center gap-2">
                  <div className="bg-green-600 p-1.5 rounded-lg">
                    <Sprout className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-foreground hidden sm:inline">Smart Center</span>
                </Link>
              </div>
              
              <div className="flex items-center gap-1">
                {/* Language Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">🇷🇺 Русский</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">🇺🇸 English</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">🇰🇿 Қазақша</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/profile/personal" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Личный кабинет
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Выход
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            <div className="bg-background rounded-lg border shadow-sm h-full">
              <div className="p-4 md:p-6">
                <Outlet />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
