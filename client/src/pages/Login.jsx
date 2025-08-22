import React, { useState, useContext } from "react";
import axios from "axios";
import { Headphones, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { helpDeskContext } from "../context/HelpDeskContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(helpDeskContext);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleLogin = async () => {
  setApiError("");
  if (!validateForm()) return;
  setLoading(true);
  try {
    const response = await axios.post("http://localhost:2000/api/auth/login", {
      email,
      password
    });

    if (response.status === 200 && response.data?.token && response.data?.user) {
      login(response.data.user, response.data.token);

      // Route based on role
      const role = response.data.user.role; // make sure backend returns this
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "agent") {
        navigate("/agent-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } else {
      setApiError(response.data?.message || "Login failed");
    }
  } catch (err) {
    setApiError(err.response?.data?.message || "Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <Header />
      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-[-50px]">
        <div className="max-w-6xl w-full">
          <div className="rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left side - Login Form */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  Login to the support portal
                </h2>
                <p className="text-gray-400 mb-8">Enter the details below</p>
                {apiError && (
                  <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                    {apiError}
                  </div>
                )}

                <form onSubmit={e => { e.preventDefault(); handleLogin(); }} className="space-y-6 mb-8">
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      placeholder="Your e-mail address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3 py-3 border rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:border-transparent ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      disabled={loading}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-3 py-3 pr-10 border rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:border-transparent ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                    <Link to={"/register"}>
                      <button
                        type="button"
                        className="text-sm text-orange-600 hover:text-orange-500 bg-transparent border-none cursor-pointer"
                        disabled={loading}
                      >
                        Don't have an account? SignUp
                      </button>
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-md text-white hover:from-purple-600 hover:to-purple-700 focus:outline-none font-medium"
                    >
                      {loading ? "Logging in..." : "LOGIN"}
                    </button>
                  </div>
                </form>

                {/* Agent Login */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center text-white">
                    <Headphones className="w-5 h-5 mr-2 border rounded-full p-1" />
                    <span className="mr-2">Are you an agent?</span>
                    <Link to={"/agent-login"}>
                      <button className="text-green-600 hover:text-green-500 font-medium bg-transparent border-none cursor-pointer" disabled={loading}>
                        Login here
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-gray-200"></div>

              {/* Right side - Sign Up */}
              <div className="flex-1">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Sign up
                  </h3>
                  <p className="text-gray-500 mb-6 leading-relaxed">
                    Once you sign up, you will have complete access to our self
                    service portal and you can use your account to raise support
                    tickets and track their status.
                  </p>
                  <Link to={"/register"}>
                    <button className="w-full py-3 px-4 border border-purple-600 rounded-md text-gray-500 font-medium hover:bg-gradient-to-r from-purple-500 to-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={loading}>
                      SIGN UP WITH US
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
