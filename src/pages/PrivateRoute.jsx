import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector(state => state.auth);
    const location = useLocation();

    // Show loading indicator while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0061A1]"></div>
            </div>
        );
    }

    return isAuthenticated ?
        children :
        <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
