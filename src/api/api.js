import axios from "axios";

const API_URL = "http://localhost:5282/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* AUTH */
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const forgetPassword = (email) =>  api.post("/auth/forget-password", { email });
export const resetPassword = (token, newPassword) => api.post("/auth/reset-password", { token, newPassword });

/* DONOR */
// Get current donor profile
export const getMyDonorProfile = () => api.get("/donors/me");

// Create or update donor profile
export const updateMyDonorProfile = (data) => api.post("/donors/me", data);

// Search donors with blood group and district
export const searchDonors = (params) =>   api.get("/donors/search", { params });
// export const Getdistricts = () => api.get("/donors/districts");

// Get available districts (returns all 64 districts)
export const getDistricts = () => api.get("/donors/districts");

// ADD THIS-- Photo upload function
export const uploadDonorPhoto = (formData) =>
  api.post("/donors/me/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  //donation history

// donation history (FIXED)
export const addDonation = (data) => api.post("/donors/me/donation", data);
export const getMyDonations = () =>  api.get("/donors/me/donations");

// admin
export const getAdminDonors = () =>
  api.get("/admin/donors");

export const getDonorDonationHistory = (donorId) => api.get(`/admin/donations/${donorId}`);
export const updateDonation = (id, data) => api.put(`/admin/donations/${id}`, data);
export const deleteDonation = (id) => api.delete(`/admin/donations/${id}`);


// ADMIN 
export const getAllUsers = () => api.get("/admin/users");
export const toggleBanUser = (id) => api.post(`/admin/toggleBan/${id}`);
export const adminUpdateDonor = (userId, data) => api.put(`/admin/donor/${userId}`, data);

// CONTACT
export const sendContactMessage = (data) => api.post("/contacts", data);
export const getAllContactMessages = () => api.get("/contacts");
// export const adminReply = (id, reply) => api.put(`/contacts/${id}/reply`, reply);
export const adminReply = (id, reply) => api.put(`/contacts/${id}/reply`, { adminReply: reply });



/*  BLOOD REQUEST*/

// User
export const createBloodRequest = (data) =>
  api.post("/blood-requests", data);

export const getMyBloodRequests = () =>
  api.get("/blood-requests/me");

// Admin
export const getAllBloodRequests = () =>
  api.get("/blood-requests/admin");

export const adminReplyBloodRequest = (id, data) =>
  api.put(`/blood-requests/admin/${id}`, data);



/* HELPER FUNCTIONS */
// Get all blood groups
export const getBloodGroupsList = () => [
  { value: "A+", label: "A+ (A Positive)" },
  { value: "A-", label: "A- (A Negative)" },
  { value: "B+", label: "B+ (B Positive)" },
  { value: "B-", label: "B- (B Negative)" },
  { value: "O+", label: "O+ (O Positive)" },
  { value: "O-", label: "O- (O Negative)" },
  { value: "AB+", label: "AB+ (AB Positive)" },
  { value: "AB-", label: "AB- (AB Negative)" },
];

// Get all 64 districts of Bangladesh
export const getAllBangladeshDistricts = () => [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogra", "Brahmanbaria", 
  "Chandpur", "Chattogram", "Chuadanga", "Comilla", "Cox's Bazar", "Dhaka", 
  "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", 
  "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachhari", 
  "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", 
  "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", 
  "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", 
  "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", 
  "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", 
  "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", 
  "Thakurgaon"
];

export default api;