import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  const authCtx = useContext(AuthContext);

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  useEffect(() => {
    if (authCtx) {
      const token = window.localStorage.getItem("token");
      if (token) {
        authCtx.updateAuth(true);
      }
    }
  }, [authCtx]);

  return routes;
}

export default App;
