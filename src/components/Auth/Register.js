import { useState } from "react";
import { register } from "../../api/api";
// Register js
export default function Register() {
  const [form, setForm] = useState({ 
    fullName: "", 
    email: "", 
    password: "", 
    phone: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Full Name Validation
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    
    // Email Validation
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone Validation (Optional but format check)
    if (form.phone && !/^01[3-9]\d{8}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid Bangladeshi phone number (e.g., 017XXXXXXXX)";
    }
    
    // Password Validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Confirm Password Validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await register({ 
        FullName: form.fullName.trim(), 
        Email: form.email, 
        Password: form.password, 
        Phone: form.phone || null 
      });
      alert("Registration successful! Please login with your credentials.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setForm({
      fullName: "John Doe",
      email: "demo@bloodbank.com",
      password: "demo123",
      confirmPassword: "demo123",
      phone: "01712345678"
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center px-4 py-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            {/* <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">🩸</span>
            </div> */}
          </div>
          <h1 className="text-4xl font-bold text-red-900 mb-2 mt-7">
            Join <span className="text-red-600">BloodBank</span>
          </h1>
          <p className="text-gray-600">
            Create your donor account and start saving lives
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
          <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={submit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={loading}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  +880
                </div>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="17XXXXXXXX"
                  className={`w-full pl-20 p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.phone ? (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.phone}
                </p>
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  We'll use this to contact you for donation requests
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? '🙈 Hide' : '👁️ Show'}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a strong password"
                className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.password}
                </p>
              )}
              <div className="mt-2">
                <div className="flex items-center gap-1">
                  <div className={`w-1/4 h-1 rounded-full ${form.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-1/4 h-1 rounded-full ${form.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-1/4 h-1 rounded-full ${/[A-Z]/.test(form.password) && /[0-9]/.test(form.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-1/4 h-1 rounded-full ${form.password.length >= 12 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Minimum 6 characters. Longer passwords with numbers and uppercase letters are stronger.
                </p>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-medium">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  disabled={loading}
                >
                  {showConfirmPassword ? '🙈 Hide' : '👁️ Show'}
                </button>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Re-enter your password"
                className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500 mt-1"
                disabled={loading}
                required
              />
              <label htmlFor="terms" className="ml-2 text-gray-700 text-sm">
                I agree to the <a href="/terms" className="text-red-600 hover:text-red-800">Terms of Service</a> and <a href="/privacy" className="text-red-600 hover:text-red-800">Privacy Policy</a>. I understand that by registering as a donor, my contact information may be shared with those in need of blood.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </span>
              ) : (
                "🚀 Create Account"
              )}
            </button>

            {/* Demo Fill Button */}
            {/* <button
              type="button"
              onClick={handleDemoFill}
              disabled={loading}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-medium border border-gray-300 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
            >
              👤 Fill Demo Details
            </button> */}
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-red-600 font-semibold hover:text-red-800 transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Benefits of Registering */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
            <span>🎁</span> Benefits of Registering
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Save lives by being available for blood donation</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Get notified when someone needs your blood type</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Track your donation history</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Join a community of lifesavers</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        {/* <div className="mt-8 flex justify-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-red-600 transition-colors">
            🏠 Home
          </a>
          <a href="/about" className="text-gray-600 hover:text-red-600 transition-colors">
            ℹ️ About BloodBank
          </a>
          <a href="/search" className="text-gray-600 hover:text-red-600 transition-colors">
            🔍 Find Donors
          </a>
        </div> */}

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🔒 Your information is protected with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}