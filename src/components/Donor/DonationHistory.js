import { useEffect, useState } from "react";
import { getMyDonations } from "../../api/api";

export default function DonationHistory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getMyDonations();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-white via-red-50 to-white rounded-3xl shadow-2xl border-2 border-red-100/50 p-8 backdrop-blur-sm mt-10">
        <div className="flex flex-col items-center justify-center h-full py-16">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl text-red-500 animate-pulse">🩸</span>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-6 text-lg">Loading your heroic journey...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching your life-saving records</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-white via-red-50 to-white rounded-3xl shadow-2xl border-2 border-red-100/50 p-8 backdrop-blur-sm mt-10">
        <div className="flex flex-col items-center justify-center h-full py-12">
          <div className="relative mb-8">
            <div className="w-28 h-28 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-5xl text-red-400">🩸</span>
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-red-200">
              <span className="text-2xl text-red-500">⚠️</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-red-900 mb-3">Couldn't Load Your History</h3>
          <p className="text-gray-600 mb-8 max-w-md text-center">
            We're having trouble loading your donation records. This might be a temporary issue.
          </p>
          <button 
            onClick={load}
            className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-3">
              <span className="text-xl">🔄</span>
              Refresh History
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[500px] bg-gradient-to-br from-white via-red-50 to-white rounded-3xl shadow-2xl border-2 border-red-100/50 p-6 sm:p-8 backdrop-blur-sm mt-10">
      {/* Header with animated gradient */}
      <div className="relative mb-8 overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-50 animate-pulse"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🩸</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-red-600">{data.totalDonations}</span>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold">My Donations</h3>
              <p className="text-red-100 opacity-90 mt-1">Your life-saving journey</p>
            </div>
          </div>
        
        </div>
      </div>

      {/* Stats Cards with hover effects */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Total Donations</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{data.totalDonations}</p>
              </div>
              {/* <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-red-600">🏆</span>
              </div> */}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Each donation saves up to 3 lives
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Last Donation</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  {data.lastDonationDate
                    ? new Date(data.lastDonationDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : "N/A"}
                </p>
              </div>
             
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {data.lastDonationDate ? 
                `${Math.floor((new Date() - new Date(data.lastDonationDate)) / (1000 * 60 * 60 * 24))} days ago` : 
                "No donations yet"}
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Next Available</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  {data.nextAvailableDate
                    ? new Date(data.nextAvailableDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : "N/A"}
                </p>
              </div>              
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {data.nextAvailableDate ? "Eligible date" : "Check your status"}
            </div>
          </div>
        </div>
      </div>

      {/* Donation List with enhanced design */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-bold text-red-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
              <span className="text-red-600 text-lg">📋</span>
            </div>
            Donation Records
          </h4>
          <span className="text-sm text-gray-500 bg-red-50 px-3 py-1 rounded-full">
            {data.donations?.length || 0} records
          </span>
        </div>

        <div className="space-y-4">
          {data.donations && data.donations.length > 0 ? (
            data.donations.map((d, index) => (
              <div 
                key={d.id} 
                className="group relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-red-100">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-2xl">🩸</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow border border-red-200">
                          <span className="text-xs font-bold text-red-600">#{index + 1}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {new Date(d.date).toDateString()}
                        </h4>
                        <p className="text-gray-600 mt-2 flex items-center gap-2">
                          <span className="text-red-400">📍</span>
                          {d.location || "N/A"}
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium">
                            {d.amount} bag{d.amount > 1 ? 's' : ''}
                          </span>
                          <span className="text-sm text-gray-500">
                            ≈ {d.amount * 450}ml of blood
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:text-right">
                      <div className="mb-2">
                        <div className="text-3xl font-bold text-red-600">
                          {d.amount * 3}
                        </div>
                        <div className="text-sm text-gray-500">Estimated lives saved</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(d.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-red-200">
                <span className="text-4xl text-red-300">🎯</span>
              </div>
              <h4 className="text-xl font-medium text-red-900 mb-3">Start Your Heroic Journey</h4>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't made any donations yet. Your first donation can save up to 3 lives!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer with impact message */}
      {/* <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow">
              <span className="text-2xl text-red-600">❤️</span>
            </div>
            <div>
              <h5 className="font-bold text-gray-900">Your Impact Matters</h5>
              <p className="text-gray-600 text-sm">
                Every donation counts in saving lives
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-red-600">{data.totalDonations * 3}</div>
            <div className="text-sm text-gray-500">Lives potentially saved</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}