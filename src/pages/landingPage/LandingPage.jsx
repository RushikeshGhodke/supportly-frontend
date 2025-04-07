import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LandingNavbar from "../../components/LandingNavbar";
import { FiCheckCircle, FiLayers, FiZap, FiMail, FiMessageSquare, FiBarChart } from "react-icons/fi";
import Button from "../../components/ui/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="min-h-screen pt-20 pb-24 px-4 flex flex-col items-center justify-center text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Automate Your Customer Support With AI
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            AI-powered complaint management that classifies, prioritizes, and resolves customer issues automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="shadow-lg"
            >
              Start Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiLayers />}
              title="Multi-Industry Support"
              description="Works seamlessly with E-commerce, Banking, Education, Healthcare, and Manufacturing industries."
            />
            <FeatureCard
              icon={<FiZap />}
              title="AI-Powered Classification"
              description="Automatically categorize and prioritize complaints using machine learning algorithms."
            />
            <FeatureCard
              icon={<FiMessageSquare />}
              title="Multi-Channel Support"
              description="Integrate with Email, WhatsApp, CRM systems, and Web Forms for unified complaint handling."
            />
            <FeatureCard
              icon={<FiBarChart />}
              title="Advanced Analytics"
              description="Get detailed insights into complaint patterns and response effectiveness."
            />
            <FeatureCard
              icon={<FiMail />}
              title="Automated Responses"
              description="Send immediate acknowledgments and follow-ups based on complaint type."
            />
            <FeatureCard
              icon={<FiCheckCircle />}
              title="Resolution Tracking"
              description="Monitor complaint status from submission to resolution with detailed timelines."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Free"
              price="$0"
              period="per month"
              features={[
                "Up to 50 complaints",
                "Web Form Integration",
                "Basic Complaint Management",
                "Email Notifications",
                "1 User Account"
              ]}
              buttonText="Get Started"
              onClick={() => navigate("/signup?plan=free")}
            />
            <PricingCard
              title="Business"
              price="$49"
              period="per month"
              popular={true}
              features={[
                "Up to 500 complaints",
                "Web Form & Email Integration",
                "AI-Based Categorization",
                "Priority Support",
                "5 User Accounts"
              ]}
              buttonText="Start 14-Day Trial"
              onClick={() => navigate("/signup?plan=business")}
            />
            <PricingCard
              title="Enterprise"
              price="$199"
              period="per month"
              features={[
                "Unlimited complaints",
                "All Channel Integration",
                "Advanced AI Processing",
                "Custom Reporting & Analytics",
                "Unlimited User Accounts"
              ]}
              buttonText="Contact Sales"
              onClick={() => navigate("/contact")}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0061A1] text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your customer support?</h2>
          <p className="text-xl mb-8">Join thousands of businesses using AI Support to provide exceptional customer service.</p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/signup")}
            className="bg-white text-[#0061A1] hover:bg-gray-100 shadow-lg"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">AI Support</h3>
              <p className="text-gray-400 mt-2">© 2025 AI Support. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
    <div className="text-[#0061A1] text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Pricing Card Component
const PricingCard = ({ title, price, period, features, buttonText, onClick, popular = false }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${popular ? 'border-2 border-[#0061A1] relative' : ''}`}>
    {popular && (
      <div className="bg-[#0061A1] text-white text-xs font-bold uppercase py-1 text-center">
        Most Popular
      </div>
    )}
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-gray-500 ml-1">{period}</span>
      </div>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={popular ? "primary" : "secondary"}
        fullWidth
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  </div>
);

export default LandingPage;