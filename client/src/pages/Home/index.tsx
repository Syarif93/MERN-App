import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Navbar } from "flowbite-react";
import { AuthContext } from "../../AuthProvider";
import Messages from "./Messages";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx && !authCtx.auth) {
      navigate("/login");
    }
  }, [authCtx]);

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="#">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            MERN App
          </span>
        </Navbar.Brand>
        <Button
          pill
          onClick={() => {
            window.localStorage.removeItem("token");
            authCtx?.updateAuth(false);
          }}
        >
          Logout
        </Button>
      </Navbar>

      <div className="px-5 py-5">
        <Card>
          <Messages />
        </Card>
      </div>
    </div>
  );
};

export default Home;
