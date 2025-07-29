import { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Divider } from "@nextui-org/react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Building, User, Calendar, Mail, Phone, MapPin, Check, X, Eye, Users, Award, FileText, Clock } from "lucide-react";
import { useCustomToast } from '@/hooks/use-custom-toast';

interface PlanRequest {
  id: string;
  organizationName: string;
  planType: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  organizationInfo: {
    name: string;
    identifier: string;
    address: string;
    phone: string;
    email: string;
    employees: number;
    foundingYear: number;
    contactPerson: string;
    description: string;
  };
}

const PlanRequestsContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState<PlanRequest | null>(null);
  const { success, danger } = useCustomToast();

  // Mock data for plan requests
  const [requests, setRequests] = useState<PlanRequest[]>([
    {
      id: '1',
      organizationName: 'ТОО "Зеленый мир"',
      planType: 'Профессиональный',
      requestDate: '2024-07-20',
      status: 'pending',
      organizationInfo: {
        name: 'ТОО "Зеленый мир"',
        identifier: 'БИН: 123456789012',
        address: 'г. Алматы, ул. Абая 150',
        phone: '+7 (727) 123-45-67',
        email: 'info@greenworld.kz',
        employees: 45,
        foundingYear: 2018,
        contactPerson: 'Иванов Иван Иванович',
        description: 'Компания занимается разработкой экологических решений для городской среды'
      }
    },
    {
      id: '2',
      organizationName: 'АО "ТехноСофт"',
      planType: 'Корпоративный',
      requestDate: '2024-07-19',
      status: 'pending',
      organizationInfo: {
        name: 'АО "ТехноСофт"',
        identifier: 'БИН: 987654321098',
        address: 'г. Нур-Султан, пр. Республики 25',
        phone: '+7 (7172) 987-65-43',
        email: 'contact@technosoft.kz',
        employees: 120,
        foundingYear: 2015,
        contactPerson: 'Петрова Анна Сергеевна',
        description: 'Разработка программного обеспечения и IT-консалтинг'
      }
    },
    {
      id: '3',
      organizationName: 'ИП "Смарт Решения"',
      planType: 'Базовый',
      requestDate: '2024-07-18',
      status: 'approved',
      organizationInfo: {
        name: 'ИП "Смарт Решения"',
        identifier: 'ИИН: 123456789012',
        address: 'г. Шымкент, ул. Байтурсынова 75',
        phone: '+7 (7252) 456-78-90',
        email: 'smart@solutions.kz',
        employees: 8,
        foundingYear: 2020,
        contactPerson: 'Сидоров Петр Владимирович',
        description: 'Автоматизация бизнес-процессов для малого бизнеса'
      }
    }
  ]);

  const handleViewDetails = (request: PlanRequest) => {
    setSelectedRequest(request);
    onOpen();
  };

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
    success('Запрос на план успешно одобрен');
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
    danger('Запрос на план отклонен');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'approved': return 'Одобрен';
      case 'rejected': return 'Отклонен';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Запросы на подключение планов
          </h2>
          <p className="text-gray-600 mt-1">
            Управление запросами организаций на подключение тарифных планов
          </p>
        </div>
        <Chip color="primary" variant="flat" size="lg">
          {requests.filter(r => r.status === 'pending').length} новых запросов
        </Chip>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Всего запросов</p>
                <p className="text-2xl font-bold text-blue-900">{requests.length}</p>
              </div>
              <div className="p-2 bg-blue-200 rounded-lg">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Ожидают</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {requests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <div className="p-2 bg-yellow-200 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-700" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Одобрено</p>
                <p className="text-2xl font-bold text-green-900">
                  {requests.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <div className="p-2 bg-green-200 rounded-lg">
                <Check className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold">Организация</TableHead>
                <TableHead className="font-semibold">План</TableHead>
                <TableHead className="font-semibold">Дата запроса</TableHead>
                <TableHead className="font-semibold">Статус</TableHead>
                <TableHead className="font-semibold">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Building className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{request.organizationName}</p>
                        <p className="text-sm text-gray-500">{request.organizationInfo.contactPerson}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color="primary" 
                      variant="flat" 
                      size="sm"
                      className="font-medium"
                    >
                      {request.planType}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {new Date(request.requestDate).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusColor(request.status)}
                      variant="flat"
                      size="sm"
                      className="font-medium"
                    >
                      {getStatusText(request.status)}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="primary"
                        onPress={() => handleViewDetails(request)}
                        className="hover:scale-105 transition-transform"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button
                            isIconOnly
                            size="sm"
                            color="success"
                            variant="flat"
                            onPress={() => handleApprove(request.id)}
                            className="hover:scale-105 transition-transform"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="flat"
                            onPress={() => handleReject(request.id)}
                            className="hover:scale-105 transition-transform"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Organization Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 border-b pb-3">
            <h3 className="text-xl font-bold text-gray-900">Информация об организации</h3>
            <p className="text-sm text-gray-600">Детальная информация о запросе</p>
          </ModalHeader>
          <ModalBody className="py-6">
            {selectedRequest && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Основная информация</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Название</p>
                          <p className="text-gray-900">{selectedRequest.organizationInfo.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Идентификатор</p>
                          <p className="text-gray-900">{selectedRequest.organizationInfo.identifier}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Адрес</p>
                          <p className="text-gray-900">{selectedRequest.organizationInfo.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Контактная информация</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Телефон</p>
                          <p className="text-gray-900">{selectedRequest.organizationInfo.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Email</p>
                          <p className="text-gray-900">{selectedRequest.organizationInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Контактное лицо</p>
                          <p className="text-gray-900">{selectedRequest.organizationInfo.contactPerson}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Количество сотрудников</p>
                      <p className="text-lg font-bold text-gray-900">{selectedRequest.organizationInfo.employees}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Год основания</p>
                      <p className="text-lg font-bold text-gray-900">{selectedRequest.organizationInfo.foundingYear}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">Описание деятельности</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedRequest.organizationInfo.description}</p>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Запрашиваемый план</h4>
                  <Chip color="primary" variant="solid" size="lg" className="font-semibold">
                    {selectedRequest.planType}
                  </Chip>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter className="border-t pt-4">
            <Button color="default" variant="flat" onPress={onClose}>
              Закрыть
            </Button>
            {selectedRequest?.status === 'pending' && (
              <div className="flex space-x-2">
                <Button 
                  color="danger" 
                  variant="flat"
                  onPress={() => {
                    handleReject(selectedRequest.id);
                    onClose();
                  }}
                >
                  Отклонить
                </Button>
                <Button 
                  color="success" 
                  onPress={() => {
                    handleApprove(selectedRequest.id);
                    onClose();
                  }}
                >
                  Одобрить
                </Button>
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PlanRequestsContent;