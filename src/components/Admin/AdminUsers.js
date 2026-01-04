import { useEffect, useState } from "react";
import { getAllUsers, toggleBanUser, adminUpdateDonor } from "../../api/api";
import {
  FaEdit,
  FaBan,
  FaCheck,
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaTint,
  FaVenusMars,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaCalendar,
  FaStethoscope,
  FaImage,
  FaCamera,
  FaMap,
  FaTrash,
  FaUpload,
  FaIdCard,
  FaHeartbeat
} from "react-icons/fa";

// Bangladesh Districts
const BANGLADESH_DISTRICTS = [
  "Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal", "Rangpur", "Mymensingh",
  "Comilla", "Narayanganj", "Gazipur", "Narsingdi", "Manikganj", "Munshiganj", "Faridpur",
  "Tangail", "Jamalpur", "Sherpur", "Netrokona", "Kishoreganj", "Bogra", "Joypurhat",
  "Naogaon", "Natore", "Pabna", "Sirajganj", "Chapainawabganj", "Jessore", "Satkhira",
  "Meherpur", "Narail", "Chuadanga", "Kushtia", "Magura", "Jhenaidah", "Bagerhat",
  "Pirojpur", "Patuakhali", "Bhola", "Barguna", "Noakhali", "Feni", "Lakshmipur",
  "Chandpur", "Brahmanbaria", "Habiganj", "Moulvibazar", "Sunamganj", "Panchagarh",
  "Thakurgaon", "Dinajpur", "Nilphamari", "Lalmonirhat", "Kurigram", "Gaibandha"
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];
// admin users
export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBan = async (id) => {
    await toggleBanUser(id);
    fetchUsers();
  };

  const openEdit = (user) => {
    setEditUser(user);
    const donorProfile = user.donorProfile || {};
    setForm({
      ...donorProfile,
      // Ensure district fields are properly set
      presentDistrict: donorProfile.presentDistrict || "",
      permanentDistrict: donorProfile.permanentDistrict || "",
      // Ensure gender is properly set
      gender: donorProfile.gender || "",
      // Ensure blood group is properly set
      bloodGroup: donorProfile.bloodGroup || "",
    });
    setPhotoPreview(donorProfile.photoUrl || null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await adminUpdateDonor(editUser.id, form);
      setEditUser(null);
      setPhotoPreview(null);
      fetchUsers();
    } finally {
      setSaving(false);
    }
  };

  // Handle photo upload from device
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to cloud storage here
      // For now, create a local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        // In a real implementation, upload to your server and get URL
        // For demo, we'll set it as a base64 string
        setForm({ ...form, photoUrl: reader.result });
      };
      reader.readAsDataURL(file);
      setIsUploading(true);
      setTimeout(() => setIsUploading(false), 1000); // Simulate upload
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setForm({ ...form, photoUrl: "" });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const InputField = ({ icon, label, value, onChange, type = "text", options, ...props }) => (
    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        {icon} <span>{label}</span>
      </label>
      {type === "select" ? (
        <select
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200"
          value={value || ""}
          onChange={onChange}
          {...props}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 min-h-[100px]"
          value={value || ""}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200"
          type={type}
          value={value || ""}
          onChange={onChange}
          {...props}
        />
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto mt-20 md:mt-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-xl mb-8 border border-red-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                 User Management Dashboard
              </h1>
              <p className="opacity-90 text-red-100">Manage all users, ban/unban, and update donor profiles</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium">
                {users.length} Total Users
              </span>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white p-5 rounded-2xl shadow-lg mb-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <FaUser className="text-red-600" /> Filter & Search
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name/Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaUser className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Donor">Donor</option>
                {/* <option value="User">User</option> */}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchUsers}
                className="w-full p-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FaCheck /> Refresh Users
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-50 to-red-100">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700">User Profile</th>
                  <th className="p-4 text-left font-bold text-gray-700">Contact</th>
                  <th className="p-4 text-left font-bold text-gray-700">Role & Blood</th>
                  <th className="p-4 text-left font-bold text-gray-700">Status</th>
                  <th className="p-4 text-left font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-red-50/50 transition-all duration-200">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center border-2 border-red-200">
                            {user.donorProfile?.photoUrl ? (
                              <img
                                src={user.donorProfile.photoUrl}
                                alt={user.fullName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <FaUser className="text-red-600 text-xl" />
                            )}
                          </div>
                          {user.donorProfile?.bloodGroup && (
                            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {user.donorProfile.bloodGroup}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{user.fullName}</p>
                          <p className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaEnvelope className="text-red-500" />
                          <span className="truncate max-w-[200px]">{user.email}</span>
                        </div>
                        {user.donorProfile?.phone && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaPhone className="text-red-500" />
                            {user.donorProfile.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                          user.role === "Admin" ? "bg-purple-100 text-purple-800 border border-purple-200" :
                          user.role === "Donor" ? "bg-green-100 text-green-800 border border-green-200" :
                          "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}>
                          {user.role}
                        </span>
                        {user.donorProfile?.bloodGroup && (
                          <div className="flex items-center gap-2">
                            <FaTint className="text-red-500" />
                            <span className="font-bold text-gray-700">{user.donorProfile.bloodGroup}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${user.isBanned ? "bg-red-500" : "bg-green-500"} animate-pulse`}></div>
                        <span className={`font-bold ${user.isBanned ? "text-red-600" : "text-green-600"}`}>
                          {user.isBanned ? "🚫 BANNED" : "✅ ACTIVE"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleToggleBan(user.id)}
                          className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                            user.isBanned
                              ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md"
                              : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md"
                          }`}
                        >
                          {user.isBanned ? <FaCheck /> : <FaBan />}
                          {user.isBanned ? "Unban" : "Ban"}
                        </button>
                        {user.donorProfile && (
                          <button
                            onClick={() => openEdit(user)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 font-bold flex items-center gap-2 shadow-md"
                          >
                            <FaEdit /> Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <FaUser className="text-6xl mx-auto mb-6 opacity-20" />
                <p className="text-xl font-medium">No users found</p>
                <p className="text-gray-400 mt-2">Try changing your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editUser && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto border-2 border-red-200">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-3xl z-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {/* <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <FaHeartbeat className="text-3xl" />
                    </div> */}
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">Edit Donor Profile</h2>
                      <p className="opacity-90">{editUser.fullName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditUser(null);
                      setPhotoPreview(null);
                    }}
                    className="text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Photo Upload Section */}
                <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-3">
                    <FaCamera className="text-red-600" /> Profile Photo
                  </h3>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-red-100 to-pink-100">
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaUser className="text-6xl text-red-300" />
                          </div>
                        )}
                      </div>
                      {photoPreview && (
                        <button
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block mb-4">
                        <div className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3">
                          <FaUpload />
                          {isUploading ? "Uploading..." : "Upload New Photo"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                        </div>
                      </label>
                      <p className="text-sm text-gray-600">
                        Upload a clear photo of the donor. Supported formats: JPG, PNG, WEBP. Max size: 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Personal Info */}
                  <div>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                      <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-3 border-b pb-3 border-red-100">
                        <FaUser className="text-red-600" /> Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={<FaTint className="text-red-500" />}
                          label="Blood Group"
                          value={form.bloodGroup}
                          onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                          type="select"
                          options={BLOOD_GROUPS}
                        />
                        
                        <InputField
                          icon={<FaPhone className="text-red-500" />}
                          label="Phone Number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          type="tel"
                          placeholder="+8801XXXXXXXXX"
                        />
                      </div>

                      <InputField
                        icon={<FaEnvelope className="text-red-500" />}
                        label="Email Address"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        type="email"
                        placeholder="donor@email.com"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={<FaUser className="text-red-500" />}
                          label="Age"
                          value={form.age}
                          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                          type="number"
                          min="18"
                          max="100"
                        />
                        
                        <InputField
                          icon={<FaVenusMars className="text-red-500" />}
                          label="Gender"
                          value={form.gender}
                          onChange={(e) => setForm({ ...form, gender: e.target.value })}
                          type="select"
                          options={GENDER_OPTIONS}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={<FaBirthdayCake className="text-red-500" />}
                          label="Date of Birth"
                          value={form.dateOfBirth?.split('T')[0] || ""}
                          onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                          type="date"
                        />
                        
                        <InputField
                          icon={<FaIdCard className="text-red-500" />}
                          label="National ID"
                          value={form.nationalIdNumber}
                          onChange={(e) => setForm({ ...form, nationalIdNumber: e.target.value })}
                          placeholder="XXXXXXXXXXXXX"
                        />
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-5 rounded-full transition-all duration-300 ${form.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}>
                              <div className={`w-5 h-5 bg-white rounded-full transform transition-all duration-300 ${form.isAvailable ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </div>
                            <span className="font-bold text-gray-800">Available for Donation</span>
                          </div>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={form.isAvailable || false}
                            onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Medical Info */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-3 border-b pb-3 border-red-100">
                        <FaStethoscope className="text-red-600" /> Medical Information
                      </h3>
                      <InputField
                        icon={<FaStethoscope className="text-red-500" />}
                        label="Medical History & Conditions"
                        value={form.medicalInfo}
                        onChange={(e) => setForm({ ...form, medicalInfo: e.target.value })}
                        type="textarea"
                        placeholder="Any medical conditions, allergies, or important health information..."
                      />
                      
                      <InputField
                        icon={<FaCalendar className="text-red-500" />}
                        label="Last Donation Date"
                        value={form.lastDonationDate?.split('T')[0] || ""}
                        onChange={(e) => setForm({ ...form, lastDonationDate: e.target.value })}
                        type="date"
                      />
                    </div>
                  </div>

                  {/* Right Column - Address Info */}
                  <div>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                      <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-3 border-b pb-3 border-red-100">
                        <FaMapMarkerAlt className="text-red-600" /> Present Address
                      </h3>
                      
                      <InputField
                        icon={<FaMapMarkerAlt className="text-red-500" />}
                        label="Full Address"
                        value={form.presentAddress}
                        onChange={(e) => setForm({ ...form, presentAddress: e.target.value })}
                        placeholder="House #, Road #, Area"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={<FaMap className="text-red-500" />}
                          label="Police Station"
                          value={form.presentPoliceStation}
                          onChange={(e) => setForm({ ...form, presentPoliceStation: e.target.value })}
                        />
                        
                        <InputField
                          icon={<FaMap className="text-red-500" />}
                          label="District"
                          value={form.presentDistrict}
                          onChange={(e) => setForm({ ...form, presentDistrict: e.target.value })}
                          type="select"
                          options={BANGLADESH_DISTRICTS}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <InputField
                          icon={<FaMap className="text-red-500" />}
                          label="Latitude"
                          value={form.latitude}
                          onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
                          type="number"
                          step="0.000001"
                          placeholder="23.8103"
                        />
                        
                        <InputField
                          icon={<FaMap className="text-red-500" />}
                          label="Longitude"
                          value={form.longitude}
                          onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
                          type="number"
                          step="0.000001"
                          placeholder="90.4125"
                        />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-3 border-b pb-3 border-red-100">
                        <FaMapMarkerAlt className="text-red-600" /> Permanent Address
                      </h3>
                      
                      <InputField
                        icon={<FaMapMarkerAlt className="text-red-500" />}
                        label="Full Address"
                        value={form.permanentAddress}
                        onChange={(e) => setForm({ ...form, permanentAddress: e.target.value })}
                        placeholder="House #, Road #, Area"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          icon={<FaMap className="text-red-500" />}
                          label="Police Station"
                          value={form.permanentPoliceStation}
                          onChange={(e) => setForm({ ...form, permanentPoliceStation: e.target.value })}
                        />
                        
                        <InputField
                          icon={<FaMap className="text-red-500" />}
                          label="District"
                          value={form.permanentDistrict}
                          onChange={(e) => setForm({ ...form, permanentDistrict: e.target.value })}
                          type="select"
                          options={BANGLADESH_DISTRICTS}
                        />
                      </div>

                      <div className="mt-6">
                        <label className="flex items-center gap-3 mb-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                            checked={form.sameAsPresent || false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setForm({
                                ...form,
                                sameAsPresent: checked,
                                permanentAddress: checked ? form.presentAddress : form.permanentAddress,
                                permanentPoliceStation: checked ? form.presentPoliceStation : form.permanentPoliceStation,
                                permanentDistrict: checked ? form.presentDistrict : form.permanentDistrict,
                              });
                            }}
                          />
                          <span className="font-medium text-gray-700">Same as Present Address</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-white p-6 border-t border-gray-200 rounded-b-3xl">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold text-red-600">Note:</span> All changes will be saved immediately.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditUser(null);
                        setPhotoPreview(null);
                      }}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-bold transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-3 disabled:opacity-70"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <FaCheck /> Save All Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}