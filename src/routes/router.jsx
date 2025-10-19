import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/AuthenticationPages/Login/Login";
import AuthLayouts from "../Layouts/AuthLayouts";
import Register from "../Pages/AuthenticationPages/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import AddParcel from "../Pages/AddParcels/AddParcel";
import DashBoardLayouts from "../Layouts/DashBoardLayouts";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/PaymentGateway/Payment";

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
        path: "coverage",
        Component: Coverage,
        loader: () => fetch('/data/warehouses.json')
      },
      {
        path: 'addParcel',
        element: <PrivateRoutes><AddParcel></AddParcel></PrivateRoutes>,
        loader: () => fetch('/data/warehouses.json')
      },
      {
        path: "*",
        Component: ErrorPage
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes><DashBoardLayouts></DashBoardLayouts></PrivateRoutes>,
    children: [
      {
        path: 'myParcels',
        Component: MyParcels
      },
      {
        path:'payment/:parcelId',
        Component:Payment
      }
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);