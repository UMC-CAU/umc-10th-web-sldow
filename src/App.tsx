import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GoogleCallbackPage } from "./pages/GoogleCallbackPage";
import { CreatePage } from "./pages/CreatePage";
import { LpDetailPage } from "./pages/LpDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "v1/auth/google/callback",
        element: <GoogleCallbackPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "create",
            element: <CreatePage />,
          },
          {
            path: "lp/:lpid",
            element: <LpDetailPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
