import express from "express";
import Router from "./Routes/user-route.js";
import { db } from "./lib/db.js";
import { config } from "dotenv";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", Router);

const PORT = process.env.PORT || 5003;
config();
app.listen(PORT, () => {
  db();
  console.log(`Server running successfully at ${PORT}`);
});
