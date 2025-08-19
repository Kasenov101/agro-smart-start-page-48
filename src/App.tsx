
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterStep2 from "./pages/RegisterStep2";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PersonalInfo from "./pages/profile/PersonalInfo";
import OrganizationInfo from "./pages/profile/OrganizationInfo";
import Security from "./pages/profile/Security";
import Activity from "./pages/profile/Activity";
import UsersList from "./pages/profile/Users";
import Subscriptions from "./pages/profile/Subscriptions";
import Organizations from "./pages/profile/Organizations";
import Integrations from "./pages/profile/Integrations";
import AdminLayout from "./pages/admin/AdminLayout";
import PlanRequestsContent from "./pages/admin/PlanRequestsContent";
import MobileAdminLayout from "./pages/mobile/AdminLayout";
import ToastPage from "./pages/ToastPage";
import NotFound from "./pages/NotFound";

// Mobile pages
import MobileIndex from "./pages/mobile/Index";
import MobileLogin from "./pages/mobile/Login";
import MobileDashboard from "./pages/mobile/Dashboard";
import MobileRegister from "./pages/mobile/Register";
import MobileRegisterStep2 from "./pages/mobile/RegisterStep2";
import MobileProfile from "./pages/mobile/Profile";
import MobileToastPage from "./pages/mobile/ToastPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Routes>
      {/* Desktop routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/step2" element={<RegisterStep2 />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />}>
        <Route path="personal" element={<PersonalInfo />} />
        <Route path="organization" element={<OrganizationInfo />} />
        <Route path="security" element={<Security />} />
        <Route path="activity" element={<Activity />} />
        <Route path="users" element={<UsersList />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="integrations" element={<Integrations />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="plan-requests" element={<PlanRequestsContent />} />
      </Route>
      <Route path="/toast" element={<ToastPage />} />

      {/* Mobile routes */}
      <Route path="/mobile" element={<MobileIndex />} />
      <Route path="/mobile/login" element={<MobileLogin />} />
      <Route path="/mobile/register" element={<MobileRegister />} />
      <Route path="/mobile/register/step2" element={<MobileRegisterStep2 />} />
      <Route path="/mobile/dashboard" element={<MobileDashboard />} />
      <Route path="/mobile/profile" element={<MobileProfile />}>
        <Route path="personal" element={<PersonalInfo />} />
        <Route path="organization" element={<OrganizationInfo />} />
        <Route path="security" element={<Security />} />
        <Route path="activity" element={<Activity />} />
        <Route path="users" element={<UsersList />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="integrations" element={<Integrations />} />
      </Route>
      <Route path="/mobile/admin" element={<MobileAdminLayout />}>
        <Route path="plan-requests" element={<PlanRequestsContent />} />
      </Route>
      <Route path="/mobile/toast" element={<MobileToastPage />} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </QueryClientProvider>
);

export default App;
