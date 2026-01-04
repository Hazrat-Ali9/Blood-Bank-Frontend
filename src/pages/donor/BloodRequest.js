import { useState } from "react";
import { createBloodRequest } from "../../api/api";

export default function BloodRequest() {
  const [form, setForm] = useState({
    bloodGroup: "",
    bags: 1,
    neededDate: "",
    extraContact: "",
    reason: ""
  });

  const submit = async () => {
    await createBloodRequest(form);
    alert("Blood request submitted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section with Icon */}
        <div className="text-center mb-10">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl shadow-lg mb-6 border border-red-200">
            <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div> */}
           <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
            Place a Blood Request
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            Need blood? Place a request to get SMS notifications from potential donors.
          </p>
        </div>

        {/* Form Card with Glass Effect */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-100/50 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="space-y-8">
              
              {/* Blood Group - Elegant Select */}
              <div className="group">
                <label className="block text-gray-800 font-semibold mb-3 text-lg">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    onChange={e => setForm({...form, bloodGroup: e.target.value})}
                    className="w-full px-5 py-4 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 appearance-none cursor-pointer group-hover:border-red-300"
                  >
                    <option value="" className="text-gray-400">Select your blood group</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Number of Bags - Modern Input */}
              <div className="group">
                <label className="block text-gray-800 font-semibold mb-3 text-lg">
                  Number of Bags <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={form.bags}
                    min="1"
                    onChange={e => setForm({...form, bags: e.target.value})}
                    className="w-full px-5 py-4 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 appearance-none group-hover:border-red-300"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    Bag{form.bags > 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {/* Date Input - Styled */}
              <div className="group">
                <label className="block text-gray-800 font-semibold mb-3 text-lg">
                  When Needed? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="date"
                    onChange={e => setForm({...form, neededDate: e.target.value})}
                    className="w-full px-5 py-4 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 appearance-none group-hover:border-red-300"
                  />
                  {/* <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div> */}
                </div>
              </div>

              {/* Extra Contact - Beautiful Textarea */}
              <div className="group">
                <label className="block text-gray-800 font-semibold mb-3 text-lg">
                  Extra Contact Number
                </label>
                <div className="relative">
                  <textarea 
                    placeholder="Optional: Provide an additional contact number"
                    onChange={e => setForm({...form, extraContact: e.target.value})}
                    value={form.extraContact}
                    className="w-full px-5 py-4 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 resize-none min-h-[120px] group-hover:border-red-300"
                  />
                  {/* <div className="absolute left-4 top-4 text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div> */}
                </div>
              </div>

              {/* Reason Textarea */}
              <div className="group">
                <label className="block text-gray-800 font-semibold mb-3 text-lg">
                  Why is Blood Needed? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea 
                    placeholder="Please provide details about why blood is required"
                    onChange={e => setForm({...form, reason: e.target.value})}
                    value={form.reason}
                    className="w-full px-5 py-4 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 resize-none min-h-[150px] group-hover:border-red-300"
                  />
                  {/* <div className="absolute left-4 top-4 text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div> */}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  onClick={submit} 
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-lg py-5 px-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Blood Request
                  </span>
                </button>
              </div>

            </div>
          </div>
          
          {/* Form Footer */}
          <div className="bg-gradient-to-r from-red-50 to-white/50 border-t border-red-100/30 px-8 sm:px-10 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">All marked fields (*) are required</span>
              </div>
              <div className="text-sm text-gray-500">
                <span className="hidden sm:inline">Need immediate help? </span>
                <span className="font-semibold text-red-600">+880 1234-567890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message Area (Hidden until needed) */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 text-gray-600 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-red-100">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Your request will reach hundreds of donors in your area</span>
          </div>
        </div>
      </div>
    </div>
  );
}