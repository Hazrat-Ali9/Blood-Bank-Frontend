import { useEffect, useState } from "react";
import {
  getAllBloodRequests,
  adminReplyBloodRequest
} from "../../api/api";
// admin blood
export default function AdminBloodRequests() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState({
    status: "Approved",
    adminReply: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await getAllBloodRequests();
      setRequests(res.data);
    } catch (error) {
      console.error("Error loading requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitReply = async () => {
    if (!reply.adminReply.trim()) {
      alert("Please enter a reply message");
      return;
    }
    
    try {
      await adminReplyBloodRequest(selected.id, reply);
      setSelected(null);
      setReply({ status: "Approved", adminReply: "" });
      loadData();
      alert("Reply submitted successfully!");
    } catch (error) {
      alert("Failed to submit reply");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blood Requests Management</h1>
              <p className="text-gray-600 mt-2">Manage and respond to blood donation requests</p>
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-red-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Requests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{requests.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-red-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {requests.filter(r => r.status?.toLowerCase() === 'pending').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-red-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Approved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {requests.filter(r => r.status?.toLowerCase() === 'approved').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">All Blood Requests</h2>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">No blood requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bags</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Needed</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                            <span className="font-bold text-red-700">{r.bloodGroup}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{r.bloodGroup}</p>
                            {/* {r.reason && (
                              <p className="text-sm text-gray-500 truncate max-w-xs">{r.reason}</p>
                            )} */}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-700 font-medium">
                          {r.bags} Bag{r.bags > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-medium">
                          {new Date(r.neededDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        {r.createdAt && (
                          <div className="text-sm text-gray-500">
                            Requested: {new Date(r.createdAt).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {r.extraContact && (
                          <div className="text-gray-900">{r.extraContact}</div>
                        )}
                        {/* <div className="text-sm text-gray-500">Primary contact available</div> */}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(r.status)}`}>
                          {r.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelected(r);
                              setReply({
                                status: r.status || "Approved",
                                adminReply: r.adminReply || ""
                              });
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Reply
                          </button>
                          <button
                            onClick={() => setSelected(r)}
                            className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Reply to Request</h3>
              <p className="text-gray-600 text-sm mt-1">
                {selected.bloodGroup} • {selected.bags} bag(s) • {new Date(selected.neededDate).toLocaleDateString()}
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Update Status</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setReply({...reply, status: "Approved"})}
                    className={`px-4 py-3 rounded-lg border-2 text-center transition-colors ${
                      reply.status === "Approved" 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-green-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Approve
                    </div>
                  </button>
                  <button
                    onClick={() => setReply({...reply, status: "Rejected"})}
                    className={`px-4 py-3 rounded-lg border-2 text-center transition-colors ${
                      reply.status === "Rejected" 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-gray-200 hover:border-red-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Reject
                    </div>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Reply Message</label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition resize-none min-h-[120px]"
                  placeholder="Enter your reply message here..."
                  value={reply.adminReply}
                  onChange={(e) => setReply({ ...reply, adminReply: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">This message will be sent to the requester</p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelected(null);
                    setReply({ status: "Approved", adminReply: "" });
                  }}
                  className="px-5 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReply}
                  disabled={!reply.adminReply.trim()}
                  className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                    !reply.adminReply.trim()
                      ? 'bg-red-300 cursor-not-allowed text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  Submit Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}