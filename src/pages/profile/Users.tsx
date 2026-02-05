import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Plus,
  MoreHorizontal,
  Share2,
  Mail,
  MessageSquare,
  Trash2,
  ChevronRight,
  Copy,
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
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [shareMethod, setShareMethod] = useState("");
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

  const handleGenerateLink = (method: string) => {
    setShareMethod(method);
    setIsInviteOpen(true);
  };

  const handleViewProfile = (userId: number) => {
    console.log(`Просмотр профиля пользователя ${userId}`);
    // В будущем: navigate(`/profile/users/${userId}`)
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Пригласить
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleGenerateLink("email")}>
              <Mail className="mr-2 h-4 w-4" />
              Отправить по Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleGenerateLink("whatsapp")}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Отправить в WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleGenerateLink("link")}>
              <Share2 className="mr-2 h-4 w-4" />
              Скопировать ссылку
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Users Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card
            key={user.id}
            className={`group cursor-pointer transition-all hover:shadow-md ${
              user.status === "disabled" ? "opacity-60" : ""
            }`}
            onClick={() => handleViewProfile(user.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-foreground truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProfile(user.id);
                      }}
                    >
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Просмотреть профиль
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user.id);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge variant="secondary" className="font-normal">
                  {user.role}
                </Badge>

                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs text-muted-foreground">
                    {user.status === "active" ? "Активен" : "Отключен"}
                  </span>
                  <Switch
                    checked={user.status === "active"}
                    onCheckedChange={() => handleStatusToggle(user.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invite Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ссылка для регистрации</DialogTitle>
            <DialogDescription>
              {shareMethod === "email" &&
                "Ссылка будет отправлена по электронной почте."}
              {shareMethod === "whatsapp" &&
                "Ссылка будет отправлена в WhatsApp."}
              {shareMethod === "link" &&
                "Скопируйте ссылку и отправьте пользователю."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
            <code className="flex-1 text-sm break-all">
              https://app.company.com/register?invite=abc123def456
            </code>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setIsInviteOpen(false)}>
              {shareMethod === "link" ? "Скопировать" : "Отправить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersList;