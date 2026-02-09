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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
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

const roles = [
  { key: "manager", label: "Менеджер" },
  { key: "analyst", label: "Аналитик" },
  { key: "specialist", label: "Специалист" },
  { key: "admin", label: "Администратор" },
];

const UsersList = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState("");
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Анна Петрова", email: "anna.petrova@example.com", role: "Менеджер", status: "active" },
    { id: 2, name: "Сергей Иванов", email: "sergey.ivanov@example.com", role: "Аналитик", status: "active" },
    { id: 3, name: "Мария Сидорова", email: "maria.sidorova@example.com", role: "Специалист", status: "disabled" },
    { id: 4, name: "Дмитрий Козлов", email: "dmitry.kozlov@example.com", role: "Администратор", status: "active" },
  ]);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

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

  const handleShare = (method: string) => {
    if (!selectedRole) return;
    const link = "https://app.company.com/register?invite=abc123def456&role=" + selectedRole;
    if (method === "email") {
      window.open(`mailto:?subject=Приглашение&body=${encodeURIComponent(link)}`);
    } else if (method === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(link)}`);
    } else {
      navigator.clipboard.writeText(link);
    }
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

        <Button color="primary" startContent={<Plus className="h-4 w-4" />} onPress={onOpen}>
          Пригласить
        </Button>
      </div>

      {/* Users Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card
            key={user.id}
            isPressable
            className={`transition-all ${user.status === "disabled" ? "opacity-60" : ""}`}
          >
            <CardBody className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.avatar}
                    name={getInitials(user.name)}
                    size="md"
                    classNames={{ base: "bg-primary/10", name: "text-primary font-semibold" }}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-foreground truncate">{user.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>

                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly variant="light" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions">
                    <DropdownItem key="profile" startContent={<ChevronRight className="h-4 w-4" />}>
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
                <Chip size="sm" variant="flat">{user.role}</Chip>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
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

      {/* Invite Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Пригласить пользователя</ModalHeader>
              <ModalBody className="space-y-4">
                <Select
                  label="Должность"
                  placeholder="Выберите должность"
                  selectedKeys={selectedRole ? [selectedRole] : []}
                  onSelectionChange={(keys) => {
                    const val = Array.from(keys)[0] as string;
                    setSelectedRole(val || "");
                  }}
                >
                  {roles.map((role) => (
                    <SelectItem key={role.key}>{role.label}</SelectItem>
                  ))}
                </Select>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Способ отправки</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="flat"
                      className="flex-col h-auto py-3 gap-1"
                      isDisabled={!selectedRole}
                      onPress={() => { handleShare("email"); onClose(); }}
                    >
                      <Mail className="h-5 w-5" />
                      <span className="text-xs">Email</span>
                    </Button>
                    <Button
                      variant="flat"
                      className="flex-col h-auto py-3 gap-1"
                      isDisabled={!selectedRole}
                      onPress={() => { handleShare("whatsapp"); onClose(); }}
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-xs">WhatsApp</span>
                    </Button>
                    <Button
                      variant="flat"
                      className="flex-col h-auto py-3 gap-1"
                      isDisabled={!selectedRole}
                      onPress={() => { handleShare("link"); onClose(); }}
                    >
                      <Copy className="h-5 w-5" />
                      <span className="text-xs">Ссылка</span>
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>Закрыть</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UsersList;
