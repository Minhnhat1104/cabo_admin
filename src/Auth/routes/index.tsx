import { Navigate } from "react-router-dom";
import SignInPage from "../pages/SignIn";
import Home from "@home/page/index";

const Routes = {
  path: "/auth",
  children: [
    {
      index: true,
      element: <Navigate to="/auth/sign-in" />,
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/Home",
      element: <Home />,
    },
  ],
};
export default Routes;
