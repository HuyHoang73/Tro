import { Outlet } from "react-router-dom";

function Hostel() {
  
  return (
    <>
      <div className="area-1200">
        <div className="list-post">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Hostel;
