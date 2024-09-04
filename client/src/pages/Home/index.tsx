import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Navbar } from "flowbite-react";
import { AuthContext } from "../../AuthProvider";
import { Calendar } from "./components/Calendar";
import { eventsMock } from "../data/events-mock";
import CreateMessage from "./CreateMessage";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx && !authCtx.auth) {
      navigate("/login");
    }
  }, [authCtx]);

  const [isOpenCreate, setIsOpenCreate] = useState(false);

  return (
    <Fragment>
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
            <div className="flex justify-between items-center">
              <h5 className="text-gray-900 dark:text-white">Events</h5>
              <Button pill color="blue" onClick={() => setIsOpenCreate(true)}>
                Create
              </Button>
            </div>
            <hr className="bg-gray-200 mb-5" />

            <Calendar date={new Date()} events={eventsMock} />
          </Card>
        </div>
      </div>

      {isOpenCreate && (
        <CreateMessage isOpen={isOpenCreate} setIsOpen={setIsOpenCreate} />
      )}
    </Fragment>
  );
};

export default Home;
