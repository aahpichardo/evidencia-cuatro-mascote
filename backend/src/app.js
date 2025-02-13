import express from "express";
import cors from "cors";
import morgan from "morgan";

import loginRoutes from "./routes/login.routes.js";
import registerRoutes from "./routes/register.routes.js";

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", loginRoutes);
app.use("/api", registerRoutes);

export default app;
