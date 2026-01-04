import { useState } from "react";
import { login } from "../../api/api";
import { saveToken } from "../../utils/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await login({ Email: email, Password: password });
      saveToken(res.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // const handleDemoLogin = () => {
  //   setEmail("demo@bloodbank.com");
  //   setPassword("demo123");
  // };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center px-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">❤️</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-red-900 mb-2">
            Welcome to <span className="text-red-600">BloodBank</span>
          </h1>
          <p className="text-gray-600">Sign in to your donor account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
          <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">
            Sign In to Your Account
          </h2>

          <form onSubmit={submit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                placeholder="Enter your email"
                className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
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
                  {showPassword ? "🙈 Hide" : "👁️ Show"}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  placeholder="Enter your password"
                  className={`w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  disabled={loading}
                />
                <label htmlFor="remember" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forget-password"
                className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
              >
                Forgot password?
              </Link>
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
                  Signing In...
                </span>
              ) : (
                "🔐 Sign In"
              )}
            </button>

            {/* Demo Account Button */}
            {/* <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-medium border border-gray-300 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
            >
              👤 Use Demo Account
            </button> */}
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-red-600 font-semibold hover:text-red-800 transition-colors"
              >
                Create one now
              </a>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🔒 Your data is protected with 256-bit SSL encryption
          </p>
        </div>

        {/* Quick Links */}
        {/* <div className="mt-8 flex justify-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-red-600 transition-colors">
            🏠 Home
          </a>
          <a href="/about" className="text-gray-600 hover:text-red-600 transition-colors">
            ℹ️ About Us
          </a>
          <a href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">
            📞 Contact
          </a>
        </div> */}
      </div>
    </div>
  );
}
