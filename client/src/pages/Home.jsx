import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const WexaLandingPage = () => {
  return (
    <div className="  ">
      {/* Animated Grid Background */}
      
     

      {/* Header */}
        <Header />

      {/* Main Content */}
      <div className="grid grid-cols-2">
        <div>
          <main className="relative z-10 flex flex-col items-start  justify-center min-h-[80vh] px-6 lg:px-12">
            <div className="text-start max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight mb-8">
                “Smart Helpdesk with <br />
                AI Suggestions”
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Raise support tickets, get instant AI suggestions, and resolve
                faster
              </p>
              <div className="flex justify-center">
               <Link to={'/login'}>
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold text-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/25">
                  Get Started
                </button>
               </Link>
              </div>
            </div>
          </main>
        </div>

        <div >
          <img
            src="https://cdn.prod.website-files.com/65dec7222c3d359a25065704/678df5b6658e7ee476550333_report%20of%20lucas.jpg"
            className="mt-20 rounded-2xl w-[700px] "
          />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 border-2 border-yellow-400 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/6 w-3 h-3 bg-green-400 rotate-45 animate-spin opacity-30"></div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
    </div>
  );
};

export default WexaLandingPage;
