import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import BecomeProvider from "../pages/BecomeProvider";
import Community from "../pages/Community";
import Services from "../pages/Services";
import Bookings from "../pages/Bookings";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

// ================= PROVIDER =================

import ProviderDashboard from "../pages/Provider/ProviderDashboard";
import MyServices from "../pages/Provider/MyServices";
import AddService from "../pages/Provider/AddService";
import EditService from "../pages/Provider/EditService";
import ProviderBookings from "../pages/Provider/ProviderBookings";
import ProviderMessages from "../pages/Provider/ProviderMessages";
import Reviews from "../pages/Provider/Reviews";
import Availability from "../pages/Provider/Availability";
import Earnings from "../pages/Provider/Earnings";
import Portfolio from "../pages/Provider/Portfolio";
import ProviderProfile from "../pages/Provider/ProviderProfile";
import ProviderSettings from "../pages/Provider/ProviderSettings";

 

// Admin
import AdminLogin from "../pages/admin/AdminLogin";
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
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
         

        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/become-provider" element={<BecomeProvider />} />

        {/* ADMIN  */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/bookings" element={<BookingsManagement />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/community" element={<CommunityManagement />} />
        <Route path="/admin/disputes" element={<DisputesManagement />} />
        <Route path="/admin/provider-requests" element={<ProviderRequests />} />
        <Route path="/admin/providers" element={<ProvidersManagement />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/*Provider*/}
        <Route
        path="/provider-dashboard"
        element={<ProviderDashboard />}
        />

        <Route
        path="/provider/services"
        element={<MyServices />}
        />

        <Route
        path="/provider/add-service"
        element={<AddService />}
        />

        <Route
        path="/provider/edit-service/:id"
        element={<EditService />}
        />

        <Route
        path="/provider/bookings"
        element={<ProviderBookings />}
        />

        <Route
        path="/provider/messages"
        element={<ProviderMessages />}
        />

        <Route
        path="/provider/reviews"
        element={<Reviews />}
        />

        <Route
        path="/provider/availability"
        element={<Availability />}
        />

        <Route
        path="/provider/earnings"
        element={<Earnings />}
        />

        <Route
        path="/provider/portfolio"
        element={<Portfolio />}
        />

        <Route
        path="/provider/profile"
        element={<ProviderProfile />}
        />

        <Route
        path="/provider/settings"
        element={<ProviderSettings />}
        />
        {/* Always keep this at the end */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
