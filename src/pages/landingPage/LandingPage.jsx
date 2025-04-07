import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LandingNavbar from "../../components/LandingNavbar";
import { FiCheckCircle, FiLayers, FiZap, FiMail, FiMessageSquare, FiBarChart, FiArrowRight, FiCheck, FiStar } from "react-icons/fi";
import Button from "../../components/ui/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  // Add this useEffect near the top of your component
  useEffect(() => {
    // Implement smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for navbar height
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      // Cleanup
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

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

          {/* Annual/Monthly toggle */}
          <div className="mt-6 flex justify-center mb-12">
            <div className="relative bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                className="px-4 py-2 rounded-md text-sm font-medium bg-white shadow-sm text-gray-900"
                onClick={() => { }}
              >
                Monthly
              </button>
              <button
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                onClick={() => { }}
              >
                Annual <span className="text-xs text-green-600 font-bold">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="mt-12 grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">Free</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">₹0</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="mt-3 text-sm text-gray-500">Perfect for small businesses just getting started</p>

                <Button
                  onClick={() => navigate("/signup?plan=free")}
                  variant="secondary"
                  className="mt-6 w-full"
                >
                  Get Started
                  <FiArrowRight className="ml-2" />
                </Button>
              </div>

              <div className="px-6 pt-4 pb-8 bg-gray-50">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  What's included
                </h4>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Up to 50 complaints per month</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Basic web form integration</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Email notifications</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">1 user account</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">7-day data retention</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 relative ring-2 ring-[#0061A1] transform scale-105 z-10">
              <div className="absolute top-0 right-0 bg-[#0061A1] text-white py-1 px-3 rounded-bl-lg font-medium text-sm flex items-center">
                <FiStar className="mr-1" /> Most Popular
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">Starter</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">₹2,499</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="mt-3 text-sm text-gray-500">Great for growing businesses with moderate support volume</p>

                <Button
                  onClick={() => navigate("/signup?plan=starter")}
                  variant="primary"
                  className="mt-6 w-full"
                >
                  Start Free Trial
                  <FiArrowRight className="ml-2" />
                </Button>
              </div>

              <div className="px-6 pt-4 pb-8 bg-gray-50">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  What's included
                </h4>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Up to 500 complaints per month</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Multi-channel support (Web, Email)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Basic automation workflows</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Up to 5 user accounts</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">30-day data retention</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Basic reporting & analytics</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">Pro</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">₹6,999</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="mt-3 text-sm text-gray-500">Advanced features for high-volume support teams</p>

                <Button
                  onClick={() => navigate("/signup?plan=pro")}
                  variant="secondary"
                  className="mt-6 w-full"
                >
                  Start Free Trial
                  <FiArrowRight className="ml-2" />
                </Button>
              </div>

              <div className="px-6 pt-4 pb-8 bg-gray-50">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  What's included
                </h4>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Up to 5000 complaints per month</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">All channels (Web, Email, Chat)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">AI-powered automation</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Unlimited user accounts</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">1-year data retention</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Advanced analytics & reporting</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Priority support</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">Enterprise</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">Custom</span>
                  <span className="text-gray-500 ml-1"></span>
                </div>
                <p className="mt-3 text-sm text-gray-500">Tailored solution for large organizations</p>

                <Button
                  onClick={() => navigate("/contact")}
                  variant="secondary"
                  className="mt-6 w-full"
                >
                  Contact Sales
                  <FiArrowRight className="ml-2" />
                </Button>
              </div>

              <div className="px-6 pt-4 pb-8 bg-gray-50">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  What's included
                </h4>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Unlimited complaints</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Dedicated account manager</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Custom integrations</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">SLA-based support</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Unlimited data retention</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Custom reporting & dashboards</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">24/7 premium support</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">On-premise deployment option</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900">How does AI Support work?</h3>
              <p className="mt-2 text-gray-600">AI Support uses natural language processing to automatically classify, prioritize, and route customer complaints. The system learns from each interaction to improve accuracy over time, reducing response times and ensuring consistent customer service.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900">Can I integrate with my existing tools?</h3>
              <p className="mt-2 text-gray-600">Yes! AI Support integrates seamlessly with popular platforms like Zendesk, Salesforce, Gmail, Outlook, and more. We also offer API access for custom integrations with your existing workflow.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900">What happens when I exceed my monthly complaint limit?</h3>
              <p className="mt-2 text-gray-600">You'll receive notifications as you approach your monthly limit. If you exceed it, you can upgrade your plan instantly, or wait until the next billing cycle. We never shut off access to your data.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900">Is there a long-term contract?</h3>
              <p className="mt-2 text-gray-600">No, all our plans are month-to-month with no long-term commitment. Annual plans are available at a 20% discount if you prefer to save by paying upfront.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900">How secure is my customer data?</h3>
              <p className="mt-2 text-gray-600">Very secure. We use bank-level encryption for all data, both in transit and at rest. Our systems are SOC 2 compliant and we never share your data with third parties without explicit permission.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button
              variant="secondary"
              onClick={() => navigate("/contact")}
              className="mx-auto flex items-center"
            >
              Contact Our Support Team
              <FiArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#004b7c] to-[#0061A1] text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your customer support?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join over 5,000+ businesses using AI Support to provide exceptional customer service and reduce response times by up to 70%.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-white text-[#0061A1] hover:bg-gray-100 shadow-lg w-full sm:w-auto"
            >
              Start Your Free Trial
            </Button>

            <div className="flex items-center mt-4 sm:mt-0">
              <FiCheck className="text-green-300 mr-2" />
              <span className="text-sm">No credit card required</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">5,000+</span>
              <span className="text-sm mt-1 text-gray-200">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">70%</span>
              <span className="text-sm mt-1 text-gray-200">Faster Resolution</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">93%</span>
              <span className="text-sm mt-1 text-gray-200">Customer Satisfaction</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">24/7</span>
              <span className="text-sm mt-1 text-gray-200">Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-bold mb-4">AI Support</h3>
              <p className="text-gray-400 mb-4">Transforming customer support with artificial intelligence and automation.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link to="#features" className="text-gray-400 hover:text-white transition">Features</Link></li>
                <li><Link to="#pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
                <li><Link to="/demo" className="text-gray-400 hover:text-white transition">Request Demo</Link></li>
                <li><Link to="/webinars" className="text-gray-400 hover:text-white transition">Webinars</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link to="/documentation" className="text-gray-400 hover:text-white transition">Documentation</Link></li>
                <li><Link to="/tutorials" className="text-gray-400 hover:text-white transition">Tutorials</Link></li>
                <li><Link to="/api" className="text-gray-400 hover:text-white transition">API Reference</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-white transition">Press Kit</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 AI Support. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">Cookie Policy</Link>
                <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm">Sitemap</Link>
              </div>
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