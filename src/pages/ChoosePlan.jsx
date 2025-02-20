import React from "react";
import { useDispatch } from "react-redux";
import { selectPlan } from "../redux/slices/planSlice";
import { useNavigate } from "react-router-dom";

const plans = [
    { name: "Free", price: "₹0/month", features: ["50 complaints", "Web Form"] },
    { name: "Starter", price: "₹2,499/month", features: ["500 complaints", "Multi-Channel"] },
    { name: "Pro", price: "₹6,999/month", features: ["5000 complaints", "AI Automation"] },
    { name: "Enterprise", price: "Custom", features: ["Unlimited", "SLA-Based Support"] },
];

const ChoosePlan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePlanSelect = (plan) => {
        console.log(plan);
        dispatch(selectPlan(plan));
        navigate("/onboarding");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Choose a Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                        onClick={() => handlePlanSelect(plan.name)}
                    >
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <p className="text-lg">{plan.price}</p>
                        <ul className="mt-2">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="text-gray-600">✅ {feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChoosePlan;
