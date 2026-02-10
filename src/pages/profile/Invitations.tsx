import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Input,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Send,
  UserPlus,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Invitation {
  id: number;
  contact: string;
  type: "email" | "phone";
  invitedBy: string;
  status: "accepted" | "cancelled" | "pending";
  date: string;
}

const statusConfig = {
  accepted: {
    label: "Принято",
    color: "success" as const,
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Отменено",
    color: "danger" as const,
    icon: XCircle,
  },
  pending: {
    label: "В ожидании",
    color: "warning" as const,
    icon: Clock,
  },
};

const Invitations = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: 1,
      contact: "ivan.petrov@example.com",
      type: "email",
      invitedBy: "Анна Петрова",
      status: "accepted",
      date: "2025-01-15",
    },
    {
      id: 2,
      contact: "+7 (900) 123-45-67",
      type: "phone",
      invitedBy: "Сергей Иванов",
      status: "pending",
      date: "2025-02-01",
    },
    {
      id: 3,
      contact: "olga.smirnova@example.com",
      type: "email",
      invitedBy: "Дмитрий Козлов",
      status: "cancelled",
      date: "2025-01-20",
    },
    {
      id: 4,
      contact: "+7 (912) 987-65-43",
      type: "phone",
      invitedBy: "Анна Петрова",
      status: "pending",
      date: "2025-02-05",
    },
  ]);

  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [contactValue, setContactValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendInvitation = () => {
    if (!contactValue.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      const newInvitation: Invitation = {
        id: Date.now(),
        contact: contactValue.trim(),
        type: contactType,
        invitedBy: "Вы",
        status: "pending",
        date: new Date().toISOString().split("T")[0],
      };
      setInvitations((prev) => [newInvitation, ...prev]);
      setContactValue("");
      setIsSending(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Приглашения
            </h2>
            <p className="text-sm text-muted-foreground">
              {invitations.length} приглашений
            </p>
          </div>
        </div>

        <Button
          as={Link}
          to="/profile/users"
          variant="light"
          startContent={<ArrowLeft className="h-4 w-4" />}
        >
          Назад
        </Button>
      </div>

      {/* Invite Form */}
      <Card>
        <CardBody className="p-4">
          <p className="text-sm font-medium text-foreground mb-3">
            Новое приглашение
          </p>
          <div className="flex flex-col gap-3">
            <RadioGroup
              orientation="horizontal"
              value={contactType}
              onValueChange={(val) => setContactType(val as "email" | "phone")}
              size="sm"
            >
              <Radio value="email">Email</Radio>
              <Radio value="phone">Телефон</Radio>
            </RadioGroup>

            <div className="flex gap-2">
              <Input
                size="sm"
                variant="bordered"
                placeholder={
                  contactType === "email"
                    ? "example@mail.com"
                    : "+7 (900) 000-00-00"
                }
                value={contactValue}
                onValueChange={setContactValue}
                startContent={
                  contactType === "email" ? (
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendInvitation();
                }}
                className="flex-1"
              />
              <Button
                color="primary"
                size="sm"
                isLoading={isSending}
                isDisabled={!contactValue.trim()}
                onPress={handleSendInvitation}
                startContent={!isSending && <Send className="h-4 w-4" />}
              >
                Отправить
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Invitations Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {invitations.map((inv) => {
          const status = statusConfig[inv.status];
          const StatusIcon = status.icon;
          return (
            <Card key={inv.id} className="border border-divider shadow-sm">
              <CardBody className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    {inv.type === "email" ? (
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className="text-sm font-medium text-foreground truncate">
                      {inv.contact}
                    </span>
                  </div>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={status.color}
                    startContent={<StatusIcon className="h-3 w-3" />}
                    className={
                      inv.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : inv.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {status.label}
                  </Chip>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Пригласил: {inv.invitedBy}</span>
                  <span>{inv.date}</span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Invitations;
