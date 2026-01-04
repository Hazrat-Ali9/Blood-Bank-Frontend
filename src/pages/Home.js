import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-3 mb-4 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                {/* <span className="animate-pulse">❤️</span> */}
                <span className="font-medium">Save Lives Today</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                SMS-based platform to connect blood searchers with donors
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                BloodBank is a real-time free platform to help blood searchers connect with voluntary blood donors around Bangladesh.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-white text-red-600 px-8 py-4 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                >
                 Join as a Donor
                </Link>
                <Link
                  to="/search"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 font-bold rounded-xl hover:bg-white hover:text-red-600 transition-all duration-300 text-lg"
                >
                  Search Donors
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">1,000+</div>
                  <div className="text-sm opacity-80">Lives Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2,500+</div>
                  <div className="text-sm opacity-80">Active Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">64</div>
                  <div className="text-sm opacity-80">Districts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Service</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-red-600 rounded-3xl blur-xl opacity-30"></div>
                <div className="relative bg-gradient-to-br from-white to-red-100 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="inline-block p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6">
                      <span className="text-white text-5xl">🩸</span>
                    </div>
                    <h3 className="text-2xl font-bold text-red-900 mb-4">Emergency Blood Need?</h3>
                    <div className="bg-red-50 rounded-xl p-4 mb-4">
                      <div className="text-3xl font-bold text-red-600 mb-1">+880 1234-567890</div>
                      <p className="text-gray-600 text-sm">24/7 Emergency Helpline</p>
                    </div>
                    <p className="text-gray-700">
                      SMS "HELP" to 01582896328 or use our website
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              {/* <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-red-500 text-2xl">🚑</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-red-500 text-xl">💖</span>
              </div> */}
            </div>
          </div>
        </div>
        
        {/* Background shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>
      </section>

      {/* What is BloodBank Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 mb-2">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">❓</span>
                </div> */}
                <h2 className="text-3xl md:text-4xl font-bold text-red-900">What is BloodBank?</h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                BloodBank is an automated blood service that connects blood searchers with voluntary donors instantly through SMS. 
                Our platform is <span className="font-bold text-red-600">always a free service</span> for everyone in Bangladesh.
              </p>
              
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border-l-4 border-red-500">
                <p className="text-gray-700 italic">
                  "We believe no one should die due to lack of blood. Technology and compassion together can save lives."
                </p>
              </div>
              
              <h3 className="text-2xl font-bold text-red-800 mt-8 mb-6">Why Choose BloodBank?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  {/* <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600">🤖</span>
                  </div> */}
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">100% Automated</h4>
                    <p className="text-gray-700 text-sm">Instant matching without delays</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  {/* <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600">💸</span>
                  </div> */}
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">Always Free</h4>
                    <p className="text-gray-700 text-sm">No charges for any service</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  {/* <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600">⏰</span>
                  </div> */}
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">24×7 Service</h4>
                    <p className="text-gray-700 text-sm">Available round the clock</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  {/* <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600">🔒</span>
                  </div> */}
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">Fully Secured</h4>
                    <p className="text-gray-700 text-sm">Your data is protected</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Network Stats Card */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">We're a Network of</h3>
                <p className="opacity-90">Connecting lifesavers across Bangladesh</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl md:text-5xl font-bold mb-2">1,113</div>
                  <div className="text-lg font-medium">Active Donors</div>
                </div>
                <div className="text-center bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl md:text-5xl font-bold mb-2">64</div>
                  <div className="text-lg font-medium">Districts Covered</div>
                </div>
                <div className="text-center bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl md:text-5xl font-bold mb-2">8</div>
                  <div className="text-lg font-medium">Blood Groups</div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-red-400">
                <p className="text-center text-red-100">
                  📍 Serving all 64 districts of Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 mb-2">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🏢</span>
                </div> */}
                <h2 className="text-3xl md:text-4xl font-bold text-red-900">About Us</h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                BloodBank is an automated blood service initiative that connects blood searchers with voluntary 
                blood donors instantly through SMS. We are a not-for-profit organization dedicated to promoting 
                voluntary blood donation awareness across Bangladesh.
              </p>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
                <h3 className="font-bold text-red-800 mb-3 text-lg">Our Mission</h3>
                <p className="text-gray-700">
                  Ensuring <span className="font-bold text-red-600">no one suffers</span> due to lack of blood availability.
                  Every drop counts in saving a life.
                </p>
              </div>
              
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 font-bold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                Learn More
              </Link>
            </div>
            
            {/* Impact Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">📈</span>
                </div> */}
                <h3 className="text-2xl font-bold text-red-900">Our Impact</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-red-600">❤️</span>
                    </div> */}
                    <div>
                      <div className="font-semibold text-gray-800">Lives Saved</div>
                      <div className="text-sm text-gray-600">Since 2025</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-red-600">500+</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-red-600">🤝</span>
                    </div> */}
                    <div>
                      <div className="font-semibold text-gray-800">Successful Matches</div>
                      <div className="text-sm text-gray-600">Donor to Recipient</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-red-600">1,200+</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-red-600">👥</span>
                    </div> */}
                    <div>
                      <div className="font-semibold text-gray-800">Active Volunteers</div>
                      <div className="text-sm text-gray-600">Community Support</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-red-600">250+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three simple steps to connect donors with those in need. Saving lives has never been easier.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-red-500">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-white text-3xl">1</span>
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-4 text-center">Register as Donor</h3>
                <p className="text-gray-700 text-center">
                  Join our community of lifesavers by registering as a voluntary blood donor. Your information helps save lives instantly.
                </p>
                <div className="mt-6 text-center">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    Register Now <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-red-500">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-white text-3xl">2</span>
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-4 text-center">Request Blood</h3>
                <p className="text-gray-700 text-center">
                  Quickly find matching blood donors near you during emergencies using our SMS-based platform or website.
                </p>
                <div className="mt-6 text-center">
                  <Link
                    to="/search"
                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    Search Now <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-red-500">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-white text-3xl">3</span>
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-4 text-center">Save Lives</h3>
                <p className="text-gray-700 text-center">
                  Connect with donors, receive help, and help us spread awareness about safe blood donation practices.
                </p>
                <div className="mt-6 text-center">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    Learn More <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            {/* <div className="inline-block p-4 bg-white bg-opacity-20 rounded-2xl mb-6">
              <span className="text-4xl">🚀</span>
            </div> */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Save Lives?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
              Join thousands of lifesavers today and make a real difference in someone's life. Every donation counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="bg-white text-red-600 px-10 py-4 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg flex items-center justify-center gap-3"
              >
                 Become a Donor
              </Link>
              <Link
                to="/search"
                className="bg-transparent border-2 border-white text-white px-10 py-4 font-bold rounded-xl hover:bg-white hover:text-red-600 transition-all duration-300 text-lg flex items-center justify-center gap-3"
              >
                 Find Donors Now
              </Link>
            </div>
            
            {/* Emergency Contact */}
            <div className="mt-12 pt-8 border-t border-red-400">
              <p className="mb-4 text-lg">🚨 For Emergency Blood Requirements</p>
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-red-700 bg-opacity-30 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">📱 SMS Service</div>
                  <div className="text-xl">01525252525</div>
                </div>
                <div className="h-12 w-px bg-red-400 hidden sm:block"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">📞 Emergency Helpline</div>
                  <div className="text-xl">+880 1234-567890</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}