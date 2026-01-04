import { Link, useLocation } from "react-router-dom";
import {
  FaHeart,
  FaCopyright,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { useEffect } from "react";

export default function Footer() {
  const location = useLocation();

  // jokhn location change hoy, tokhn scroll top a niye jay 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  // link click handaler
  const handleLinkClick = (e) => {
    // just route change korbe , scroll korbe na
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    window.history.pushState({}, "", href);
    // route change jonno akti coustom event trigar korun
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <footer className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white w-full mt-20 shadow-lg">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">
                Blood<span className="text-red-200">Bank</span>
              </h2>
            </div>

            <p className="text-gray-200 leading-relaxed">
              A life-saving platform connecting blood donors with those in need.
              Every drop counts in saving a life.
            </p>

            <div className="flex items-center space-x-2 text-sm">
              <FaHeart className="text-red-300 animate-pulse" />
              <span>Made with love by</span>
              <span className="font-semibold text-red-100 hover:underline"> <a href="https://www.facebook.com/tamimkhan842/" target="_blank">Md Tamim Khan</a> </span>
            </div>

            {/* Redesigned Dedication Section */}
            <div className="pt-2 space-y-1">
              <div className="flex items-start space-x-2 text-sm">
                <span className="text-red-200 font-medium mt-0.5">→</span>
                <span className="text-gray-200">
                  Dedicated to 59D Batch (Dept. Of CSE), 
                <div className="text-xs text-gray-300 italic ml-4">
                 prime university
              </div>
                </span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <span className="text-red-200 font-medium mt-0.5">→</span>
                <span className="text-gray-200">
                  Thank you,{" "}
                  <a
                    href="https://www.facebook.com/mahfuz0220"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-red-100 hover:underline"
                  >
                    Md. Mahfuzur Rahman
                  </a>
                </span>
              </div>
              <div className="text-xs text-gray-300 italic ml-4">
                (Lecturer, Dept. of CSE)
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-red-400 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 hover:text-red-200 transition-colors duration-300"
                >
                  <span className="w-2 h-2 bg-red-300 rounded-full"></span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center space-x-2 hover:text-red-200 transition-colors duration-300"
                >
                  <span className="w-2 h-2 bg-red-300 rounded-full"></span>
                  <span>About </span>
                </Link>
              </li>
              <li>
                <a
                  href="/search"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 hover:text-red-200 transition-colors duration-300"
                >
                  <span className="w-2 h-2 bg-red-300 rounded-full"></span>
                  <span>Find Donors</span>
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 hover:text-red-200 transition-colors duration-300"
                >
                  <span className="w-2 h-2 bg-red-300 rounded-full"></span>
                  <span>Become a Donor</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-red-400 pb-2">
              Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/privacy"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 hover:text-red-200 transition-colors duration-300"
                >
                  <span className="w-2 h-2 bg-red-300 rounded-full"></span>
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 hover:text-red-200 transition-colors duration-300"
                >
                  <span className="w-2 h-2 bg-red-300 rounded-full"></span>
                  <span>Terms & Conditions</span>
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 hover:text-red-200 transition-colors duration-300"
                >
                  <span className="w-2 h-2 bg-red-300 rounded-full"></span>
                  <span>FAQs</span>
                </a>
              </li>
              <li>
                <a
                  href="/safety-guidelines"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 hover:text-red-200 transition-colors duration-300"
                >
                  <span className="w-2 h-2 bg-red-300 rounded-full"></span>
                  <span>Safety Guidelines</span>
                </a>
              </li>
            </ul>
          </div>

          {/* contact and social aigula akai rakhun karon aigula extranal link  */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-red-400 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-red-300" />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-red-200 transition-colors"
                >
                  +880 1234 567890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-red-300" />
                <a
                  href="mailto:info@bloodbank.com"
                  className="hover:text-red-200 transition-colors"
                >
                  info@bloodbank.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-300" />
                <span className="text-gray-200">Dhaka, Bangladesh</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="pt-4">
              <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/tamimkhan842/"
                  className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FaFacebook />
                </a>
                <a
                 href="https://www.facebook.com/tamimkhan842/"
                  className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.facebook.com/tamimkhan842/"
                  className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/mdtamimkhan/"
                  className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="mt-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-2"> Emergency Blood Need?</h3>
          <p className="text-lg mb-4">
            Call our 24/7 emergency helpline immediately
          </p>
          <a
            href="tel:+8801234567890"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-50 transition-all shadow-lg"
          >
            📞 +880 1234-567890
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-red-950 border-t border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-300">
              <FaCopyright className="text-red-300" />
              <span>
                {new Date().getFullYear()} BloodBank. All rights reserved.
              </span>
            </div>

            {/* Developer Info */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Developed by</span>
              <a
                href="https://github.com/Tamimkhan7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-red-800 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaGithub />
                <span className="font-semibold">Tamim Khan</span>
              </a>
            </div>

            {/* Codist Brand */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Powered by</span>
              <a
                href="https://www.codist.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-red-700 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-500 transition-all"
              >
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                </div>
                <span className="font-bold">Codist</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
