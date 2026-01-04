import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AdminRoute from "./components/Auth/AdminRoute";
import DonorProfile from "./components/Donor/DonorProfile";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./components/Layout/ContactUs";
import SafetyGuidelinesPage from "./pages/SafetyGuidelinesPage";

import DonorDashboard from "./components/Donor/DonorDashboard";
import DonorSearch from "./components/Donor/DonorSearch";
import DonationForm from "./components/Donor/DonationForm";
import DonationHistory from "./components/Donor/DonationHistory";
import BloodRequest from "./pages/donor/BloodRequest";
import BloodRequestHistory from "./pages/donor/BloodRequestHistory";

import Dashboard from "./components/Layout/Dashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminContacts from "./components/Admin/AdminContacts";
import AdminBloodRequests from "./components/Admin/AdminBloodRequests";
import AdminDonations from "./components/Admin/AdminDonationHistory";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* ===== Public ===== */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
           <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/safety-guidelines" element={<SafetyGuidelinesPage />} />

          {/* ===== Donor ===== */}
          <Route
            path="/donor/dashboard"
            element={
              <ProtectedRoute>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DonorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <DonorSearch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donation-form"
            element={
              <ProtectedRoute>
                <DonationForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donation-history"
            element={
              <ProtectedRoute>
                <DonationHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blood-request"
            element={
              <ProtectedRoute>
                <BloodRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-blood-requests"
            element={
              <ProtectedRoute>
                <BloodRequestHistory />
              </ProtectedRoute>
            }
          />

          {/* ===== Admin ===== */}
          <Route
            path="/admin/donation"
            element={
              <AdminRoute>
                <AdminDonations />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/contacts"
            element={
              <AdminRoute>
                <AdminContacts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/blood-requests"
            element={
              <AdminRoute>
                <AdminBloodRequests />
              </AdminRoute>
            }
          />

          {/* ===== Fallback ===== */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
