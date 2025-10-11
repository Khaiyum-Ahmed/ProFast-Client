import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/AuthenticationPages/Login/Login";
import AuthLayouts from "../Layouts/AuthLayouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "*",
        Component: ErrorPage
      }
    ]
  },
  {
    path:"/",
    Component:AuthLayouts,
    children:[
      {
        path: "/login",
        Component:Login
      }
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);