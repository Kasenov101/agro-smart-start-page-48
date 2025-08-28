import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Input, Textarea } from "@nextui-org/react";
import { 
  Plus, 
  Minus, 
  Edit, 
  Building2, 
  DollarSign,
  Calendar,
  Activity
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Organization {
  id: string;
  name: string;
  bin: string;
  balance: number;
  status: 'active' | 'disabled';
  createdAt: string;
  updatedAt: string;
}

interface BalanceOperation {
  type: 'add' | 'subtract';
  amount: number;
  description: string;
}

const ECoin = () => {
  const [organizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'ТОО "Технологии Будущего"',
      bin: '123456789012',
      balance: 15750.50,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-08-20'
    },
    {
      id: '2', 
      name: 'ИП "Инновации КZ"',
      bin: '987654321098',
      balance: 8420.00,
      status: 'active',
      createdAt: '2024-02-10',
      updatedAt: '2024-08-22'
    },
    {
      id: '3',
      name: 'АО "Цифровые Решения"',
      bin: '456789123456',
      balance: 2100.75,
      status: 'disabled',
      createdAt: '2024-03-05',
      updatedAt: '2024-07-15'
    }
  ]);

  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [operation, setOperation] = useState<BalanceOperation>({
    type: 'add',
    amount: 0,
    description: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBalanceOperation = () => {
    if (!selectedOrg || !operation.amount || !operation.description) return;

    console.log('Операция с балансом:', {
      organizationId: selectedOrg.id,
      type: operation.type,
      amount: operation.amount,
      description: operation.description
    });

    setIsDialogOpen(false);
    setOperation({ type: 'add', amount: 0, description: '' });
    setSelectedOrg(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Активна</Badge>;
      case 'disabled':
        return <Badge className="bg-red-100 text-red-800">Отключена</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Неизвестно</Badge>;
    }
  };

  const openBalanceDialog = (org: Organization, type: 'add' | 'subtract') => {
    setSelectedOrg(org);
    setOperation({ ...operation, type });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <DollarSign className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">eCoin</h1>
            <p className="text-gray-600">Управление бонусными балансами организаций</p>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Всего организаций</p>
                <p className="text-xl font-bold">{organizations.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Активных</p>
                <p className="text-xl font-bold">
                  {organizations.filter(org => org.status === 'active').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Общий баланс</p>
                <p className="text-xl font-bold">
                  ${organizations.reduce((sum, org) => sum + org.balance, 0).toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Средний баланс</p>
                <p className="text-xl font-bold">
                  ${(organizations.reduce((sum, org) => sum + org.balance, 0) / organizations.length).toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Таблица организаций */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Список организаций</h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Компания</TableHead>
                  <TableHead>БИН</TableHead>
                  <TableHead>Баланс</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Создана</TableHead>
                  <TableHead>Обновлена</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-medium">{org.name}</TableCell>
                    <TableCell className="font-mono text-sm">{org.bin}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-amber-600" />
                        <span className="font-medium">
                          {org.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(org.status)}</TableCell>
                    <TableCell>{new Date(org.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                    <TableCell>{new Date(org.updatedAt).toLocaleDateString('ru-RU')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          color="success"
                          variant="flat"
                          onPress={() => openBalanceDialog(org, 'add')}
                          startContent={<Plus className="h-4 w-4" />}
                        >
                          Добавить
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="flat"
                          onPress={() => openBalanceDialog(org, 'subtract')}
                          startContent={<Minus className="h-4 w-4" />}
                        >
                          Списать
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Диалог операций с балансом */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {operation.type === 'add' ? (
                <Plus className="h-5 w-5 text-green-600" />
              ) : (
                <Minus className="h-5 w-5 text-red-600" />
              )}
              {operation.type === 'add' ? 'Добавить бонусы' : 'Списать бонусы'}
            </DialogTitle>
          </DialogHeader>

          {selectedOrg && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Организация</p>
                <p className="font-medium">{selectedOrg.name}</p>
                <p className="text-sm text-gray-500">БИН: {selectedOrg.bin}</p>
                <p className="text-sm">
                  Текущий баланс: <span className="font-medium">${selectedOrg.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}</span>
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  type="number"
                  label="Сумма"
                  placeholder="0.00"
                  value={operation.amount.toString()}
                  onChange={(e) => setOperation({ ...operation, amount: parseFloat(e.target.value) || 0 })}
                  startContent={<DollarSign className="h-4 w-4 text-gray-400" />}
                />

                <Textarea
                  label="Описание операции"
                  placeholder="Укажите причину начисления/списания бонусов"
                  value={operation.description}
                  onChange={(e) => setOperation({ ...operation, description: e.target.value })}
                  minRows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="light"
                  onPress={() => setIsDialogOpen(false)}
                >
                  Отмена
                </Button>
                <Button
                  color={operation.type === 'add' ? 'success' : 'danger'}
                  onPress={handleBalanceOperation}
                  isDisabled={!operation.amount || !operation.description}
                >
                  {operation.type === 'add' ? 'Добавить' : 'Списать'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ECoin;