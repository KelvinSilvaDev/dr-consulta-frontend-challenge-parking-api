import './global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/404.tsx';
import { privateRoutes, routes } from './routes/routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
// import ErrorPage from './pages/404.tsx';
// import HomePage from './pages/HomePage.tsx';
// import EstablishmentPage from './pages/EstablishmentPage.tsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//       {
//         path: "/establishment",
//         element: <EstablishmentPage />,
//       }
//     ]
//   },
// ]);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      ...routes,
      ...privateRoutes,
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
