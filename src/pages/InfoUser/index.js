import { Outlet } from "react-router-dom";
import MenuUser from "../../components/MenuUser";
import "./InfoUser.css";

function InfoUser() {
  return (
    <>
      <div className="area-1200">
        <div className="userpage-box">
          <div className="user-fixed">
            <div className="box-menu-user">
              <MenuUser />
            </div>
          </div>

          <div className="user-outlet" style={{width:"100%"}}>
            <Outlet />
          </div>

          <div className="clear-box"></div>
        </div>
      </div>
    </>
  );
}

export default InfoUser;
