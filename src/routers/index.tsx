import {
  createBrowserRouter,
} from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Category from "../pages/Category/Category";
import IndexPost from "../pages/Post/Index";
import UserDetail from "../pages/User/UserDetail";
import ChangePassword from "../pages/User/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/post-detail/:id",
    element: <IndexPost />,
  },
  {
    path: "/user-detail",
    element: <UserDetail/>,
  },
  {
    path: "/change-password",
    element: <ChangePassword/>,
  },
]);

export default router;
