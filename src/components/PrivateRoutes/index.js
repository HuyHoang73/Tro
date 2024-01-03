import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookies";

function PrivateRoutes() {
    const isToken = getCookie("token");
    return(
        <>
            {isToken ? (<Outlet />) : (<Navigate to="/login" />)}
        </>
    )
}

export default PrivateRoutes;