import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GoogleCallbackPage } from "./pages/GoogleCallbackPage";
import { LpDetailPage } from "./pages/LpDetailPage";
import { MyPage } from "./pages/MyPage";

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
            path: "lp/:lpid",
            element: <LpDetailPage />,
          },
          {
            path: "my",
            element: <MyPage />,
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
