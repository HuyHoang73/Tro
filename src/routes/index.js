import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages//Register";
import Rent from "../pages/Rent";
import Buy from "../pages/Buy";
import Project from "../pages/Project";
import Answer from "../pages/Answer";
import Hostel from "../pages/Hostel";
import PrivateRoutes from "../components/PrivateRoutes";
import Notification from "../pages/Notification";
import InfoUser from "../pages/InfoUser";
import UserHome from "../pages/InfoUser/UserHome";
import Posts from "../pages/InfoUser/Posts";
import ManagePost from "../pages/InfoUser/ManagePost";
import Member from "../pages/InfoUser/Member";
import Pay from "../pages/InfoUser/Pay";
import UpHostel from "../pages/InfoUser/UpHostel";
import UpdateUser from "../pages/InfoUser/UpdateUser";
import Error from "../pages/Error";
import UpPass from "../pages/InfoUser/UpPass";
import HomeAdmin from "../pages/HomeAdmin";


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
                path: "rent",
                element: <Rent />
            },
            {
                path: "buy",
                element: <Buy />
            },
            {
                path: "project",
                element: <Project />
            },
            {
                path: "hostel",
                element: <Hostel />
            },
            {
                path: "home-admin",
                element: <HomeAdmin />
            },
            {
                element: <PrivateRoutes />,
                children : [
                    {
                        path: "answer",
                        element: <Answer />
                    },
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
                                path: "up-hostel",
                                element: <UpHostel />
                            },
                            {
                                path: "posts",
                                element: <Posts />
                            },
                            {
                                path: "manage-post",
                                element: <ManagePost />
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
                                path: "up-pass",
                                element: <UpPass />
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