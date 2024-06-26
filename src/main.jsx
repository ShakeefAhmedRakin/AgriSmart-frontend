import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import DashboardHome from "./components/DashboardHome";
import Seeds from "./components/Seeds";
import History from "./components/History";
import Equipments from "./components/Equipments";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "sonner";
import Soils from "./components/Soils";
import Crop from "./components/Crop";
import Agriguide from "./components/Agriguide";
import Community from "./components/Community";
import CommunityPost from "./components/CommunityPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root></Root>
      </PrivateRoute>
    ),
    children: [
      // SHARED ROUTES
      {
        path: "/",
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/seeds",
        element: (
          <PrivateRoute>
            <Seeds></Seeds>
          </PrivateRoute>
        ),
      },
      {
        path: "/community",
        element: (
          <PrivateRoute>
            <Community></Community>
          </PrivateRoute>
        ),
      },
      {
        path: "/community/post/:id",
        element: (
          <PrivateRoute>
            <CommunityPost></CommunityPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/soils",
        element: (
          <PrivateRoute>
            <Soils></Soils>
          </PrivateRoute>
        ),
      },
      {
        path: "/crops",
        element: (
          <PrivateRoute>
            <Crop></Crop>
          </PrivateRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <PrivateRoute>
            <History></History>
          </PrivateRoute>
        ),
      },
      {
        path: "/history/:id",
        element: (
          <PrivateRoute>
            <History></History>
          </PrivateRoute>
        ),
      },
      {
        path: "/equipments",
        element: (
          <PrivateRoute>
            <Equipments></Equipments>
          </PrivateRoute>
        ),
      },
      {
        path: "/agriguide",
        element: (
          <PrivateRoute>
            <Agriguide></Agriguide>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
