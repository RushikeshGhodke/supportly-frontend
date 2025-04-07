import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiPlus, FiSend, FiCopy } from "react-icons/fi";
import FormInput from "../components/ui/FormInput";
import FormSelect from "../components/ui/FormSelect";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import {
    addMemberRow,
    updateMember,
    removeMemberRow,
    inviteTeamMembers,
    getOrganizationInfo
} from "../redux/slices/teamSlice";

const InviteTeam = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { business } = useSelector((state) => state.onboarding);
    const {
        teamMembers,
        loading,
        error,
        invitationResults,
        organizationInfo,
        infoLoading
    } = useSelector((state) => state.team);

    const organizationId = business?.data?.newOrganization?._id || user?.organizationId;
    const inviteCode = organizationInfo?.inviteCode || "Loading...";

    // Fetch organization info (including invite code) when component mounts
    useEffect(() => {
        if (organizationId) {
            dispatch(getOrganizationInfo());
        }
    }, [dispatch, organizationId]);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(inviteCode);
        alert("Organization code copied to clipboard!");
    };

    const handleAddTeamMember = () => {
        dispatch(addMemberRow());
    };

    const handleRemoveTeamMember = (index) => {
        dispatch(removeMemberRow(index));
    };

    const handleTeamMemberChange = (index, field, value) => {
        dispatch(updateMember({ index, key: field, value }));
    };

    const handleRoleChange = (index, e) => {
        handleTeamMemberChange(index, "role", e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Filter out empty email fields
        const validMembers = teamMembers.filter(member => member.email.trim() !== "");

        if (validMembers.length === 0) {
            alert("Please add at least one team member email");
            return;
        }

        if (!organizationId) {
            alert("Organization information is missing");
            return;
        }

        await dispatch(inviteTeamMembers({
            organizationId,
            members: validMembers
        }));

        // If successful and we have results, navigate to dashboard after 3 seconds
        if (invitationResults) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        }
    };

    const handleSkip = () => {
        navigate("/dashboard");
    };

    const roleOptions = [
        { value: "Admin", label: "Admin" },
        { value: "Manager", label: "Manager" },
        { value: "Member", label: "Member" }
    ];

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100 p-4 md:p-6">
            <Card
                className="w-full max-w-3xl"
                title="Invite Your Team"
            >
                {/* Organization Code Section */}
                <div className="bg-gray-50 p-4 rounded-md text-center mb-6">
                    <p className="text-lg font-semibold">Share Your Organization Code</p>
                    <div className="flex justify-center items-center gap-3 mt-1">
                        <span className="bg-white text-gray-800 px-4 py-2 rounded-md text-lg font-mono tracking-wider border">
                            {infoLoading ? "Loading..." : inviteCode}
                        </span>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCopyCode}
                            className="flex items-center gap-1"
                            disabled={infoLoading}
                        >
                            <FiCopy size={16} /> Copy
                        </Button>
                    </div>
                    <p className="text-sm mt-2 text-gray-600">Team members can enter this code when signing up to join your organization.</p>
                </div>

                {/* Success Message */}
                {invitationResults && (
                    <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                        <p className="text-center font-medium">Invitations sent successfully!</p>
                        <p className="text-center text-sm mt-1">Redirecting to dashboard...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                        <p>{error}</p>
                    </div>
                )}

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
                                type="button"
                            >
                                <FiPlus size={16} /> Add Member
                            </Button>
                        </div>

                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="flex-grow">
                                    <FormInput
                                        type="email"
                                        placeholder="Email address"
                                        value={member.email}
                                        onChange={(e) => handleTeamMemberChange(index, "email", e.target.value)}
                                    />
                                </div>
                                <div className="w-32">
                                    <FormSelect
                                        options={roleOptions}
                                        value={member.role}
                                        onChange={(e) => handleRoleChange(index, e)}
                                        className="mb-0"
                                    />
                                </div>
                                {teamMembers.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTeamMember(index)}
                                        className="text-red-500 hover:text-red-700 p-2"
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
                            disabled={loading}
                        >
                            {loading ? (
                                "Sending..."
                            ) : (
                                <>
                                    <FiSend size={16} /> Send Invitations
                                </>
                            )}
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
