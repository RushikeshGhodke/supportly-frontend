import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectPlan } from "../redux/slices/planSlice";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiArrowRight, FiStar } from "react-icons/fi";
import Button from "../components/ui/Button";

const plans = [
    {
        id: "free",
        name: "Free",
        price: "₹0",
        billing: "/month",
        description: "Perfect for small businesses just getting started",
        features: [
            "Up to 50 complaints per month",
            "Basic web form integration",
            "Email notifications",
            "1 user account",
            "7-day data retention"
        ],
        isPopular: false,
        ctaText: "Get Started"
    },
    {
        id: "starter",
        name: "Starter",
        price: "₹2,499",
        billing: "/month",
        description: "Great for growing businesses with moderate support volume",
        features: [
            "Up to 500 complaints per month",
            "Multi-channel support (Web, Email)",
            "Basic automation workflows",
            "Up to 5 user accounts",
            "30-day data retention",
            "Basic reporting & analytics"
        ],
        isPopular: true,
        ctaText: "Start Free Trial"
    },
    {
        id: "pro",
        name: "Pro",
        price: "₹6,999",
        billing: "/month",
        description: "Advanced features for high-volume support teams",
        features: [
            "Up to 5000 complaints per month",
            "All channels (Web, Email, Chat)",
            "AI-powered automation",
            "Unlimited user accounts",
            "1-year data retention",
            "Advanced analytics & reporting",
            "Priority support"
        ],
        isPopular: false,
        ctaText: "Start Free Trial"
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        billing: "",
        description: "Tailored solution for large organizations",
        features: [
            "Unlimited complaints",
            "Dedicated account manager",
            "Custom integrations",
            "SLA-based support",
            "Unlimited data retention",
            "Custom reporting & dashboards",
            "24/7 premium support",
            "On-premise deployment option"
        ],
        isPopular: false,
        ctaText: "Contact Sales"
    }
];

const ChoosePlan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [billing, setBilling] = useState("monthly"); // monthly or annual

    const handlePlanSelect = (planName) => {
        dispatch(selectPlan(planName));

        // If enterprise plan, redirect to contact form
        if (planName === "Enterprise") {
            // You could implement a contact form or redirect to a different page
            // For now, we'll just navigate to onboarding
            navigate("/onboarding");
        } else {
            navigate("/onboarding");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-7xl w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Choose the Right Plan for Your Business
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        All plans include a 14-day free trial, no credit card required.
                    </p>

                    {/* Billing toggle - Monthly/Annual */}
                    <div className="mt-6 flex justify-center">
                        <div className="relative bg-gray-100 p-1 rounded-lg inline-flex">
                            <button
                                className={`px-4 py-2 rounded-md text-sm font-medium ${billing === "monthly"
                                        ? "bg-white shadow-sm text-gray-900"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                                onClick={() => setBilling("monthly")}
                            >
                                Monthly
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm font-medium ${billing === "annual"
                                        ? "bg-white shadow-sm text-gray-900"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                                onClick={() => setBilling("annual")}
                            >
                                Annual <span className="text-xs text-green-600 font-bold">Save 20%</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="mt-12 grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 relative ${plan.isPopular ? "ring-2 ring-[#0061A1] transform scale-105 z-10" : ""
                                }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 right-0 bg-[#0061A1] text-white py-1 px-3 rounded-bl-lg font-medium text-sm flex items-center">
                                    <FiStar className="mr-1" /> Most Popular
                                </div>
                            )}

                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                <div className="mt-2 flex items-baseline">
                                    <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-500 ml-1">{plan.billing}</span>
                                </div>
                                <p className="mt-3 text-sm text-gray-500">{plan.description}</p>

                                <Button
                                    onClick={() => handlePlanSelect(plan.name)}
                                    variant={plan.isPopular ? "primary" : "secondary"}
                                    className="mt-6 w-full"
                                >
                                    {plan.ctaText}
                                    <FiArrowRight className="ml-2" />
                                </Button>
                            </div>

                            <div className="px-6 pt-4 pb-8 bg-gray-50">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    What's included
                                </h4>
                                <ul className="mt-4 space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <FiCheck className="h-5 w-5 text-green-500" />
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-16 bg-white rounded-lg shadow px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
                    <dl className="space-y-6 divide-y divide-gray-200">
                        <div className="pt-6">
                            <dt className="text-lg font-medium text-gray-900">Can I change my plan later?</dt>
                            <dd className="mt-2 text-base text-gray-500">
                                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                            </dd>
                        </div>
                        <div className="pt-6">
                            <dt className="text-lg font-medium text-gray-900">What happens when I exceed my complaint limit?</dt>
                            <dd className="mt-2 text-base text-gray-500">
                                You'll receive a notification when you're approaching your limit. If you exceed it, you can upgrade your plan or wait until the next billing cycle.
                            </dd>
                        </div>
                        <div className="pt-6">
                            <dt className="text-lg font-medium text-gray-900">Do you offer discounts for non-profits?</dt>
                            <dd className="mt-2 text-base text-gray-500">
                                Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-8">
                    <p className="text-base text-gray-500">
                        Need help choosing the right plan? <a href="#" className="text-[#0061A1] font-medium">Contact our sales team</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChoosePlan;
