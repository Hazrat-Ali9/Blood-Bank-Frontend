import { useEffect, useState } from "react";
import {
  getAdminDonors,
  getDonorDonationHistory,
  updateDonation,
  deleteDonation,
} from "../../api/api";
// admin donate history
export default function AdminDonations() {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState("");
  const [history, setHistory] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    setLoading(true);
    try {
      const res = await getAdminDonors();
      setDonors(res.data);
    } catch (error) {
      console.error("Failed to load donors:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (donorId) => {
    setSelectedDonor(donorId);
    if (!donorId) {
      setHistory([]);
      return;
    }

    setLoading(true);
    try {
      const res = await getDonorDonationHistory(donorId);
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveDonation = async () => {
    if (!editing) return;

    setLoading(true);
    try {
      await updateDonation(editing.id, {
        date: editing.date,
        location: editing.location,
        amount: editing.amount,
      });
      setEditing(null);
      loadHistory(selectedDonor);
    } catch (error) {
      console.error("Failed to update donation:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeDonation = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this donation record? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await deleteDonation(id);
      loadHistory(selectedDonor);
    } catch (error) {
      console.error("Failed to delete donation:", error);
      alert("Failed to delete donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalBlood = () => {
    return history.reduce(
      (total, donation) => total + (parseFloat(donation.amount) || 0),
      0
    );
  };

  const selectedDonorInfo = donors.find((d) => d.donorId === selectedDonor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 px-4 sm:px-6 lg:px-8 mt-10">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
              Donation Management
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Administer and manage all blood donation records
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-red-100 opacity-90 mb-1">
                    Total Donors
                  </div>
                  <div className="text-3xl font-bold">{donors.length}</div>
                </div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-red-100 opacity-90 mb-1">
                    Total Donations
                  </div>
                  <div className="text-3xl font-bold">{history.length}</div>
                </div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🩸</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-400 to-red-300 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-red-100 opacity-90 mb-1">
                    Total Blood (bags)
                  </div>
                  <div className="text-3xl font-bold">
                    {calculateTotalBlood()}
                  </div>
                </div>
                {/* <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Donor Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">👤</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-900">
                    Select Donor
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="relative mb-6">
                <select
                  value={selectedDonor}
                  onChange={(e) => loadHistory(e.target.value)}
                  disabled={loading}
                  className="w-full p-4 bg-white border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Choose a donor...</option>
                  {donors.map((d) => (
                    <option key={d.donorId} value={d.donorId}>
                      {d.name}
                      {d.email ? ` (${d.email})` : ""}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {selectedDonorInfo && (
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-5 border border-red-200">
                  <div className="flex items-center gap-4 mb-4">
                    {/* <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl text-white">👑</span>
                    </div> */}
                    <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-4 border border-red-100">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">👤</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>

                        <div className="flex-1">
                          <div className="mb-3">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Full Name
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {selectedDonorInfo.name}
                            </h3>
                          </div>

                          {selectedDonorInfo.email && (
                            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-red-100">
                              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-red-600">📧</span>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">
                                  Email Address
                                </div>
                                <div className="text-sm font-medium text-gray-800">
                                  {selectedDonorInfo.email}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {history.length}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Donations
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {calculateTotalBlood()}
                      </div>
                      <div className="text-sm text-gray-600">Total Bags</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Donation History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-100 h-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl">📋</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-red-900">
                      Donation History
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                  </div>
                </div>

                {selectedDonor && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={loadDonors}
                      className="px-4 py-2 bg-white text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 border border-red-200 hover:shadow-sm flex items-center gap-2"
                    >
                      <span>🔄</span>
                      Refresh
                    </button>
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium">
                      {history.length} record{history.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Loading donation history...</p>
                </div>
              ) : !selectedDonor ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl text-red-400">📋</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Select a Donor
                  </h3>
                  <p className="text-gray-600">
                    Choose a donor from the dropdown to view their donation
                    history
                  </p>
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl text-red-400">🩸</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    No Donations Found
                  </h3>
                  <p className="text-gray-600">
                    This donor hasn't made any donations yet
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {history.map((d, index) => (
                    <div key={d.id} className="group relative overflow-hidden">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <div
                        className={`relative bg-white rounded-xl border-2 ${
                          editing?.id === d.id
                            ? "border-red-400 shadow-lg"
                            : "border-red-100"
                        } p-6 hover:shadow-lg transition-all duration-300`}
                      >
                        {editing?.id === d.id ? (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
                                <span className="text-red-500">✏️</span>
                                Edit Donation
                              </h3>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setEditing(null)}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={saveDonation}
                                  disabled={loading}
                                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium disabled:opacity-50 flex items-center gap-2"
                                >
                                  {loading ? (
                                    <>
                                      <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                        ></circle>
                                        <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                      </svg>
                                      Saving...
                                    </>
                                  ) : (
                                    "Save Changes"
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Edit Form */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Donation Date *
                                </label>
                                <input
                                  type="date"
                                  value={
                                    editing.date
                                      ? editing.date.split("T")[0]
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setEditing({
                                      ...editing,
                                      date: e.target.value,
                                    })
                                  }
                                  className="w-full p-3 bg-white border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-all"
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Amount (bags) *
                                </label>
                                <select
                                  value={editing.amount}
                                  onChange={(e) =>
                                    setEditing({
                                      ...editing,
                                      amount: e.target.value,
                                    })
                                  }
                                  className="w-full p-3 bg-white border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-all"
                                >
                                  <option value="0.5">0.5 bag</option>
                                  <option value="1">1 bag</option>
                                  <option value="1.5">1.5 bags</option>
                                  <option value="2">2 bags</option>
                                </select>
                              </div>

                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Location *
                                </label>
                                <input
                                  value={editing.location}
                                  onChange={(e) =>
                                    setEditing({
                                      ...editing,
                                      location: e.target.value,
                                    })
                                  }
                                  className="w-full p-3 bg-white border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-all"
                                  placeholder="Enter donation location"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                                    <span className="text-white text-2xl">
                                      🩸
                                    </span>
                                  </div>
                                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow border border-red-200">
                                    <span className="text-xs font-bold text-red-600">
                                      #{history.length - index}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 text-lg">
                                    Donation on{" "}
                                    {new Date(d.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      }
                                    )}
                                  </h3>
                                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                                    <span className="text-red-400">📍</span>
                                    {d.location}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-3xl font-bold text-red-600 mb-1">
                                  {d.amount}
                                </div>
                                <div className="text-sm text-gray-600">
                                  bag{d.amount > 1 ? "s" : ""}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <span>📅</span>
                                {new Date(d.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                              <div className="text-sm text-gray-600">
                                {Math.floor(
                                  (new Date() - new Date(d.date)) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                days ago
                              </div>
                            </div>

                            {/* Action Buttons - Beautiful Red & White Design */}
                            <div className="flex justify-between items-center pt-4 border-t border-red-100">
                              <div className="text-sm text-gray-500">
                                ID: {d.id.substring(0, 8)}...
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setEditing(d)}
                                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                                >
                                  <span className="text-lg">✏️</span>
                                  <span className="hidden sm:inline">Edit</span>
                                </button>
                                <button
                                  onClick={() => removeDonation(d.id)}
                                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                                >
                                  <span className="text-lg">🗑️</span>
                                  <span className="hidden sm:inline">
                                    Delete
                                  </span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-8 border-t border-red-100">
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 text-center">
            <h4 className="text-lg font-bold text-red-900 mb-3 flex items-center justify-center gap-3">
              <span className="text-red-600">⚠️</span>
              Important Information
            </h4>
            <p className="text-gray-700 mb-4">
              Deleting donation records is permanent and cannot be undone.
              Please double-check before deleting any records.
            </p>
            <div className="text-sm text-gray-600">
              <p>
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
