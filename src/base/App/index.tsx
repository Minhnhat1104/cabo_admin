import React, { createContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import { Box, Button, ThemeProvider, useTheme } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import { Navigate, useRoutes } from "react-router-dom";
import {} from "react-router-dom";
import { User, UserContextValue } from "../types";
import { theme } from "../theme";

import SignInPage from "../../Auth/pages/SignIn";
import Home from "@home/page/index";
import { Toaster } from "react-hot-toast";

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState<User | null>(null);

  // const childrenRoute = user
  const childrenRoute = [
    {
      index: true,
      element: <Navigate to="/sign-in" />,
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/Home",
      element: <Home />,
    },
  ];

  // const childrenRoute=AuthRoute

  const routes = useRoutes([
    {
      path: "/",
      // children: [
      //   CourseRoute,
      //   AuthRoute,
      //   {
      //     index: true,
      //     element: <Navigate to={user ? "/course" : "auth/sign-in"} />,
      //   },
      // ],
      children: childrenRoute,
    },
  ]);

  // Get user from local storage on mount
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const storedUser = JSON.parse(userJson);
      setUser(storedUser);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <Box minHeight={"100vh"}>
          {/* <Header /> */}
          <Box
            p={4}
            display="flex"
            sx={{
              background: theme.palette.background.default,
              // backgroundImage: `url(${homeImage})`,
              overflowY: "scroll",
              height: "100vh",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* Edge */,
            }}
          >
            {routes}
            <Toaster />
          </Box>
          {/* <Footer /> */}
        </Box>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
