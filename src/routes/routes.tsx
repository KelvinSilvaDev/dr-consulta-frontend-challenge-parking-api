import Layout from "@/Layout";
import ErrorPage from "../pages/404";
import EstablishmentPage from "../pages/EstablishmentPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import {
  createBrowserRouter,
} from "react-router-dom";
import App from "@/App";
import CreateEstablihsment from "@/pages/CreateEstablihsment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <EstablishmentPage />,
      },
      {
        path: "establishment/:id",
        element: <EstablishmentPage />,
      },
      {
        path: "establishment/new",
        element: <CreateEstablihsment />,
      }
    ],
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

