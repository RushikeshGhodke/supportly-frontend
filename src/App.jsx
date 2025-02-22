import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {LandingPage, Layout} from './pages/index.js'
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import SetupCompany from "./pages/SetupCompany.jsx";
import Signup from "./pages/Signup.jsx";
import ChoosePlan from "./pages/ChoosePlan.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import InviteTeam from "./pages/InviteTeam.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reports from "./pages/Reports.jsx";
import ComplaintsDashboard from "./pages/ComplaintsDashboard.jsx";
import ComplaintDetails from "./pages/ComplaintDetails.jsx";
import PendingComplaints from "./pages/PendingComplaints.jsx";
import ResolvedComplaints from "./pages/ResolvedComplaints.jsx";
import HighPriorityComplaints from "./pages/HighPriorityComplaints.jsx";
import EscalatedComplaints from "./pages/EscalatedComplaints.jsx";
import ComplaintForm from "./pages/ComplaintForm.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/choose-plan" element={<ChoosePlan />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/registerComplaint/" element={<ComplaintForm />} />

                <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                    <Route path="/setup-company" element={<SetupCompany />}/>
                    <Route path="/invite-team" element={<InviteTeam />}/>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/reports" element={<Reports />}/>
                    <Route path="/complaintsDashboard" element={<ComplaintsDashboard />}/>
                    <Route path="/complaints/:id" element={<ComplaintDetails />}/>
                    <Route path="/pendingComplaints" element={<PendingComplaints />}/>
                    <Route path="/resolvedComplaints" element={<ResolvedComplaints />}/>
                    <Route path="/highPriorityComplaints" element={<HighPriorityComplaints />}/>
                    <Route path="/escalatedComplaints" element={<EscalatedComplaints />}/>

                </Route>
            </Routes>
        </Router>
    )
}

export default App