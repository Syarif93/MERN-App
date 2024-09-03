import express, { Request, Response } from "express";
import DBConnect from "./config/db";
import AuthController from "./controllers/AuthController";
import bodyParser from "body-parser";
import { config as dotenv } from "dotenv";
import path from "path";
import cors from "cors";

dotenv();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join("app")));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());

// MongoDB Connection
DBConnect();

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "app", "index.html"));
});

app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
