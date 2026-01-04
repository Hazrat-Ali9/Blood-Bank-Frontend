import { FaHeartbeat, FaHandsHelping, FaUserMd, FaWater, FaUtensils, FaFirstAid, FaBed, FaFileMedical, FaExclamationTriangle, FaShieldAlt, FaWineBottle, FaCalendarAlt } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa"; // correct icon

export default function SafetyGuidelinesPage() {
  const guidelines = [
    {
      icon: <FaHeartbeat className="text-2xl" />,
      title: "Health Check",
      description: "Always check your health status before donating blood.",
      color: "from-red-100 to-red-50",
      borderColor: "border-red-400"
    },
    {
      icon: <FaWater className="text-2xl" />,
      title: "Stay Hydrated",
      description: "Drink plenty of water and eat a healthy meal before donation.",
      color: "from-blue-100 to-blue-50",
      borderColor: "border-blue-400"
    },
    {
      icon: <FaTshirt className="text-2xl" />,
      title: "Comfortable Clothing",
      description: "Wear comfortable clothing with sleeves that can be rolled up.",
      color: "from-purple-100 to-purple-50",
      borderColor: "border-purple-400"
    },
    {
      icon: <FaFileMedical className="text-2xl" />,
      title: "Medical Disclosure",
      description: "Inform staff if you have any medical conditions or medications.",
      color: "from-green-100 to-green-50",
      borderColor: "border-green-400"
    },
    {
      icon: <FaBed className="text-2xl" />,
      title: "Post-Donation Rest",
      description: "Rest and avoid strenuous activities after donation.",
      color: "from-orange-100 to-orange-50",
      borderColor: "border-orange-400"
    },
    {
      icon: <FaHandsHelping className="text-2xl" />,
      title: "Follow Instructions",
      description: "Follow all instructions provided by medical staff.",
      color: "from-cyan-100 to-cyan-50",
      borderColor: "border-cyan-400"
    },
    {
      icon: <FaExclamationTriangle className="text-2xl" />,
      title: "Report Symptoms",
      description: "Report any unusual symptoms immediately.",
      color: "from-yellow-100 to-yellow-50",
      borderColor: "border-yellow-400"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Maintain Hygiene",
      description: "Maintain hygiene and wear a mask if required.",
      color: "from-teal-100 to-teal-50",
      borderColor: "border-teal-400"
    },
    {
      icon: <FaCalendarAlt className="text-2xl" />,
      title: "Keep Records",
      description: "Keep a record of your last donation date.",
      color: "from-pink-100 to-pink-50",
      borderColor: "border-pink-400"
    },
    {
      icon: <FaWineBottle className="text-2xl" />,
      title: "Avoid Alcohol",
      description: "Avoid alcohol consumption 24 hours before donation.",
      color: "from-indigo-100 to-indigo-50",
      borderColor: "border-indigo-400"
    }
  ];

  const preparationSteps = [
    {
      step: "1",
      title: "Before Donation",
      items: ["Get adequate sleep", "Eat iron-rich foods", "Drink extra fluids", "Avoid fatty foods"]
    },
    {
      step: "2",
      title: "During Donation",
      items: ["Relax and breathe normally", "Inform staff of discomfort", "Squeeze stress ball", "Stay calm and composed"]
    },
    {
      step: "3",
      title: "After Donation",
      items: ["Rest for 10-15 minutes", "Eat provided snacks", "Drink extra fluids", "Avoid heavy lifting"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 pt-24 pb-16 px-4 md:px-6">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-15"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-red-50 to-transparent rounded-full opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 shadow-xl">
            <FaUserMd className="text-3xl text-white" />
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            Blood Donation Safety Guidelines
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your safety is our priority. Follow these comprehensive guidelines to ensure 
            a safe, comfortable, and successful blood donation experience.
          </p>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 md:p-10 mb-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                {/* <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <FaHeartbeat className="text-2xl" />
                </div> */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Safety First, Always</h2>
                  <p className="opacity-90">Every precaution matters for donor well-being</p>
                </div>
              </div>
              <p className="text-lg opacity-90">
                Blood donation is completely safe when proper guidelines are followed. 
                Our medical team ensures your safety at every step of the process.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <div className="text-2xl font-bold mb-2">⏱️ Donation Time</div>
              <div className="text-4xl font-bold mb-1">10-15</div>
              <div className="opacity-90">Minutes Only</div>
            </div>
          </div>
        </div>

        {/* Guidelines Grid */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
              <FaHandsHelping className="text-xl text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Essential Guidelines</h2>
              <p className="text-gray-600">Follow these 10 key safety rules</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {guidelines.map((guide, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${guide.color} border-l-4 ${guide.borderColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div className="flex flex-col items-start h-full">
                  <div className="mb-4 p-3 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <div className="text-red-600">
                      {guide.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-red-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 w-full">
                    <span className="text-sm text-gray-500 font-medium">
                      Guideline #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Timeline */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <FaCalendarAlt className="text-xl text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Donation Timeline</h2>
              <p className="text-gray-600">What to do before, during, and after</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preparationSteps.map((step, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-6 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                  index === 0 
                    ? "bg-gradient-to-br from-red-50 to-white border-red-200" 
                    : index === 1 
                    ? "bg-gradient-to-br from-blue-50 to-white border-blue-200"
                    : "bg-gradient-to-br from-green-50 to-white border-green-200"
                }`}
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  style={{
                    background: index === 0 
                      ? "linear-gradient(135deg, #ef4444, #dc2626)" 
                      : index === 1 
                      ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                      : "linear-gradient(135deg, #10b981, #059669)"
                  }}
                >
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {step.title}
                </h3>
                <ul className="space-y-3">
                  {step.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                        index === 0 ? "bg-red-500" : index === 1 ? "bg-blue-500" : "bg-green-500"
                      }`}>
                        ✓
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className={`text-sm font-semibold ${
                    index === 0 ? "text-red-600" : index === 1 ? "text-blue-600" : "text-green-600"
                  }`}>
                    {index === 0 ? "🕐 Recommended: Night before" : 
                     index === 1 ? "🕑 During procedure" : 
                     "🕒 First 24 hours after"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                <FaFirstAid className="text-2xl" />
              </div> */}
              <h2 className="text-3xl font-bold mb-4">Eligibility Check</h2>
              <p className="text-lg opacity-90 mb-6">
                Before donating, ensure you meet these basic eligibility criteria
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Age: 18-65 years</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Weight: Minimum 50 kg</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Hemoglobin: 12.5 g/dL minimum</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span>Good general health</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">4</div>
                <div className="text-xl font-semibold mb-4">Basic Requirements</div>
                <p className="opacity-80">
                  Our medical team will conduct a thorough health screening before donation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How often can I donate blood?",
                a: "You can donate whole blood every 56 days (approximately 8 weeks)."
              },
              {
                q: "Is blood donation painful?",
                a: "Most donors feel only a slight pinch during needle insertion."
              },
              {
                q: "How much blood is taken?",
                a: "Approximately 450-500 ml (about one pint) is collected."
              },
              {
                q: "Can I donate if I have a cold?",
                a: "No, wait until you're symptom-free for at least 48 hours."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:border-red-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold">?</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">{faq.q}</h4>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-white to-red-50 rounded-3xl p-10 border-2 border-red-100 shadow-lg">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 shadow-xl">
            <FaHandsHelping className="text-3xl text-white" />
          </div> */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your safe donation can save up to 3 lives. Follow these guidelines and 
            join our community of life-savers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-600 transition-all duration-300">
            <a href="/search">Find a Donation Center</a>
            </button>
            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl border-2 border-red-200 hover:border-red-300 transition-all duration-300">
              Download Safety Guide
            </button>
          </div>
          <p className="mt-8 text-gray-500 text-sm">
            Remember: Your safety is our top priority. Always consult with medical professionals.
          </p>
        </div>
      </div>
    </div>
  );
}