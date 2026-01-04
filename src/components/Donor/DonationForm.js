import { useState } from "react";
import { addDonation } from "../../api/api";




export default function DonationForm({ onSuccess }) {
  const [form, setForm] = useState({
    date: "",
    location: "",
    amount: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);




  const submit = async () => {
    if (!form.date || !form.location || !form.amount) {
      alert("Please fill in all required fields");
      return;
    }




    setIsSubmitting(true);
    try {
      await addDonation(form);
      alert("Donation recorded successfully! Thank you for your contribution.");
      onSuccess();
      setForm({ date: "", location: "", amount: 1 });
    } catch (err) {
      alert(err.response?.data?.message || "Unable to record donation. Please check eligibility requirements.");
    } finally {
      setIsSubmitting(false);
    }
  };




  const currentDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateFormatted = maxDate.toISOString().split('T')[0];




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8 mt-10">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mt-10">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-pink-100 to-transparent rounded-full opacity-15 animate-ping"></div>
      </div>




      <div className="max-w-2xl mx-auto relative z-10 mt-10">
        {/* Header Card */}
        {/* <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"> */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="relative">
              {/* <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl text-white">🩸</span>
              </div> */}
              {/* <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm">✓</span>
              </div> */}
            </div>
            <div className="text-center sm:text-left ml-10">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Record Blood Donation
              </h1>
              <p className="text-gray-600 mt-2">
                Fill out the form below to document your life-saving contribution
              </p>
            </div>
          </div>




          {/* Progress Indicator */}
          {/* <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4"> */}
            {/* <div className="bg-gradient-to-r from-red-500 to-red-600 h-2.5 rounded-full w-2/3"></div> */}
          {/* </div> */}
          {/* <div className="flex justify-between text-sm text-gray-500">
            <span className="font-medium text-red-600">Step 1: Fill Form</span>
            <span>Step 2: Review</span>
            <span>Step 3: Complete</span>
          </div> */}
        {/* </div> */}




        {/* Main Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
          {/* Form Fields */}
          <div className="space-y-8">
            {/* Donation Date */}
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <span className="text-red-600">📅</span>
                </div>
                <label className="block text-gray-800 font-semibold text-lg">
                  Donation Date <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full p-4 pl-12 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-300 text-gray-800"
                  min="2020-01-01"
                  max={currentDate}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {/* <p className="text-sm text-gray-500 mt-2 ml-1">
                Select the date of your donation
              </p> */}
            </div>




            {/* Location */}
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <span className="text-red-600">🏥</span>
                </div>
                <label className="block text-gray-800 font-semibold text-lg">
                  Hospital / Location <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter hospital or blood bank name"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full p-4 pl-12 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              {/* <p className="text-sm text-gray-500 mt-2 ml-1">
                e.g., Dhaka Medical College, Red Crescent Blood Bank
              </p> */}
            </div>




            {/* Amount */}
           <div className="group">
  <div className="flex items-center gap-2 mb-3">
    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
      <span className="text-red-600">⚖️</span>
    </div>
    <label className="block text-gray-800 font-semibold text-lg">
      Blood Amount (Bags) <span className="text-red-500">*</span>
    </label>
  </div>
  
  <div className="relative mb-4">
    <select
      value={form.amount}
      onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) })}
      className="w-full p-4 pl-12 bg-white border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
    >
      <option value="">Select amount...</option>
      <option value="0.5">0.5 bag (225ml)</option>
      <option value="1">1 bag (450ml) - Standard</option>
      <option value="1.5">1.5 bags (675ml)</option>
      <option value="2">2 bags (900ml)</option>
    </select>
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
    <div className="flex items-center gap-3">
      <div>
        <p className="font-medium text-gray-800">Standard donation is 1 bag (450ml)</p>
        <p className="text-sm text-gray-600 mt-1">Each bag can save up to 3 lives</p>
      </div>
    </div>
  </div>
</div>



            {/* Guidelines Card */}
            {/* <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow">
                  <span className="text-2xl text-red-600">⚠️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Important Guidelines</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-sm">1</span>
                  </div>
                  <p className="text-gray-700">Wait at least 3 months between donations</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-sm">2</span>
                  </div>
                  <p className="text-gray-700">Weight should be at least 50 kg</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-sm">3</span>
                  </div>
                  <p className="text-gray-700">Must be in good health condition</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-sm">4</span>
                  </div>
                  <p className="text-gray-700">Age between 18-65 years</p>
                </div>
              </div>
            </div> */}




            {/* Submit Button */}
            <button
              onClick={submit}
              disabled={!form.date || !form.location || !form.amount || isSubmitting}
              className="w-full group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
             
              {/* Main button */}
              <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-red-700 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🩸</span>
                    Record Donation & Save Lives
                    <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </>
                )}
              </div>
            </button>
          </div>




          {/* Footer note */}
          {/* <div className="mt-8 pt-8 border-t border-gray-200"> */}
            {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4"> */}
              {/* <div className="flex items-center gap-3"> */}
                {/* <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">❤️</span>
                </div> */}
                {/* <div>
                  <p className="font-medium text-gray-800">Your donation matters</p>
                  <p className="text-sm text-gray-600">Thank you for being a hero</p>
                </div> */}
              </div>
              {/* <div className="text-sm text-gray-500 text-center sm:text-right">
                <p>Need help? <a href="#" className="text-red-600 font-medium hover:text-red-700">Contact Support</a></p>
                <p className="text-xs mt-1">Response time: 24 hours</p>
              </div> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}




        {/* Success Stats */}
        {/* <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">450ml</div>
            <div className="text-gray-600">Per donation</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">3</div>
            <div className="text-gray-600">Lives saved per donation</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">90</div>
            <div className="text-gray-600">Days until next eligible</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}





