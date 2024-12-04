import { Navigate } from "react-router-dom";
import { useAuth } from "../../authContext"

const PublicRoute = ({ children }) => {
    const { user } = useAuth();

    if(user) {
        return <Navigate to="/dashboard"/>;
    }

    return children;
};

export default PublicRoute
