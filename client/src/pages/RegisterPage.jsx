import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";
import axios from "axios";
import { helpDeskContext } from "../context/HelpDeskContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const { login } = useContext(helpDeskContext)
  const navigate = useNavigate();


  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://helpdesk-1-7475.onrender.com/api/auth/register",
        { name, email, password, role }
      );

      if (response.status === 201) {
        const { user, token } = response.data;
        login(user, token); 
        navigate("/user-dashboard");
      } else {
        setApiError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-[-50px]">
        <div className="max-w-6xl w-full">
          <div className="rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
             
              <div className="flex justify-center items-center flex-1 hidden sm:block">
                <img
                  src="https://www.skytizens.com/wp-content/uploads/2023/10/5124558-300x226.png"
                  alt="Support Portal"
                  className="w-[350px] object-contain"
                />
              </div>

           
              <div className="hidden lg:block w-px bg-gray-300"></div>

             
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  Create an Account
                </h2>
                <p className="text-gray-400 mb-8">
                  Fill in your details to register for the support portal.
                </p>

                {apiError && (
                  <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                    {apiError}
                  </div>
                )}

                <div className="space-y-6 mb-8">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3 py-3 border rounded-md text-white focus:outline-none ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      disabled={loading}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3 py-3 border rounded-md text-white focus:outline-none ${
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

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-3 py-3 pr-10 border rounded-md text-white focus:outline-none ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-purple-500"
                      }`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                

                  <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                    <button
                      onClick={() => navigate("/login")}
                      className="text-sm text-orange-600 hover:text-orange-500"
                      disabled={loading}
                    >
                      Already have an account? Login
                    </button>
                    <button
                      onClick={handleRegister}
                      disabled={loading}
                      className={`w-full sm:w-auto px-8 py-2 text-sm rounded-md text-white ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      }`}
                    >
                      {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
