import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { joinOrganization } from "../redux/slices/teamSlice";
import { Link } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

// Helper function to parse query parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const JoinOrganization = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();

    // Get invitation data from URL if available
    const inviteToken = query.get("token");
    const organizationId = query.get("org");
    const role = query.get("role");

    const [inviteCode, setInviteCode] = useState("");
    const { joinLoading, joinError, joinedOrganization } = useSelector((state) => state.team);
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        // If not authenticated, redirect to login (with return URL)
        if (!isAuthenticated) {
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
            return;
        }

        // If user already belongs to organization, redirect to dashboard
        if (user?.organizationId) {
            navigate("/dashboard");
            return;
        }

        // If successfully joined, redirect to dashboard
        if (joinedOrganization) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, joinedOrganization, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inviteToken && organizationId) {
            // Join with token from URL
            await dispatch(joinOrganization({ inviteToken, organizationId }));
        } else if (inviteCode) {
            // Join with manually entered code
            await dispatch(joinOrganization({ inviteCode }));
        } else {
            alert("Please enter an organization code");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card
                className="w-full max-w-md"
                title="Join Organization"
                subtitle={
                    inviteToken && organizationId
                        ? "You've been invited to join an organization"
                        : "Enter your organization code to join"
                }
            >
                {joinError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {joinError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!(inviteToken && organizationId) && (
                        <FormInput
                            label="Organization Code"
                            id="inviteCode"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                            placeholder="Enter organization code (e.g. ABCD-1234)"
                            required
                        />
                    )}

                    {inviteToken && organizationId && (
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                            <p className="text-blue-700">
                                You're joining as a <strong>{role || "Member"}</strong>
                            </p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={joinLoading}
                        fullWidth
                    >
                        {joinLoading ? "Joining..." : "Join Organization"}
                    </Button>

                    <div className="text-center mt-2">
                        <Link to="/" className="text-sm text-[#0061A1] hover:underline">
                            Back to home
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default JoinOrganization;