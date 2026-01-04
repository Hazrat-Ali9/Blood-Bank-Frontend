import { useState, useEffect } from "react";
import { searchDonors, getMyDonations } from "../../api/api";

export default function DonorSearch() {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    donorType: "all", // all, available, unavailable
  });

  const [donors, setDonors] = useState([]);
  const [allDonors, setAllDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDonors, setTotalDonors] = useState(0);
  const pageSize = 6;

  // Available blood groups
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // All 64 Districts of Bangladesh
  const allDistricts = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogra", 
    "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Comilla", 
    "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", 
    "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", 
    "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", 
    "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", 
    "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", 
    "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", 
    "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", 
    "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", 
    "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", 
    "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
  ];

  const donorTypes = [
    { value: "all", label: "All Donors" },
    { value: "available", label: "Available Donors Only" },
    { value: "unavailable", label: "Unavailable Donors" },
  ];

  // Function to calculate if donor is available (can donate again)
  const calculateIsAvailable = (lastDonationDate) => {
    if (!lastDonationDate) return true; // Never donated before, so available
    
    const lastDonation = new Date(lastDonationDate);
    const now = new Date();
    
    // Calculate days since last donation
    const daysSinceLastDonation = Math.floor(
      (now - lastDonation) / (1000 * 60 * 60 * 24)
    );
    
    // Donors can donate again after 90 days (3 months)
    const requiredDaysBetweenDonations = 90;
    
    return daysSinceLastDonation >= requiredDaysBetweenDonations;
  };

  // Process donors to add availability status
  const processDonors = (donorsArray) => {
    return donorsArray.map(item => {
      const donor = item.donor || item;
      const isAvailable = calculateIsAvailable(donor.lastDonationDate);
      
      return {
        ...item,
        donor: {
          ...donor,
          isAvailable,
          availabilityStatus: isAvailable ? "available" : "unavailable"
        }
      };
    });
  };

  // Fetch all donors initially
  const loadAllDonors = async () => {
    setLoading(true);
    try {
      const params = {
        page: 1,
        pageSize: 50, // Load first 50 donors to show
      };

      const response = await searchDonors(params);
      const processedDonors = processDonors(response.data.donors || []);
      
      setAllDonors(processedDonors);
      setTotalDonors(processedDonors.length);
      setDonors(processedDonors); // Show all initially
      setTotalPages(Math.ceil(processedDonors.length / pageSize));
    } catch (error) {
      console.error("Failed to load donors:", error);
      alert("Failed to load donors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter from all donors locally
  const filterDonorsLocally = () => {
    if (!filters.bloodGroup) {
      alert("Please select a blood group");
      return;
    }

    setSearching(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      let filtered = [...allDonors];

      // Filter by blood group
      if (filters.bloodGroup) {
        filtered = filtered.filter((item) => {
          const donor = item.donor || item;
          return donor.bloodGroup === filters.bloodGroup;
        });
      }

      // Filter by district
      if (filters.district) {
        filtered = filtered.filter((item) => {
          const donor = item.donor || item;
          return (
            donor.presentDistrict === filters.district ||
            donor.permanentDistrict === filters.district
          );
        });
      }

      // Filter by donor type (availability)
      if (filters.donorType === "available") {
        filtered = filtered.filter((item) => {
          const donor = item.donor || item;
          return donor.isAvailable === true;
        });
      } else if (filters.donorType === "unavailable") {
        filtered = filtered.filter((item) => {
          const donor = item.donor || item;
          return donor.isAvailable === false;
        });
      }

      // Sort: available donors first
      filtered.sort((a, b) => {
        const donorA = a.donor || a;
        const donorB = b.donor || b;
        
        if (donorA.isAvailable && !donorB.isAvailable) return -1;
        if (!donorA.isAvailable && donorB.isAvailable) return 1;
        return 0;
      });

      setDonors(filtered);
      setTotalDonors(filtered.length);
      setTotalPages(Math.ceil(filtered.length / pageSize));
      setPage(1);
      setSearching(false);
    }, 300);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getTimeSinceLastDonation = (dateString) => {
    if (!dateString) return "Never donated";

    const lastDonation = new Date(dateString);
    const now = new Date();
    const diffMonths = Math.floor(
      (now - lastDonation) / (1000 * 60 * 60 * 24 * 30)
    );

    if (diffMonths === 0) return "This month";
    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  };

  // Get availability text with days calculation
  const getAvailabilityText = (lastDonationDate) => {
    const isAvailable = calculateIsAvailable(lastDonationDate);
    
    if (!lastDonationDate) {
      return { 
        text: "Available (Never donated)", 
        isAvailable: true 
      };
    }

    const lastDonation = new Date(lastDonationDate);
    const now = new Date();
    const daysSince = Math.floor((now - lastDonation) / (1000 * 60 * 60 * 24));
    const daysNeeded = 90;
    const daysLeft = daysNeeded - daysSince;

    if (isAvailable) {
      return { 
        text: "Available to donate", 
        isAvailable: true 
      };
    } else {
      return { 
        text: `Available in ${daysLeft} days`, 
        isAvailable: false 
      };
    }
  };

  const getRandomColor = () => {
    const colors = [
      "bg-gradient-to-br from-red-100 to-red-50",
      "bg-gradient-to-br from-pink-100 to-pink-50",
      "bg-gradient-to-br from-rose-100 to-rose-50",
      "bg-gradient-to-br from-orange-100 to-orange-50",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Load all donors on component mount
  useEffect(() => {
    loadAllDonors();
  }, []);

  // Calculate paginated donors
  const paginatedDonors = donors.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 pt-24 pb-16 px-4">
      {/* Background blood drop decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-red-50 to-transparent rounded-full opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <span className="text-white text-4xl">🩸</span>
              </div>
              <div className="absolute -inset-4 bg-red-200 rounded-full opacity-30 animate-ping"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
            Find Blood Donors
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse all donors or filter by specific criteria. Every search could save a life.
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-10 border border-red-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-900">
                Search & Filter Donors
              </h2>
              <p className="text-gray-600">Find donors by your specific needs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blood Group */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">🩸</span> Blood Group *
              </label>
              <div className="relative">
                <select
                  name="bloodGroup"
                  value={filters.bloodGroup}
                  onChange={handleFilterChange}
                  className="w-full p-4 border-2 border-red-100 rounded-xl focus:border-red-500 focus:ring-3 focus:ring-red-100 transition-all duration-300 appearance-none bg-white"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg} className="py-3">
                      {bg} {bg.includes("+") ? "Positive" : "Negative"}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-red-400">▼</span>
                </div>
              </div>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">📍</span> Select District
              </label>
              <div className="relative">
                <select
                  name="district"
                  value={filters.district}
                  onChange={handleFilterChange}
                  className="w-full p-4 border-2 border-red-100 rounded-xl focus:border-red-500 focus:ring-3 focus:ring-red-100 transition-all duration-300 appearance-none bg-white"
                >
                  <option value="">All Districts of Bangladesh</option>
                  {allDistricts.sort().map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-red-400">▼</span>
                </div>
              </div>
            </div>

            {/* Donor Type */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">👥</span> Donor Status
              </label>
              <div className="relative">
                <select
                  name="donorType"
                  value={filters.donorType}
                  onChange={handleFilterChange}
                  className="w-full p-4 border-2 border-red-100 rounded-xl focus:border-red-500 focus:ring-3 focus:ring-red-100 transition-all duration-300 appearance-none bg-white"
                >
                  {donorTypes.map((type) => (
                    <option key={type.value} value={type.value} className="py-3">
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-red-400">▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={filterDonorsLocally}
              disabled={searching || !filters.bloodGroup}
              className="relative bg-gradient-to-r from-red-600 to-red-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:from-red-700 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[200px] group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {searching ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                  <span className="relative z-10">Filtering...</span>
                </>
              ) : (
                <>
                  <span className="text-xl relative z-10">🔍</span>
                  <span className="relative z-10">Filter Donors</span>
                </>
              )}
            </button>

            <button
              onClick={loadAllDonors}
              disabled={loading}
              className="relative bg-gradient-to-r from-gray-700 to-gray-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[200px] group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                  <span className="relative z-10">Loading...</span>
                </>
              ) : (
                <>
                  <span className="text-xl relative z-10">🔄</span>
                  <span className="relative z-10">Show All Donors</span>
                </>
              )}
            </button>
          </div>

          {/* Active Filters Display */}
          {(filters.bloodGroup || filters.district || filters.donorType !== "all") && (
            <div className="mt-6 pt-6 border-t border-red-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {filters.bloodGroup && (
                  <span className="bg-gradient-to-r from-red-100 to-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-200 flex items-center gap-2">
                    <span>🩸</span> {filters.bloodGroup}
                  </span>
                )}
                {filters.district && (
                  <span className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 flex items-center gap-2">
                    <span>📍</span> {filters.district}
                  </span>
                )}
                {filters.donorType !== "all" && (
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${
                    filters.donorType === "available" 
                      ? "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200" 
                      : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border-gray-200"
                  }`}>
                    <span>{filters.donorType === "available" ? "🟢" : "🔴"}</span>
                    {filters.donorType === "available" ? "Available Only" : "Unavailable Only"}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-900">
                  Available Donors
                </h2>
                {totalDonors > 0 && (
                  <p className="text-gray-600">
                    Showing {totalDonors} donor{totalDonors !== 1 ? 's' : ''}
                    {filters.donorType === "available" && " (Available only)"}
                    {filters.donorType === "unavailable" && " (Unavailable only)"}
                  </p>
                )}
              </div>
            </div>
            
            {totalDonors > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Page</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg font-bold">
                  {page} of {totalPages}
                </span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedDonors.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-lg border border-red-100">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-red-300 text-5xl">🩸</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {searching ? "Filtering donors..." : "No donors found"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                {filters.bloodGroup
                  ? `No ${filters.bloodGroup} donors found with the selected filters. Try changing your search criteria.`
                  : "Please select a blood group to start searching."}
              </p>
              <button
                onClick={loadAllDonors}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🔄 Show All Donors
              </button>
            </div>
          ) : (
            <>
              {/* Donor Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedDonors.map((item, index) => {
                  const donor = item.donor || item;
                  const availabilityInfo = getAvailabilityText(donor.lastDonationDate);
                  const isAvailable = donor.isAvailable || availabilityInfo.isAvailable;

                  return (
                    <div
                      key={donor.id || index}
                      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-red-100 overflow-hidden group hover:-translate-y-2"
                    >
                      {/* Top Section with Blood Group */}
                      <div className={`relative h-32 ${isAvailable ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`}>
                        {/* Blood Group Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="bg-white text-red-600 px-5 py-3 rounded-2xl font-extrabold text-xl shadow-2xl border-2 border-red-200">
                            {donor.bloodGroup || "Unknown"}
                          </div>
                        </div>

                        {/* Availability Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <div
                            className={`px-4 py-2 rounded-2xl font-bold text-sm shadow-lg border-2 ${
                              isAvailable
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-300"
                                : "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-300"
                            }`}
                          >
                            {isAvailable ? "🟢 Available" : "🔴 Not Available"}
                          </div>
                        </div>

                        {/* Decorative Circle */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full border-4 border-red-100 shadow-lg overflow-hidden">
                          {donor.photoUrl ? (
                            <img
                              src={donor.photoUrl}
                              alt={donor.user?.fullName || "Donor"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full ${getRandomColor()} flex items-center justify-center`}>
                              <span className="text-3xl font-bold text-red-600">
                                {donor.user?.fullName?.charAt(0) || "D"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Donor Info */}
                      <div className="p-6 pt-16">
                        {/* Name and Basic Info */}
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                            {donor.user?.fullName || "Anonymous Donor"}
                          </h3>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="text-gray-600 text-sm">
                              👤 {donor.age ? `${donor.age} years` : "Age not specified"}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className={`font-semibold text-sm ${isAvailable ? 'text-green-600' : 'text-gray-600'}`}>
                              {isAvailable ? "🟢 Available" : "🔴 Not Available"}
                            </span>
                          </div>
                        </div>

                        {/* Availability Info */}
                        <div className={`mb-4 text-center ${isAvailable ? 'text-green-600' : 'text-gray-600'}`}>
                          <p className="text-sm font-medium">
                            {availabilityInfo.text}
                          </p>
                        </div>

                        {/* Location Info */}
                        {/* <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-4 mb-6 border border-red-100">
                          <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-red-500">📍</span>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Present District</p>
                                <p className="font-semibold text-gray-800">
                                  {donor.presentDistrict || "Not specified"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-red-500">🏠</span>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Permanent District</p>
                                <p className="font-semibold text-gray-800">
                                  {donor.permanentDistrict || "Not specified"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div> */}

                        {/* Contact Info */}
                        <div className="space-y-4 mb-6">
                          {donor.phone && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-green-500">📞</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-500">Phone Number</p>
                                <a
                                  href={`tel:${donor.phone}`}
                                  className="font-semibold text-gray-800 hover:text-red-600 transition-colors break-all"
                                >
                                  {donor.phone}
                                </a>
                              </div>
                            </div>
                          )}

                          {donor.email && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-500">✉️</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-500">Email Address</p>
                                <a
                                  href={`mailto:${donor.email}`}
                                  className="font-semibold text-gray-800 hover:text-red-600 transition-colors break-all"
                                >
                                  {donor.email}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-red-100">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">📍 District</p>
                            <p className="font-semibold text-gray-800">
                              {donor.presentDistrict || donor.permanentDistrict || "Not specified"}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">🩸 Last Donation</p>
                            <p className="font-semibold text-gray-800">
                              {getTimeSinceLastDonation(donor.lastDonationDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-gray-600 text-sm">
                    Showing {(page - 1) * pageSize + 1} to{" "}
                    {Math.min(page * pageSize, totalDonors)} of {totalDonors}{" "}
                    donors
                    {filters.donorType === "available" && " • Showing available donors only"}
                    {filters.donorType === "unavailable" && " • Showing unavailable donors only"}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="px-5 py-2.5 border-2 border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                    >
                      <span>←</span> Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (page <= 3) {
                            pageNum = i + 1;
                          } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = page - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                                page === pageNum
                                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
                                  : "text-red-600 hover:bg-red-50 border border-red-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      {totalPages > 5 && page < totalPages - 2 && (
                        <>
                          <span className="text-red-400 px-2">...</span>
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-50 font-semibold border border-red-100"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="px-5 py-2.5 border-2 border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                    >
                      Next <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-red-800 opacity-10"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Need Immediate Help?</h3>
                    <p className="opacity-90">
                      For emergency blood requirements, contact our 24/7 helpline
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 bg-white/10 px-6 py-3 rounded-2xl">
                  +880 123-456-7890
                </div>
                <p className="text-sm opacity-80">24/7 Emergency Helpline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            📌 Showing donors from all 64 districts of Bangladesh • 
            <span className="mx-2">🟢</span> Available donors (Can donate now) • 
            <span className="mx-2">🔴</span> Unavailable donors (Must wait 90 days between donations)
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Note: Donors can donate blood every 90 days (3 months)
          </p>
        </div>
      </div>
    </div>
  );
}