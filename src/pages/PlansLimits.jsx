import React, { useState } from "react";
import {useSelector} from "react-redux";

const plans = [
    { id: "basic", name: "Basic", price: "Free", features: ["100 API Calls", "5GB Storage"], limit: { apiCalls: 50, storage: 5 } },
    { id: "pro", name: "Pro", price: "$9.99/mo", features: ["1000 API Calls", "50GB Storage"], limit: { apiCalls: 500, storage: 50 } },
    { id: "enterprise", name: "Enterprise", price: "$29.99/mo", features: ["Unlimited API Calls", "1TB Storage"], limit: { apiCalls: "Unlimited", storage: 1000 } },
];

const PlansLimits = () => {
    const { business } = useSelector((state) => state.onboarding);
    const [currentPlan, setCurrentPlan] = useState("basic"); // User's current plan
    const [usage, setUsage] = useState({ apiCalls: 50 }); // Mock user usage

    const handlePlanChange = (planId) => {
        setCurrentPlan(planId);
    };

    return (
        <div className="flex flex-col items-center p-6 mt-16 bg-gray-100">
            <h1 className="text-3xl font-semibold text-[#0061A1] mb-6">Plans & Limits</h1>

            {/* Current Plan & Limits */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold">Current Plan: {business.data.newOrganization.plan}</h2>
                {/* Usage Progress */}
                <div className="mt-4">
                    <div className="mb-3">
                        <span className="text-sm text-gray-700">Complaints Raised: {business.data.newOrganization.usedComplaints}/{business.data.newOrganization.totalComplaints}</span>
                        <div className="w-full bg-gray-300 rounded-full h-2.5">
                            <div className="bg-[#0061A1] h-2.5 rounded-full" style={{ width: `${(business.data.newOrganization.usedComplaints / business.data.newOrganization.totalComplaints) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
                {plans.map((plan) => (
                    <div key={plan.id} className={`p-6 rounded-lg shadow-lg ${currentPlan === plan.id ? "border-2 border-[#0061A1]" : "border"} bg-white`}>
                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                        <p className="text-gray-500">{plan.price}</p>

                        <ul className="mt-4 text-sm text-gray-700">
                            {plan.features.map((feature, index) => (
                                <li key={index}>✔ {feature}</li>
                            ))}
                        </ul>

                        {currentPlan !== plan.id ? (
                            <button
                                className="mt-4 bg-[#0061A1] text-white px-4 py-2 rounded-lg w-full hover:bg-[#004b7d]"
                                onClick={() => handlePlanChange(plan.id)}
                            >
                                Switch to {plan.name}
                            </button>
                        ) : (
                            <button className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full cursor-not-allowed">
                                Current Plan
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlansLimits;
