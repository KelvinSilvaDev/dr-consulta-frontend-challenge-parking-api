/* eslint-disable react-hooks/rules-of-hooks */
// import { useAuth } from "@/hooks/useAuth";
import App from "../App";
import ErrorPage from "../pages/404";
import EstablishmentPage from "../pages/EstablishmentPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { ProtectedRoute } from "./protected";
import { RouteObject } from "react-router-dom";


import {
  createBrowserRouter,
} from "react-router-dom";


export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: "/establishment",
    element: <ProtectedRoute element={<EstablishmentPage />} />,
  },
  // Adicione outras rotas privadas conforme necessário
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        // Rota privada: Página principal (exemplo)
        path: "/home",
        element: <ProtectedRoute element={<HomePage />} />,
      },
      {
        // Rota privada: Página de estabelecimentos (exemplo)
        path: "/establishment",
        element: <ProtectedRoute element={<EstablishmentPage />} />,
      },
      // Adicione outras rotas privadas conforme necessário
    ],
  },
  {
    // Rota pública: Login
    path: "/login",
    element: <LoginPage />,
  },
  {
    // Rota pública: Registro
    path: "/register",
    element: <RegisterPage />,
  },
]);


export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  // Adicione outras rotas públicas conforme necessário
];