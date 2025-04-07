import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FormInput from "../components/ui/FormInput";
import FormSelect from "../components/ui/FormSelect";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const SetupCompany = () => {
    const navigate = useNavigate();
    const { selectedPlan } = useSelector((state) => state.plan);

    const [companyLogo, setCompanyLogo] = useState(null);
    const [address, setAddress] = useState("");
    const [timezone, setTimezone] = useState("UTC+0");
    const [supportHours, setSupportHours] = useState("9 AM - 6 PM");
    const [supportChannels, setSupportChannels] = useState(["Web Form"]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setCompanyLogo(e.target.files[0]);
        }
    };

    const handleChannelChange = (e) => {
        const { value, checked } = e.target;
        setSupportChannels(
            checked ? [...supportChannels, value] : supportChannels.filter((channel) => channel !== value)
        );
    };

    // Define Support Channels Based on Plan
    const allChannels = [
        { name: "Web Form", allowed: true },
        { name: "Email", allowed: selectedPlan !== "Free" },
        { name: "WhatsApp", allowed: selectedPlan !== "Free" },
        { name: "API", allowed: selectedPlan !== "Free" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ companyLogo, address, timezone, supportHours, supportChannels });
        navigate("/invite-team");
    };

    // Timezone options
    const timezoneOptions = [
        "UTC-12", "UTC-11", "UTC-10", "UTC-9", "UTC-8", "UTC-7", "UTC-6", "UTC-5",
        "UTC-4", "UTC-3", "UTC-2", "UTC-1", "UTC+0", "UTC+1", "UTC+2", "UTC+3",
        "UTC+4", "UTC+5", "UTC+6", "UTC+7", "UTC+8", "UTC+9", "UTC+10", "UTC+11", "UTC+12"
    ];

    // Support hours options
    const supportHoursOptions = [
        "9 AM - 5 PM", "9 AM - 6 PM", "8 AM - 6 PM", "8 AM - 8 PM", "24/7"
    ];

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100 p-4 md:p-6">
            <Card
                className="w-full max-w-3xl"
                title="Setup Your Company"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Logo */}
                    <div>
                        <label className="text-[#7D7D7D] text-sm block mb-2">Company Logo</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0061A1]"
                        />
                    </div>

                    {/* Address */}
                    <FormInput
                        label="Company Address"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter company address"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Timezone (Dropdown) */}
                        <FormSelect
                            label="Timezone"
                            id="timezone"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            options={timezoneOptions}
                        />

                        {/* Support Hours (Dropdown) */}
                        <FormSelect
                            label="Support Hours"
                            id="supportHours"
                            value={supportHours}
                            onChange={(e) => setSupportHours(e.target.value)}
                            options={supportHoursOptions}
                        />
                    </div>

                    {/* Support Channels (Checkboxes) */}
                    <div>
                        <label className="text-[#7D7D7D] text-sm block mb-2">Support Channels</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {allChannels.map((channel) => (
                                <label
                                    key={channel.name}
                                    className={`flex items-center space-x-2 ${!channel.allowed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <input
                                        type="checkbox"
                                        value={channel.name}
                                        checked={supportChannels.includes(channel.name) || !channel.allowed}
                                        onChange={handleChannelChange}
                                        disabled={!channel.allowed}
                                        className="h-4 w-4 text-[#0061A1] focus:ring-[#0061A1]"
                                    />
                                    <span className={channel.allowed ? "" : "text-gray-400"}>{channel.name}</span>
                                </label>
                            ))}
                        </div>
                        {selectedPlan === "Free" && (
                            <p className="text-red-500 text-sm mt-2">Upgrade your plan to enable more channels.</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                    >
                        Next: Invite Team
                    </Button>
                </form>
            </Card>
        </section>
    );
};

export default SetupCompany;
