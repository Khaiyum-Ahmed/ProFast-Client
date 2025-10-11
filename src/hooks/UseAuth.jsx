import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

const UseAuth = () => {
   const AuthInfo = use(AuthContext)
   return AuthInfo
};

export default UseAuth;