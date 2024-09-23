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
import Search from "../pages/Post/Search/Search";
import PageError from "../pages/PageError";

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
    path: "/category/:id",
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
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: '/*',
    element: <PageError />,
},
]);

export default router;
