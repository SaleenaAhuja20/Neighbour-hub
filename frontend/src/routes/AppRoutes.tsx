import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import BecomeProvider from "../pages/BecomeProvider";
import Services from "../pages/Services";
import Bookings from "../pages/Bookings";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import Analytics from "../pages/admin/Analytics";
import BookingsManagement from "../pages/admin/BookingsManagement";
import UsersManagement from "../pages/admin/UsersManagement";
import CommunityManagement from "../pages/admin/CommunityManagement";
import DisputesManagement from "../pages/admin/DisputesManagement";
import ProviderRequests from "../pages/admin/ProviderRequests";
import ProvidersManagement from "../pages/admin/ProvidersManagement";
import Settings from "../pages/admin/settings";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/become-provider" element={<BecomeProvider />} />

        {/* ADMIN  */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/bookings" element={<BookingsManagement />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/community" element={<CommunityManagement />} />
        <Route path="/admin/disputes" element={<DisputesManagement />} />
        <Route path="/admin/provider-requests" element={<ProviderRequests />} />
        <Route path="/admin/providers" element={<ProvidersManagement />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* Always keep this at the end */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
