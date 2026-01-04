import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 pt-20 pb-20">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-to-r from-red-50 to-transparent rounded-full opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* <div className="inline-block p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-white text-5xl">❤️</span>
          </div> */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-900 mb-4">
            About <span className="text-red-600">BloodBank</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Know about BloodBank. What, how, and why we're dedicated to saving lives.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Introduction Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
              <div className="flex items-center gap-4 mb-6">
                {/* <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🩸</span>
                </div> */}
                <h2 className="text-3xl font-bold text-red-900">Our Story</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                <span className="font-bold text-red-600">BloodBank</span> is an automated blood service platform that connects blood searchers with voluntary blood donors instantly through SMS and our website. 
                As a completely free service, we're committed to making blood donation accessible to everyone in Bangladesh.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500">
                <p className="text-gray-700 italic">
                  "Started in 2025, BloodBank has grown into a nationwide network of lifesavers, proving that technology and compassion can work together to save lives."
                </p>
              </div>
            </div>

            {/* Why BloodBank Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
              <div className="flex items-center gap-4 mb-6">
                {/* <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🤝</span>
                </div> */}
                <h2 className="text-3xl font-bold text-red-900">Why BloodBank?</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                With over 160 million people, Bangladesh faces a critical shortage of safe blood banks, especially outside divisional towns. 
                Every day, countless lives depend on immediate blood availability for accidents, surgeries, and medical treatments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2"> SMS Accessibility</h4>
                  <p className="text-gray-700">Service is accessible via SMS, reaching even those without internet access.</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2"> Nationwide Coverage</h4>
                  <p className="text-gray-700">Connecting donors and recipients across all 64 districts of Bangladesh.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Vision & Mission Cards */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vision */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">🎯</span>
                    </div> */}
                    <h3 className="text-2xl font-bold text-red-900">Vision</h3>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
                    <p className="text-lg text-gray-700 font-medium">
                      Ensuring <span className="text-red-600 font-bold">no more deaths</span> just for the need of blood.
                    </p>
                  </div>
                </div>

                {/* Mission */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">🚩</span>
                    </div> */}
                    <h3 className="text-2xl font-bold text-red-900">Mission</h3>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
                    <p className="text-lg text-gray-700 font-medium">
                      Connecting blood searchers with voluntary donors instantly using technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Objectives Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
              <div className="flex items-center gap-4 mb-6">
                {/* <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">👥</span>
                </div> */}
                <h2 className="text-3xl font-bold text-red-900">Our Objectives</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">Encourage Voluntary Donation</h4>
                    <p className="text-gray-700">Promoting the culture of voluntary blood donation across Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">Ensure Safe Blood Transfer</h4>
                    <p className="text-gray-700">Creating awareness about safe blood donation and transfer practices</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">Multi-platform Accessibility</h4>
                    <p className="text-gray-700">Enabling blood requests via SMS, website, and social media platforms</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">Instant Connection</h4>
                    <p className="text-gray-700">Connecting voluntary blood donors with recipients through SMS and email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">1,000+</div>
              <div className="text-lg">Lives Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">2,500+</div>
              <div className="text-lg">Active Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">64</div>
              <div className="text-lg">Districts Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg">Service Available</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of lifesavers in our mission to ensure no one dies due to lack of blood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-600 transition-all duration-300"
            >
              Become a Donor
            </a>
            <a
              href="/contact"
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-red-50 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}