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
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/Riders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/Riders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "./AdminRoutes/AdminRoute";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import RiderRoute from "./RiderRoute/RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

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
        path: 'rider',
        element: <PrivateRoutes><BeARider></BeARider></PrivateRoutes>,
        loader: () => fetch('/data/warehouses.json')
      },
      {
        path: 'addParcel',
        element: <PrivateRoutes><AddParcel></AddParcel></PrivateRoutes>,
        loader: () => fetch('/data/warehouses.json')
      },
      {
        path: "forbidden",
        Component: Forbidden
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
        index: true,
        Component: DashboardHome
      },
      {
        path: 'myParcels',
        Component: MyParcels
      },
      {
        path: 'track',
        Component: TrackParcel
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory
      },
      // Rider only routes
      {
        path:'pending-deliveries',
        element: <RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
      },
      {
        path:'completed-deliveries',
        element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      },
      {
        path:'my-earnings',
        element: <RiderRoute><MyEarnings></MyEarnings></RiderRoute>
      },
      
      // Admin Only Routes
      {
        path: 'assign-rider',
        element:<AdminRoute><AssignRider></AssignRider></AdminRoute>
      },
      {
        path:'pending-riders',
        element:<AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path:'active-riders',
        element:<AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
      },
      {
        path:'make-admin',
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      }


    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);