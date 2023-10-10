import { Outlet } from "react-router-dom";
import "./Layout.css";
// import { useSelector } from "react-redux";
import Header from "./Header";
// import Footer from "./Footer";
function Layout() {
    // const authen = useSelector(state => state.authenReducer);
    return (
        <>
            <Header />
            <main className="main">
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default Layout;