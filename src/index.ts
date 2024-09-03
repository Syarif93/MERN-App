import express, { Request, Response } from "express";
import DBConnect from "./config/db";
import AuthController from "./controllers/AuthController";
import bodyParser from "body-parser";
import { config as dotenv } from "dotenv";

dotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));

// MongoDB Connection
DBConnect();

app.get("/", (req: Request, res: Response) => {
  res.send("Server Online!");
});

app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
