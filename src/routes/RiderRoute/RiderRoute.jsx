import { Navigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import UseUserRole from "../../hooks/UseUserRole";
import Loading from "../../Pages/Loading/Loading";

const RiderRoute = ({children}) => {
    const {user, loading} = UseAuth();
    const {role, roleLoading} = UseUserRole();

    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if(!user || role !== 'rider'){
        return <Navigate state={{from:location.pathname}} to='/forbidden'></Navigate>
    }

    return children;
};

export default RiderRoute;