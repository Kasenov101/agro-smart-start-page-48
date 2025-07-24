import { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Divider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Building, User, Calendar, Mail, Phone, MapPin, Globe, LogOut, Check, X, Eye, Users, Award, FileText } from "lucide-react";
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

const PlanRequests = () => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="light" className="text-gray-600">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Language Selection">
                  <DropdownItem key="ru">🇷🇺 Русский</DropdownItem>
                  <DropdownItem key="en">🇺🇸 English</DropdownItem>
                  <DropdownItem key="kz">🇰🇿 Қазақша</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {/* User Dropdown */}
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="light" className="text-gray-600">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Menu">
                  <DropdownItem key="profile">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Личный кабинет
                    </div>
                  </DropdownItem>
                  <DropdownItem key="logout" className="text-danger" color="danger">
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Выход
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Запросы на подключение планов
              </h2>
              <Chip color="primary" variant="flat">
                {requests.filter(r => r.status === 'pending').length} новых
              </Chip>
            </div>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Организация</TableHead>
                  <TableHead>План</TableHead>
                  <TableHead>Дата запроса</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-400 mr-2" />
                        {request.organizationName}
                      </div>
                    </TableCell>
                    <TableCell>{request.planType}</TableCell>
                    <TableCell>{new Date(request.requestDate).toLocaleDateString('ru-RU')}</TableCell>
                    <TableCell>
                      <Chip 
                        color={getStatusColor(request.status)}
                        variant="flat"
                        size="sm"
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
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              isIconOnly
                              size="sm"
                              color="danger"
                              variant="flat"
                              onPress={() => handleReject(request.id)}
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
      </div>

      {/* Organization Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">Информация об организации</h3>
          </ModalHeader>
          <ModalBody>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Building className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">Название:</span>
                      <span className="ml-2">{selectedRequest.organizationInfo.name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">Идентификатор:</span>
                      <span className="ml-2">{selectedRequest.organizationInfo.identifier}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">Адрес:</span>
                      <span className="ml-2">{selectedRequest.organizationInfo.address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">Телефон:</span>
                      <span className="ml-2">{selectedRequest.organizationInfo.phone}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">Email:</span>
                      <span className="ml-2">{selectedRequest.organizationInfo.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">Сотрудники:</span>
                      <span className="ml-2">{selectedRequest.organizationInfo.employees}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">Год основания:</span>
                      <span className="ml-2">{selectedRequest.organizationInfo.foundingYear}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">Контактное лицо:</span>
                      <span className="ml-2">{selectedRequest.organizationInfo.contactPerson}</span>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Описание деятельности:</h4>
                  <p className="text-sm text-gray-600">{selectedRequest.organizationInfo.description}</p>
                </div>
                
                <Divider />
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Запрашиваемый план:</h4>
                  <Chip color="primary" variant="flat">{selectedRequest.planType}</Chip>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Закрыть
            </Button>
            {selectedRequest?.status === 'pending' && (
              <div className="space-x-2">
                <Button 
                  color="success" 
                  onPress={() => {
                    handleApprove(selectedRequest.id);
                    onClose();
                  }}
                >
                  Одобрить
                </Button>
                <Button 
                  color="danger" 
                  onPress={() => {
                    handleReject(selectedRequest.id);
                    onClose();
                  }}
                >
                  Отклонить
                </Button>
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PlanRequests;