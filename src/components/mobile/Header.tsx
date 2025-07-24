import { useState } from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem, 
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Sprout, Globe, User, LogOut } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Главная", href: "/mobile" },
    { name: "Возможности", href: "/mobile#features" },
    { name: "Dashboard", href: "/mobile/dashboard" },
    { name: "Войти", href: "/mobile/login" },
    { name: "Регистрация", href: "/mobile/register" }
  ];

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Sprout className="h-6 w-6 mr-2 text-primary" />
          <Link to="/mobile" className="font-bold text-inherit">
            Smart Center
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/mobile" className="text-foreground">
            Главная
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/mobile#features" className="text-foreground">
            Возможности
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/mobile/dashboard" className="text-foreground">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* Language Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" size="sm" isIconOnly className="hidden sm:flex">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="ru">🇷🇺 Русский</DropdownItem>
            <DropdownItem key="en">🇺🇸 English</DropdownItem>
            <DropdownItem key="kz">🇰🇿 Қазақша</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* User Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Avatar size="sm" className="hidden sm:flex" />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="profile" startContent={<User className="h-4 w-4" />}>
              Личный кабинет
            </DropdownItem>
            <DropdownItem key="logout" startContent={<LogOut className="h-4 w-4" />}>
              Выход
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="primary" href="/mobile/register" variant="flat" size="sm">
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              to={item.href}
              className="w-full text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};