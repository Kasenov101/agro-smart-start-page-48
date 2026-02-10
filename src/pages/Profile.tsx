import { Outlet, Link } from "react-router-dom";
import { 
  User, 
  Globe,
  LogOut
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
             <div className="px-4 py-2 space-y-1">
               {/* Top row: Logo left, Globe+User center-right */}
               <div className="flex items-center justify-end">
                 <div className="flex items-center gap-0.5">
                   <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon" className="h-7 w-7">
                         <Globe className="h-3.5 w-3.5" />
                       </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                       <DropdownMenuItem className="cursor-pointer">🇷🇺 Русский</DropdownMenuItem>
                       <DropdownMenuItem className="cursor-pointer">🇺🇸 English</DropdownMenuItem>
                       <DropdownMenuItem className="cursor-pointer">🇰🇿 Қазақша</DropdownMenuItem>
                     </DropdownMenuContent>
                   </DropdownMenu>
                   <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon" className="h-7 w-7">
                         <User className="h-3.5 w-3.5" />
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
               {/* Bottom row: Sidebar + Back */}
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="h-7 w-7 [&_svg]:h-3.5 [&_svg]:w-3.5" />
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
