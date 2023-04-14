import Users from "../pages/Users";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFoundPage";
import MyAccount from "../pages/MyAccount";
import Register from "../pages/Register";

const publicRoutes = [
    {
        element: <Login/>,
        path: "/login"
    },
    {
        element: <Register/>,
        path: "/register"
    },
    {
        element: <NotFound/>,
        path: "/*"
    }
]

const userRoutes = [
    {
        element: DashBoard,
        path: "/"
    },
    {
        element: MyAccount,
        path: "/users/:id"
    },
    {
        element: Users,
        path: "/users"
    },
    
]

export {publicRoutes, userRoutes};