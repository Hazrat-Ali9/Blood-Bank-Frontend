import { useEffect, useState } from "react";
import { getMyBloodRequests } from "../../api/api";

export default function BloodRequestHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getMyBloodRequests();
      setData(res.data);
    } catch (error) {
      console.error("Failed to load blood requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return '✅';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '❌';
      default:
        return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white text-4xl">🩸</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            My Blood Requests
          </h1>
          <p className="text-lg text-gray-600">
            Track the status of your blood donation requests
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{data.length}</div>
              <div className="text-sm text-red-100">Total Requests</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {data.filter(r => r.status.toLowerCase() === 'approved').length}
              </div>
              <div className="text-sm text-red-100">Approved</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-300 to-red-400 rounded-2xl p-6 text-white shadow-xl">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {data.filter(r => r.status.toLowerCase() === 'pending').length}
              </div>
              <div className="text-sm text-red-100">Pending</div>
            </div>
          </div>
        </div>

        {/* Request List */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading your requests...</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-red-400">📝</span>
              </div>
              <h3 className="text-xl font-bold text-red-900 mb-3">No Requests Yet</h3>
              <p className="text-gray-600 mb-8">You haven't made any blood requests yet</p>
              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all">
                Make Your First Request
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((r) => (
              <div 
                key={r.id} 
                className="group relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-red-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-2xl">🩸</span>
                        </div>
                        <div className={`absolute -top-2 -right-2 w-10 h-10 ${getStatusColor(r.status)} rounded-full flex items-center justify-center shadow-lg`}>
                          <span className="text-white text-sm">{getStatusIcon(r.status)}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Blood Group: <span className="text-red-600">{r.bloodGroup}</span>
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(r.status)}`}>
                            {r.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            Request ID: {r.id.substring(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Request Date</div>
                      <div className="text-lg font-medium text-gray-900">
                        {new Date(r.createdAt || r.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  {r.adminReply && (
                    <div className="mt-6 pt-6 border-t border-red-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600">💬</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span>Admin Response</span>
                            <span className="text-green-500">✓</span>
                          </h4>
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                            <p className="text-gray-800">{r.adminReply}</p>
                            <div className="text-sm text-gray-500 mt-2">
                              Replied on {new Date(r.updatedAt || new Date()).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Info (if available) */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {r.patientName && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">👤</span>
                        <div>
                          <div className="text-xs text-gray-500">Patient Name</div>
                          <div className="font-medium text-gray-900">{r.patientName}</div>
                        </div>
                      </div>
                    )}
                    
                    {r.hospitalName && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">🏥</span>
                        <div>
                          <div className="text-xs text-gray-500">Hospital</div>
                          <div className="font-medium text-gray-900">{r.hospitalName}</div>
                        </div>
                      </div>
                    )}
                    
                    {r.urgency && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">⚠️</span>
                        <div>
                          <div className="text-xs text-gray-500">Urgency</div>
                          <div className={`font-medium ${
                            r.urgency.toLowerCase() === 'high' ? 'text-red-600' : 
                            r.urgency.toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {r.urgency}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {r.requiredUnits && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">💉</span>
                        <div>
                          <div className="text-xs text-gray-500">Required Units</div>
                          <div className="font-medium text-gray-900">{r.requiredUnits} units</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Request Details */}
                  {r.details && (
                    <div className="mt-6 pt-6 border-t border-red-100">
                      <h4 className="font-bold text-gray-900 mb-3">Request Details</h4>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-800">{r.details}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-red-100 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date(r.updatedAt || r.createdAt || new Date()).toLocaleDateString()}
                    </div>
                    
                    {r.status.toLowerCase() === 'pending' && (
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium">
                          Cancel Request
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium">
                          Update
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
            <h4 className="text-lg font-bold text-red-900 mb-3">Need Help?</h4>
            <p className="text-gray-700 mb-4">
              If you have any questions about your blood requests, contact our support team
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}