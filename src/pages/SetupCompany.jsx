import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const timezones = [
    "UTC", "EST - Eastern Standard Time", "PST - Pacific Standard Time",
    "CST - Central Standard Time", "IST - Indian Standard Time",
    "GMT - Greenwich Mean Time", "CET - Central European Time"
];

const SetupCompany = () => {
    const navigate = useNavigate();
    const { selectedPlan } = useSelector((state) => state.plan); // Fetch plan from Redux

    const [companyLogo, setCompanyLogo] = useState(null);
    const [address, setAddress] = useState("");
    const [timezone, setTimezone] = useState("UTC");
    const [supportHours, setSupportHours] = useState({ from: "", to: "" });
    const [supportChannels, setSupportChannels] = useState([]);

    const handleFileChange = (e) => {
        setCompanyLogo(e.target.files[0]);
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

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg w-full p-10">

                <div>
                    <h1 className="text-[#0061A1] text-2xl font-semibold mb-8">Setup Your Company</h1>

                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Logo */}
                    <div>
                        <label className="text-[#7D7D7D] text-sm block mb-2">Company Logo</label>
                        <input type="file" className="w-full" onChange={handleFileChange}/>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="text-[#7D7D7D] text-sm block mb-2">Company Address</label>
                        <input
                            className="w-full p-2 border-2 border-[#DAD7D7] rounded-md"
                            type="text"
                            placeholder="Enter company address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-row gap-5">
                        {/* Timezone (Dropdown) */}
                        <div className="">
                            <label className="text-[#7D7D7D] text-sm block mb-2">Timezone</label>
                            <select
                                className="w-full p-2 border-2 border-[#DAD7D7] rounded-md"
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                required
                            >
                                {timezones.map((tz) => (
                                    <option key={tz} value={tz}>{tz}</option>
                                ))}
                            </select>
                        </div>

                        {/* Support Hours (From & To) */}
                        <div className="w-1/2 flex flex-row gap-4">
                            <div>
                                <label className="text-[#7D7D7D] text-sm block mb-2">From</label>
                                <input
                                    className="w-full p-2 border-2 border-[#DAD7D7] rounded-md"
                                    type="time"
                                    value={supportHours.from}
                                    onChange={(e) => setSupportHours({...supportHours, from: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[#7D7D7D] text-sm block mb-2">To</label>
                                <input
                                    className="w-full p-2 border-2 border-[#DAD7D7] rounded-md"
                                    type="time"
                                    value={supportHours.to}
                                    onChange={(e) => setSupportHours({...supportHours, to: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Support Channels */}
                    <div>
                        <label className="text-[#7D7D7D] text-sm block mb-2">Support Channels</label>
                        <div className="flex flex-wrap gap-3">
                            {allChannels.map((channel) => (
                                <label key={channel.name} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={channel.name}
                                        checked={supportChannels.includes(channel.name) || channel.allowed}
                                        onChange={handleChannelChange}
                                        disabled={!channel.allowed}
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
                    <button
                        type="submit"
                        className="w-full bg-[#0061A1] text-white py-2 rounded-md hover:bg-[#004b7c] transition"
                        onClick={() => navigate("/invite-team")}
                    >
                        Next: Invite Team
                    </button>
                </form>
            </div>
        </section>
    );

};

export default SetupCompany;
