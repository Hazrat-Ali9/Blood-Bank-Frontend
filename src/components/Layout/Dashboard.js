import { Link } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

export default function Dashboard() {
  const role = getUserRole();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 pt-24 pb-16 px-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            {/* <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">📊</span>
            </div> */}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to your BloodBank control center
          </p>
          {role && (
            <div className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-full shadow-lg">
              {/* <span className="text-lg">
                {role === "Admin" ? "👑" : "🩸"}
              </span> */}
              <span className="font-semibold">
                {role === "Admin" ? "Administrator" : "Blood Donor"} Account
              </span>
            </div>
          )}
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Profile Card */}
          <Link to="/profile" className="group relative overflow-hidden">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-red-100 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">👤</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-900 group-hover:text-red-700 transition-colors">
                    My Profile
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Update and manage your donor information, contact details, and
                availability status.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">
                  Edit Profile →
                </span>
                <span className="text-red-500 text-2xl">→</span>
              </div>
            </div>
          </Link>

          {/* Admin Users Card */}
          {role === "Admin" && (
            <>
              <Link
                to="/admin/users"
                className="group relative overflow-hidden"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-red-100 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-red-900 group-hover:text-red-700 transition-colors">
                        List of Users
                      </h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Manage all user accounts, view registrations, and handle
                    user permissions and status.
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">
                      Manage Users →
                    </span>
                    <span className="text-red-500 text-2xl">→</span>
                  </div>
                </div>
              </Link>

              {/* Admin Blood Requests Card */}
              <Link
                to="/admin/blood-requests"
                className="group relative overflow-hidden"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-red-100 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl">🩸</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-red-900 group-hover:text-red-700 transition-colors">
                        Blood Requests
                      </h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    View all blood requests, check status, and reply to user
                    requests.
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">
                      View Requests →
                    </span>
                    <span className="text-red-500 text-2xl">→</span>
                  </div>
                </div>
              </Link>

              {/* Contact History Card */}
              <Link
                to="/admin/contacts"
                className="group relative overflow-hidden"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-red-100 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl">📞</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-red-900 group-hover:text-red-700 transition-colors">
                        Contact History
                      </h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    View and manage all contact messages from users, handle
                    inquiries, and respond to requests.
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">
                      View Messages →
                    </span>
                    <span className="text-red-500 text-2xl">→</span>
                  </div>
                </div>
              </Link>

              {/* donation History Card */}
              <Link
                to="/admin/donation"
                className="group relative overflow-hidden"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl">📋</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                        Donation History
                      </h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mt-2"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    View comprehensive donation history from all users, track
                    contributions, and manage donation records.
                  </p>
                   <div className="flex items-center justify-between mt-auto">
                    <span className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">
                      View History →
                    </span>
                    <span className="text-red-500 text-2xl">→</span>
                  </div>
                </div>
              </Link>
            </>
          )}

          {/* Search Donors Card (Commented - can uncomment if needed) */}

          {/* <Link
            to="/search"
            className="group relative overflow-hidden"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-red-100 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">🔍</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-900 group-hover:text-red-700 transition-colors">
                    Search Donors
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Find nearby blood donors by blood group, location, and availability status.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-red-600 font-semibold group-hover:text-red-700 transition-colors">
                  Search Now →
                </span>
                <span className="text-red-500 text-2xl">→</span>
              </div>
            </div>
          </Link> */}

          {/* Add More Cards for Future Features */}
          {role !== "Admin" && (
            <>
              {/* { Placeholder Card 1 } */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100 opacity-80">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl">⭐</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-700">
                      Coming Soon
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mt-2"></div>
                  </div>
                </div>
                <p className="text-gray-500 mb-6">
                  New features are being developed to enhance your donor
                  experience.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-gray-400 font-semibold">
                    Stay Tuned
                  </span>
                </div>
              </div>

              {/* Placeholder Card 2 */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100 opacity-80">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl">🚀</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-700">
                      Future Updates
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full mt-2"></div>
                  </div>
                </div>
                <p className="text-gray-500 mb-6">
                  More tools and features will be added to help you save more
                  lives.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-gray-400 font-semibold">
                    Coming Soon
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Stats (Optional - can add later) */}
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
                    Our support team is available 24/7 to help you with any
                    questions or issues you may encounter.
                  </p>
                </div>
                <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  📞 +880 1234-567890
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
