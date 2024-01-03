import { useNavigate } from "react-router-dom"
import { deleteAllCookie } from "../../helpers/cookies";
import { useDispatch } from "react-redux";
import { authen } from "../../actions/authentication";
import "./Logout.css"

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        deleteAllCookie();
        dispatch(authen(false));
        navigate("/register");
        window.location.reload();
    }
    
    return (
        <>
            <button onClick={handleLogout} className="button-logout">Đăng xuất</button>
        </>
    )
}