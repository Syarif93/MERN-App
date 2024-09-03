import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Label, TextInput } from "flowbite-react";
import axios, { AxiosError } from "axios";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx && authCtx.auth) {
      navigate("/");
    }
  }, [authCtx]);

  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", data);
      if (res.status === 200) {
        window.localStorage.setItem("token", res.data.data.token);
        authCtx?.updateAuth(true);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message);
        return;
      }

      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[420px]">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Login
        </h5>
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              id="email1"
              type="email"
              placeholder="test@example.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              id="password1"
              type="password"
              placeholder="******"
              required
            />
          </div>
          <Button type="submit">Submit</Button>
          <Link to="/register" className="text-blue-500">
            Login
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default Login;
