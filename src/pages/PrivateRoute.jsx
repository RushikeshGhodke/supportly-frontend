import { Navigate } from "react-router-dom";

const isAuthenticated = true

const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
