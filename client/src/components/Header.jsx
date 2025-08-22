import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
     <Link to={'/'}>
     
       <div>
         <div className="flex items-center space-x-2">
          <img
            src="https://cdn.prod.website-files.com/65dec7222c3d359a25065704/65f8441ec20c53e65441ac60_wexa.svg"
            className="h-8"
          />
          <span className="text-2xl font-bold ">AI</span>
        </div>{" "}

        <div className="ml-2 flex items-center gap-2 ">

            <p>H</p>
            <p>e</p>
            <p>l</p>
            <p>p</p>
            <p>d</p>
            <p>e</p>
            <p>s</p>
            <p>k</p>
        </div>
       </div>
     </Link>
         
       
        <nav className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1">
            <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              Support Home
            </span>
          </div>
          <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Articles
          </span>
          <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            FAQ's
          </span>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to={"/login"}>
            <button className="px-6 py-2 border border-purple-600  rounded-lg text-white font-medium transition-all transform hover:scale-105">
              Signin
            </button>
          </Link>
          <Link to={'/register'}>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-medium hover:bg-black  border transition-all transform hover:scale-105 hidden sm:block">
            SignUp
          </button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
