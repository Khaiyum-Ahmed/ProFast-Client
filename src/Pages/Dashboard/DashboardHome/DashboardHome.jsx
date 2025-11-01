import UseUserRole from "../../../hooks/UseUserRole";
import Forbidden from "../../Forbidden/Forbidden";
import Loading from "../../Loading/Loading";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
    const {role, roleLoading} = UseUserRole();

    if(roleLoading){
        return <Loading></Loading>
    }
    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role ==="rider"){
        return <RiderDashboard></RiderDashboard>
    }
    else if(role === "admin"){
        return <AdminDashboard></AdminDashboard>
    }
    else{
        return <Forbidden></Forbidden>
    }
   
};

export default DashboardHome;