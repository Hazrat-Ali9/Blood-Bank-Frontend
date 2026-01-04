import { Link } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

export default function Dashboard() {
  const role = getUserRole();
  
  // Donor-specific cards
  const donorCards = [
    {
      title: "My Profile",
      description: "View and update your personal information, contact details, and donor preferences.",
      icon: "👤",
      path: "/profile",
      gradient: "from-blue-500 to-purple-600",
      color: "blue"
    },
    {
      title: "Donation Form",
      description: "Submit new blood donation requests and track their status in real-time.",
      icon: "🩸",
      path: "/donation-form",
      gradient: "from-red-500 to-pink-600",
      color: "red"
    },
    {
      title: "Donation History",
      description: "View your complete donation history, appointments, and past contributions.",
      icon: "📋",
      path: "/donation-history",
      gradient: "from-green-500 to-emerald-600",
      color: "green"
    }
  ];

  // Admin-specific cards
  const adminCards = [
    {
      title: "List of Users",
      description: "Manage all user accounts, view registrations, and handle user permissions.",
      icon: "👥",
      path: "/admin/users",
      gradient: "from-indigo-500 to-blue-600",
      color: "indigo"
    },
    {
      title: "Blood Requests",
      description: "View all blood requests, check status, and respond to user inquiries.",
      icon: "💉",
      path: "/admin/blood-requests",
      gradient: "from-rose-500 to-red-600",
      color: "rose"
    },
    {
      title: "Contact History",
      description: "Manage all contact messages from users and respond to inquiries.",
      icon: "📞",
      path: "/admin/contacts",
      gradient: "from-amber-500 to-orange-600",
      color: "amber"
    }
  ];

  const cards = role === "Admin" ? adminCards : donorCards;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-transparent rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gradient-to-tr from-red-200 to-transparent rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-bl from-purple-200 to-transparent rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            {/* <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 shadow-lg mb-4">
              <span className="text-4xl">🏥</span>
            </div> */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Welcome to your BloodBank Management System Control Center
            </p>
          </div>

          {/* Role badge */}
          {role && (
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200">
              <div className={`w-3 h-3 rounded-full bg-${role === "Admin" ? "purple" : "red"}-500 animate-pulse`}></div>
              <span className="font-semibold text-gray-800">
                {role === "Admin" ? "👑 Administrator Portal" : "🩸 Donor Portal"}
              </span>
              <div className="text-sm text-gray-500 ml-2 px-3 py-1 bg-gray-100 rounded-full">
                {role === "Admin" ? "Full Access" : "Limited Access"}
              </div>
            </div>
          )}
        </div>

        {/* Dashboard stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Status</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {role === "Admin" ? "Active" : "Ready"}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <span className="text-2xl text-white">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Access Level</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {role === "Admin" ? "Full" : "Standard"}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <span className="text-2xl text-white">🔒</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">System</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  Operational
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-2xl text-white">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className="group relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
              
              {/* Main card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 h-full">
                {/* Card header with icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <span className="text-3xl text-white">{card.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {card.title}
                      </h2>
                      <div className={`w-12 h-1.5 bg-gradient-to-r ${card.gradient} rounded-full mt-2`}></div>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                {/* Card description */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {card.description}
                </p>

                {/* Card footer */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                  <span className={`font-semibold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}>
                    Open Section →
                  </span>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                    <span className="text-white text-lg">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional info section */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32"></div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4">Need Assistance?</h3>
                  <p className="text-gray-300 max-w-lg">
                    Our support team is available 24/7 to help you with any questions or issues you may encounter.
                  </p>
                </div>
                <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                 📞 +880 1234-567890
                </button>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-gray-300">Service Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">99.9%</div>
                  <div className="text-gray-300">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {role === "Admin" ? "Unlimited" : "Premium"}
                  </div>
                  <div className="text-gray-300">Access</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom notice */}
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}