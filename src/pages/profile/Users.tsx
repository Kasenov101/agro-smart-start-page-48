import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Avatar,
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {
  Users,
  MoreHorizontal,
  Trash2,
  ChevronRight,
  UserPlus,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "disabled";
  avatar?: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Анна Петрова",
      email: "anna.petrova@example.com",
      role: "Менеджер",
      status: "active",
    },
    {
      id: 2,
      name: "Сергей Иванов",
      email: "sergey.ivanov@example.com",
      role: "Аналитик",
      status: "active",
    },
    {
      id: 3,
      name: "Мария Сидорова",
      email: "maria.sidorova@example.com",
      role: "Специалист",
      status: "disabled",
    },
    {
      id: 4,
      name: "Дмитрий Козлов",
      email: "dmitry.kozlov@example.com",
      role: "Администратор",
      status: "active",
    },
  ]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleStatusToggle = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "disabled" : "active" }
          : user
      )
    );
  };

  const handleDeleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };


  const handleViewProfile = (userId: number) => {
    console.log(`Просмотр профиля пользователя ${userId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Пользователи</h2>
            <p className="text-sm text-muted-foreground">{users.length} участников</p>
          </div>
        </div>

        <Button
          as={Link}
          to="/profile/users/invitations"
          color="primary"
          variant="light"
          startContent={<UserPlus className="h-4 w-4" />}
        >
          Пригласить
        </Button>
      </div>

      {/* Users Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card
            key={user.id}
            isPressable
            onPress={() => handleViewProfile(user.id)}
            className={`transition-all ${
              user.status === "disabled" ? "opacity-60" : ""
            }`}
          >
            <CardBody className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.avatar}
                    name={getInitials(user.name)}
                    size="md"
                    classNames={{
                      base: "bg-primary/10",
                      name: "text-primary font-semibold",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-foreground truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={(e) => e.continuePropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions">
                    <DropdownItem
                      key="profile"
                      startContent={<ChevronRight className="h-4 w-4" />}
                      onPress={() => handleViewProfile(user.id)}
                    >
                      Просмотреть профиль
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      startContent={<Trash2 className="h-4 w-4" />}
                      onPress={() => handleDeleteUser(user.id)}
                    >
                      Удалить
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Chip size="sm" variant="flat">
                  {user.role}
                </Chip>

                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs text-muted-foreground">
                    {user.status === "active" ? "Активен" : "Отключен"}
                  </span>
                  <Switch
                    size="sm"
                    isSelected={user.status === "active"}
                    onValueChange={() => handleStatusToggle(user.id)}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      
    </div>
  );
};

export default UsersList;
