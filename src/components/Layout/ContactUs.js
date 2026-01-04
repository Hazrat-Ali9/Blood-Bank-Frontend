import { useState } from "react";
import { sendContactMessage } from "../../api/api";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendContactMessage(form);
      alert("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 pt-20 pb-20 px-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-to-r from-red-50 to-transparent rounded-full opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          {/* <div className="inline-block p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-white text-4xl">📞</span>
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            Contact <span className="text-red-600">BloodBank</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Card */}
          <div className="bg-gradient-to-br from-red-600 to-red-500 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              {/* <span className="bg-white text-red-600 p-2 rounded-lg">📍</span> */}
              Contact Information
            </h2>
            
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-red-700 bg-opacity-30 rounded-xl">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-red-100">Mirpur, Dhaka-1216, Bangladesh</p>
                </div>
              </div>

              {/* SMS Contact */}
              <div className="flex items-start gap-4 p-4 bg-red-700 bg-opacity-30 rounded-xl">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">SMS Service</h3>
                  <a 
                    href="sms:01582896328" 
                    className="text-red-100 hover:text-white transition-colors text-lg font-semibold"
                  >
                    01525252525
                  </a>
                  <p className="text-red-200 text-sm mt-1">(Only SMS - Available 24/7)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-red-700 bg-opacity-30 rounded-xl">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Address</h3>
                  <a 
                    href="mailto:infoprimebloodbank@rokto.com" 
                    className="text-red-100 hover:text-white transition-colors break-all"
                  >
                    infoprimebloodbank@rokto.com
                  </a>
                </div>
              </div>

              {/* Emergency */}
              <div className="mt-8 p-6 bg-white bg-opacity-20 rounded-xl border border-red-400">
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                  {/* <span className="animate-pulse">🚨</span> */}
                  Emergency Support
                </h3>
                <p className="text-red-100 mb-4">
                  For urgent blood requirements, contact our emergency helpline
                </p>
                <a 
                  href="tel:+8801234567890" 
                  className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-all shadow-lg"
                >
                  📞 +880 1234-567890
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <h2 className="text-2xl font-bold text-red-900 mb-2 flex items-center gap-3">
              {/* <span className="bg-red-100 text-red-600 p-2 rounded-lg">📝</span> */}
              Send us a Message
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="6"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Message...
                  </span>
                ) : (
                  "📨 Send Message"
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-center text-gray-500 text-sm mt-4">
                Your information is secure. We respect your privacy and never share your details.
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-red-100">
          <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">
            ❓ Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="font-bold text-red-800 mb-2">How quickly will I get a response?</h3>
              <p className="text-gray-700">We aim to respond to all messages within 24 hours. Emergency queries get immediate attention.</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="font-bold text-red-800 mb-2">Is the SMS service free?</h3>
              <p className="text-gray-700">Yes, our SMS service is completely free. Standard SMS charges from your operator may apply.</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="font-bold text-red-800 mb-2">Can I visit your office?</h3>
              <p className="text-gray-700">Yes, our office is open Monday to Friday, 9 AM to 5 PM. Appointment is recommended.</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="font-bold text-red-800 mb-2">How can I become a donor?</h3>
              <p className="text-gray-700">Visit our registration page or SMS "DONOR" to our number to start the registration process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}