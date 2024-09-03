import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Label, TextInput } from "flowbite-react";
import axios, { AxiosError } from "axios";

const Register = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx && authCtx.auth) {
      navigate("/");
    }
  }, [authCtx]);

  const [data, setData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/register", data);
      if (res.status === 201) {
        navigate("/login");
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
          Register
        </h5>
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              id="name"
              type="text"
              placeholder="Name..."
              required
            />
          </div>
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
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default Register;
