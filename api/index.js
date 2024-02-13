import express from "express";
import users from "./routes/users.js";
import "dotenv/config";
import cors from "cors";

const app = express();

const allowedOrigins = ["*"];

const options = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Silence is Golden");
});

app.use("/api/users", users);

app.listen(3000, () =>
  console.log("Your API is available at http://localhost:3000/api")
);
