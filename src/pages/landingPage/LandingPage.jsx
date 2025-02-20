import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 text-gray-900">
          {/* Hero Section */}
          <section className="h-[100vh] bg-white text-gray-800 flex flex-col items-center justify-center text-center py-20 px-5">
            <h1 className="text-4xl font-bold">AI-Powered Customer Support SaaS</h1>
            <p className="mt-4 text-lg">Automate complaint classification, prioritization & response. Reduce costs, improve efficiency.</p>
            <button onClick={() => navigate("/signup")} className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md">Get Started</button>
          </section>
    
          {/* Why Choose Us? */}
          <section className="py-20 px-5 text-center">
            <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-bold">Multi-Industry Support</h3>
                <p>Works with E-commerce, Banking, Education, Healthcare, Factories.</p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-bold">AI-Powered Automation</h3>
                <p>Automatically classify & prioritize complaints using AI.</p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-bold">Multi-Channel Integration</h3>
                <p>Support complaints from Email, WhatsApp, CRM, Web Forms.</p>
              </div>
            </div>
          </section>
    
          {/* How It Works */}
          <section className="bg-gray-200 py-20 px-5 text-center">
            <h2 className="text-3xl font-semibold">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-bold">Step 1: Connect</h3>
                <p>Integrate your email, WhatsApp, or CRM with our system.</p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-bold">Step 2: AI Processing</h3>
                <p>Our AI automatically classifies, prioritizes, and routes complaints.</p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-bold">Step 3: Resolution</h3>
                <p>Track, manage, and resolve complaints efficiently.</p>
              </div>
            </div>
          </section>
    
          {/* Pricing Section */}
          <section className="py-20 px-5 text-center">
            <h2 className="text-3xl font-semibold">Pricing Plans</h2>
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              {[
                { title: "Free", price: "$0/mo", features: ["50 complaints", "Web Form Only"] },
                { title: "Starter", price: "$49/mo", features: ["500 complaints", "Email & Web Form"] },
                { title: "Pro", price: "$199/mo", features: ["5,000 complaints", "AI Prioritization"] },
                { title: "Enterprise", price: "Custom", features: ["Unlimited complaints", "Full AI Automation"] }
              ].map((plan, index) => (
                <div key={index} className="p-6 bg-white shadow-md rounded-lg">
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <p className="text-2xl font-semibold mt-2">{plan.price}</p>
                  <ul className="mt-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-gray-700">✅ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
    
          {/* Call to Action */}
          <section className="bg-blue-600 text-white text-center py-20 px-5">
            <h2 className="text-3xl font-semibold">Start Automating Your Customer Support Today</h2>
            <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md">Sign Up Now</button>
          </section>
    
          {/* Footer */}
          <footer className="bg-gray-800 text-white text-center py-6">
            <p>&copy; 2025 AI Support SaaS. All rights reserved.</p>
          </footer>
        </div>
      );
}

export default LandingPage  