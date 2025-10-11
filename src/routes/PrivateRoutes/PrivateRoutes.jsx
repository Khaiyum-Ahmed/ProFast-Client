import { Navigate, useLocation } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import Loading from "../../Pages/Loading/Loading";

const PrivateRoutes = ({children}) => {
    const {user, loading} =UseAuth();
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
     return <Navigate to="/login" state={{from:location}} replace></Navigate>
    }
    return children;
};

export default PrivateRoutes;