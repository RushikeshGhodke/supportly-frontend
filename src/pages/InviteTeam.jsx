import { useDispatch, useSelector } from "react-redux";
import { addMemberRow, updateMember, removeMemberRow, inviteTeamMembers } from "../redux/slices/teamSlice";
import { useNavigate } from "react-router-dom";

const InviteTeam = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { teamMembers, orgCode, loading, error } = useSelector((state) => state.team);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(orgCode);
        alert("Organization code copied to clipboard!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (teamMembers.some(member => !member.email.trim())) {
            alert("Please fill out all email fields before proceeding.");
            return;
        }

        // const result = await dispatch(inviteTeamMembers({ teamMembers }));
        // if (result.payload) navigate("/dashboard");
        navigate("/dashboard")
    };

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg w-full p-10">
                <h1 className="text-[#0061A1] text-2xl font-semibold mb-7">Invite Your Team</h1>

                {/* Organization Code Section */}
                <div className="bg-gray-200 p-4 rounded-md text-center">
                    <p className="text-lg font-semibold">Share This Organization Code</p>
                    <div className="flex justify-center items-center gap-3 mt-1">
                        <span className="bg-white text-gray-800 px-4 py-1 rounded-md text-lg font-bold">{orgCode}</span>
                        <button className="bg-blue-600 text-white px-4 py-1 rounded-md" onClick={handleCopyCode}>
                            Copy
                        </button>
                    </div>
                    <p className="text-sm mt-2 text-gray-600">New users can enter this code to join your company.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    {/* Dynamic Team Member List */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Add Team Members</h3>
                        <div className="space-y-4">
                            {teamMembers.map((member, index) => (
                                <div key={index}
                                     className="flex gap-3 items-center bg-gray-100 p-3 rounded-md shadow-sm">
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        value={member.email}
                                        onChange={(e) => dispatch(updateMember({
                                            index,
                                            key: "email",
                                            value: e.target.value
                                        }))}
                                        className="w-2/3 p-2 border-2 border-[#DAD7D7] rounded-md"
                                        required
                                    />
                                    <select
                                        value={member.role}
                                        onChange={(e) => dispatch(updateMember({
                                            index,
                                            key: "role",
                                            value: e.target.value
                                        }))}
                                        className="w-1/3 p-2 border-2 border-[#DAD7D7] rounded-md"
                                    >
                                        <option>Support Agent</option>
                                        <option>Admin</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                                        onClick={() => dispatch(removeMemberRow(index))}
                                        disabled={teamMembers.length === 1}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add More Button */}
                        <button
                            type="button"
                            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                            onClick={() => dispatch(addMemberRow())}
                        >
                            + Add Another Member
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {/* Submit & Skip Buttons */}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="text-blue-600 underline"
                            onClick={() => navigate("/dashboard")}
                        >
                            Skip
                        </button>
                        <button
                            type="submit"
                            className="bg-[#0061A1] text-white px-6 py-2 rounded-md hover:bg-[#004b7c] transition"
                            disabled={loading}
                        >
                            {loading ? "Sending Invites..." : "Send Invites"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default InviteTeam;
