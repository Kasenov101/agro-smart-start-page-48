import { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import { 
  Users, 
  Plus, 
  MoreVertical, 
  Share2, 
  Mail, 
  MessageSquare,
  Trash2,
  UserCheck,
  UserX
} from "lucide-react";

const UsersList = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [shareMethod, setShareMethod] = useState('');

  const users = [
    {
      id: 1,
      name: "Анна Петрова",
      email: "anna.petrova@example.com",
      role: "Менеджер",
      status: "active",
      lastLogin: "2 часа назад"
    },
    {
      id: 2,
      name: "Сергей Иванов",
      email: "sergey.ivanov@example.com",
      role: "Аналитик",
      status: "active",
      lastLogin: "1 день назад"
    },
    {
      id: 3,
      name: "Мария Сидорова",
      email: "maria.sidorova@example.com",
      role: "Специалист",
      status: "disabled",
      lastLogin: "1 неделя назад"
    }
  ];

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { color: "success", text: "Активен" },
      disabled: { color: "danger", text: "Отключен" }
    };
    return statusConfig[status] || { color: "default", text: "Неизвестно" };
  };

  const handleStatusChange = (userId, newStatus) => {
    console.log(`Изменить статус пользователя ${userId} на ${newStatus}`);
  };

  const handleDeleteUser = (userId) => {
    console.log(`Удалить пользователя ${userId}`);
  };

  const handleGenerateLink = (method) => {
    setShareMethod(method);
    onOpen();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Управление пользователями
              </h3>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  color="primary" 
                  startContent={<Plus className="h-4 w-4" />}
                >
                  Пригласить пользователя
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Способы приглашения">
                <DropdownItem 
                  key="email"
                  startContent={<Mail className="h-4 w-4" />}
                  onPress={() => handleGenerateLink('email')}
                >
                  Отправить по Email
                </DropdownItem>
                <DropdownItem 
                  key="whatsapp"
                  startContent={<MessageSquare className="h-4 w-4" />}
                  onPress={() => handleGenerateLink('whatsapp')}
                >
                  Отправить в WhatsApp
                </DropdownItem>
                <DropdownItem 
                  key="link"
                  startContent={<Share2 className="h-4 w-4" />}
                  onPress={() => handleGenerateLink('link')}
                >
                  Скопировать ссылку
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody>
          <Table aria-label="Таблица пользователей">
            <TableHeader>
              <TableColumn>ИМЯ</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>РОЛЬ</TableColumn>
              <TableColumn>СТАТУС</TableColumn>
              <TableColumn>ПОСЛЕДНИЙ ВХОД</TableColumn>
              <TableColumn>ДЕЙСТВИЯ</TableColumn>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusChip(user.status).color} 
                      variant="flat"
                      size="sm"
                    >
                      {getStatusChip(user.status).text}
                    </Chip>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Действия пользователя">
                        <DropdownItem 
                          key="activate"
                          startContent={<UserCheck className="h-4 w-4" />}
                          onPress={() => handleStatusChange(user.id, 'active')}
                        >
                          Активировать
                        </DropdownItem>
                        <DropdownItem 
                          key="disable"
                          startContent={<UserX className="h-4 w-4" />}
                          onPress={() => handleStatusChange(user.id, 'disabled')}
                        >
                          Отключить
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ссылка для регистрации
              </ModalHeader>
              <ModalBody>
                <p>Ссылка для регистрации сгенерирована:</p>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <code className="text-sm">
                    https://app.company.com/register?invite=abc123def456
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  {shareMethod === 'email' && 'Ссылка будет отправлена по электронной почте.'}
                  {shareMethod === 'whatsapp' && 'Ссылка будет отправлена в WhatsApp.'}
                  {shareMethod === 'link' && 'Скопируйте ссылку и отправьте пользователю.'}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Отмена
                </Button>
                <Button color="primary" onPress={onClose}>
                  {shareMethod === 'link' ? 'Скопировать' : 'Отправить'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UsersList;