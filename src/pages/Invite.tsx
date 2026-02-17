import { Card, CardBody, Button } from "@nextui-org/react";
import { SearchX, ArrowLeft } from "lucide-react";

const Invite = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-sm w-full shadow-lg">
        <CardBody className="text-center p-10">
          <div className="flex justify-center mb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <SearchX className="h-7 w-7 text-muted-foreground" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-2">
            Приглашение не найдено
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Ссылка недействительна или срок действия приглашения истёк.
          </p>

          <Button
            as="a"
            href="/"
            variant="bordered"
            className="w-full"
            startContent={<ArrowLeft className="h-4 w-4" />}
          >
            На главную
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Invite;
