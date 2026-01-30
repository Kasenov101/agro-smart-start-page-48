import { NavLink, useLocation } from "react-router-dom";
import { 
  User, 
  Building, 
  Shield,
  Calendar,
  Users,
  CreditCard,
  Building2,
  Globe,
  Bell,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: 'personal',
    label: 'Личная информация',
    icon: User,
    path: '/profile/personal',
  },
  {
    id: 'organization',
    label: 'Организация',
    icon: Building,
    path: '/profile/organization',
  },
  {
    id: 'security',
    label: 'Безопасность',
    icon: Shield,
    path: '/profile/security',
  },
  {
    id: 'activity',
    label: 'Активность',
    icon: Calendar,
    path: '/profile/activity',
  },
  {
    id: 'users',
    label: 'Пользователи',
    icon: Users,
    path: '/profile/users',
  },
  {
    id: 'subscriptions',
    label: 'Подписки',
    icon: CreditCard,
    path: '/profile/subscriptions',
  },
  {
    id: 'organizations',
    label: 'Дочерние организации',
    icon: Building2,
    path: '/profile/organizations',
  },
  {
    id: 'integrations',
    label: 'Интеграции',
    icon: Globe,
    path: '/profile/integrations',
  },
  {
    id: 'notifications',
    label: 'Уведомления',
    icon: Bell,
    path: '/profile/notifications',
  }
];

const ProfileSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2",
            isCollapsed && "sr-only"
          )}>
            Настройки профиля
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "group relative transition-all duration-200",
                        isActive && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      <NavLink to={item.path} className="flex items-center gap-3">
                        <Icon className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )} />
                        <span className={cn(
                          "flex-1 truncate",
                          isCollapsed && "sr-only"
                        )}>
                          {item.label}
                        </span>
                        {isActive && !isCollapsed && (
                          <ChevronRight className="h-4 w-4 text-primary opacity-60" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProfileSidebar;
