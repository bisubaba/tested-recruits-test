import React, { useState } from "react";
import Home from "../assets/home.svg";
import Group from "../assets/group.svg";
import ChatBubble from "../assets/chat_bubble.svg";
import CreditCard from "../assets/credit_card.svg";
import CalendarToday from "../assets/calendar_today.svg";
import TestLogo from "../assets/TestLogo.svg";
import More from "../assets/more.svg";
import Settings from "../assets/settings.svg";
import Profile from "../assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { title: "Overview", icon: Home },
    { title: "Patients", icon: Group },
    { title: "Schedule", icon: CalendarToday },
    { title: "Message", icon: ChatBubble },
    { title: "Transactions", icon: CreditCard },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-sm rounded-[45px]">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#">
            <img src={TestLogo} alt="logo" className="h-8 sm:h-10" />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6">
          {routes.map((route, index) => {
            return (
              <a
                href="#"
                key={index}
                className={`flex items-center space-x-2 p-3 rounded-[25px] hover:opacity-80 transition-opacity ${
                  index == 1 ? "active" : ""
                }`}
              >
                <img
                  src={route.icon}
                  alt={`${route.title} icon`}
                  className="h-5 w-5"
                />
                <p className="body-emphasized-14pt whitespace-nowrap">
                  {route.title}
                </p>
              </a>
            );
          })}
        </div>

        {/* Desktop Profile Section */}
        <div className="hidden md:flex items-center space-x-3">
          <img
            src={Profile}
            alt="Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div className="hidden lg:block">
            <p className="body-emphasized-14pt">Dr. Jose Simmons</p>
            <p className="body-secondary-info-14pt">General Practitioner</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <img
                src={Settings}
                alt="Settings"
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              onClick={toggleMenu}
            >
              <img src={More} alt="More" className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          {/* Mobile Navigation Links */}
          <div className="px-4 py-3 space-y-3">
            {routes.map((route, index) => {
              return (
                <a
                  href="#"
                  key={index}
                  className="flex items-center space-x-3 py-2 px-2 hover:bg-gray-50 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    src={route.icon}
                    alt={`${route.title} icon`}
                    className="h-5 w-5"
                  />
                  <p className="body-emphasized-14pt">{route.title}</p>
                </a>
              );
            })}
          </div>

          {/* Mobile Profile Section */}
          <div className="border-t px-4 py-3">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={Profile}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="body-emphasized-14pt">Dr. Jose Simmons</p>
                <p className="body-secondary-info-14pt">General Practitioner</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <button className="flex items-center space-x-2 py-2 px-2 hover:bg-gray-50 rounded transition-colors">
                <img src={Settings} alt="Settings" className="h-5 w-5" />
                <span className="body-emphasized-14pt">Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
