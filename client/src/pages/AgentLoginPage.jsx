import React, { useState } from "react";
import Header from "../components/Header";

function AgentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Agent Login attempted with:", { email, password });
    // TODO: add your login logic (Firebase/Auth API/etc.)
  };

  return (
    <div>

        <Header />
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-[-60px]">
      <div className="max-w-6xl w-full">
        <div className="rounded-2xl p-8 shadow-2xl ">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12">
            
            {/* Left side - Image */}
            <div className="flex justify-center items-center flex-1 hidden sm:block">
              <img
                src="https://www.skytizens.com/wp-content/uploads/2023/10/5124558-300x226.png"
                alt="Agent Portal"
                className="w-[350px] object-contain"
              />
            </div>

            {/* Center divider */}
            <div className="hidden lg:block w-px bg-gray-300"></div>

            {/* Right side - Agent Login Form */}
            <div className="flex-1 flex flex-col justify-center ">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                Agent Login
              </h2>
              <p className="text-gray-600 mb-8">
                Please enter your email and password to access the support portal.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {}}
                    className="text-sm text-orange-600 hover:text-orange-500 bg-transparent border-none cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                  <button
                    onClick={handleLogin}
                    className="px-8 py-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-md text-white hover:from-purple-600 hover:to-purple-700 focus:outline-none font-medium"
                  >
                    Login
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

export default AgentLoginPage;
