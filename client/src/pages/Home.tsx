import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx && !authCtx.auth) {
      navigate("/login");
    }
  }, [authCtx]);

  return <div>{authCtx?.auth.toString()}</div>;
};

export default Home;
