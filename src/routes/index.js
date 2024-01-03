import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages//Register";
import Hostel from "../pages/Hostel";
import PrivateRoutes from "../components/PrivateRoutes";
import Notification from "../pages/Notification";
import InfoUser from "../pages/InfoUser";
import UserHome from "../pages/InfoUser/UserHome";
import Member from "../pages/InfoUser/Member";
import Pay from "../pages/InfoUser/Pay";
import ManageHostel from "../pages/InfoUser/ManageHostel";
import UpdateUser from "../pages/InfoUser/UpdateUser";
import Error from "../pages/Error";
import HostelDetail from "../pages//Hostel/HostelDetail"
import HostelList from "../pages/Hostel/HostelList";
import Settings from "../pages/Settings";
import ThuePhong from "../pages/ThuePhong";

export const routes = [
    {
        path : "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "hostel",
                element: <Hostel />,
                children: [
                    {
                        index: true,
                        element: <HostelList />
                    },
                    {
                        path: ":id",
                        element: <HostelDetail />
                    },
                    {
                        path: "thuephong",
                        element: <ThuePhong />
                    }
                ]
            },
            {
                element: <PrivateRoutes />,
                children : [
                    {
                        path: "notification",
                        element: <Notification />
                    },
                    {
                        path: "infouser",
                        element: <InfoUser />,
                        children: [
                            {
                                index: true,
                                element: <UserHome />
                            },
                            {
                                path: "manage-hostel",
                                element: <ManageHostel />
                            },
                            {
                                path: "member",
                                element: <Member />
                            },
                            {
                                path: "pay",
                                element: <Pay />
                            },
                            {
                                path: "update-user",
                                element: <UpdateUser />
                            },
                            {
                                path: "settings",
                                element: <Settings />
                            }
                        ]
                    },
                ]
            }
        ]
    },
    {
        path: "*",
        element: <Error />
    }
]