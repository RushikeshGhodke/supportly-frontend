import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX, FiPlus, FiSend } from "react-icons/fi";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const InviteTeam = () => {
    const navigate = useNavigate();
    const [orgCode] = useState("ORG123456");
    const [teamMembers, setTeamMembers] = useState([
        { email: "", role: "Member" }
    ]);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(orgCode);
        alert("Organization code copied to clipboard!");
    };

    const handleAddTeamMember = () => {
        setTeamMembers([...teamMembers, { email: "", role: "Member" }]);
    };

    const handleRemoveTeamMember = (index) => {
        const updatedMembers = [...teamMembers];
        updatedMembers.splice(index, 1);
        setTeamMembers(updatedMembers);
    };

    const handleTeamMemberChange = (index, field, value) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index][field] = value;
        setTeamMembers(updatedMembers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(teamMembers);
        navigate("/dashboard");
    };

    const handleSkip = () => {
        navigate("/dashboard");
    };

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100 p-4 md:p-6">
            <Card 
                className="w-full max-w-3xl"
                title="Invite Your Team"
            >
                {/* Organization Code Section */}
                <div className="bg-gray-200 p-4 rounded-md text-center mb-6">
                    <p className="text-lg font-semibold">Share This Organization Code</p>
                    <div className="flex justify-center items-center gap-3 mt-1">
                        <span className="bg-white text-gray-800 px-4 py-1 rounded-md text-lg font-bold">{orgCode}</span>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleCopyCode}
                        >
                            Copy
                        </Button>
                    </div>
                    <p className="text-sm mt-2 text-gray-600">New users can enter this code to join your company.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dynamic Team Member List */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Team Members</h3>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleAddTeamMember}
                                className="flex items-center gap-1"
                            >
                                <FiPlus size={16} /> Add Member
                            </Button>
                        </div>
                        
                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <FormInput
                                    type="email"
                                    placeholder="Email address"
                                    value={member.email}
                                    onChange={(e) => handleTeamMemberChange(index, "email", e.target.value)}
                                    className="flex-grow"
                                />
                                <select
                                    value={member.role}
                                    onChange={(e) => handleTeamMemberChange(index, "role", e.target.value)}
                                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0061A1]"
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Member">Member</option>
                                </select>
                                {teamMembers.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTeamMember(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FiX size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2"
                            fullWidth
                        >
                            <FiSend size={16} /> Send Invitations
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleSkip}
                            className="flex-1"
                            fullWidth
                        >
                            Skip for Now
                        </Button>
                    </div>
                </form>
            </Card>
        </section>
    );
};

export default InviteTeam;
