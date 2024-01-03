import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookies";
import "./UserIdentify.css";
import { getUser1 } from "../../services/userServices";


function UserIdentify() {
    const id = getCookie("id");
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getUser1(id);
            if (result) {
                setUser(result);
            }
          };
          fetchApi();
    },[id])

    return (
        <>
            <div className="box-identify">
                <div className="inner-box-identify">
                    <div className="box-identify-avatar">
                        <img src="https://pro.mogi.vn/content/images/avatar.png" alt="avatar" />
                    </div>
                    <div className="box-identify-name">
                        <b>{user.name}</b>
                    </div>
                    <div className="box-identify-email">
                        {user.gmail}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserIdentify;