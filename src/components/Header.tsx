
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@nextui-org/react';
import { Sprout, Menu, X, Globe, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white shadow-sm"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/" className="flex items-center">
            <div className="bg-green-600 p-2 rounded-lg mr-3">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Smart Center</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/" className="text-gray-600 hover:text-green-600 font-medium">
            Главная
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="#features" className="text-gray-600 hover:text-green-600 font-medium">
            Возможности
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/dashboard" className="text-gray-600 hover:text-green-600 font-medium">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium">
            Войти
          </Link>
        </NavbarItem>
        
        {/* Language Switcher */}
        <NavbarItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button isIconOnly variant="light" className="text-gray-600">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem className="cursor-pointer">🇷🇺 Русский</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">🇺🇸 English</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">🇰🇿 Қазақша</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>

        {/* User Dropdown */}
        <NavbarItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button isIconOnly variant="light" className="text-gray-600">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/profile/personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Личный кабинет
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Выход
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>
        
        <NavbarItem>
          <Button 
            as={Link} 
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white font-medium"
            radius="md"
          >
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            to="/"
            className="w-full text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Главная
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to="#features"
            className="w-full text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Возможности
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to="/dashboard"
            className="w-full text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to="/login"
            className="w-full text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Войти
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
