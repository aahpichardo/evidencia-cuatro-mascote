import express from "express";
import cors from "cors";
import morgan from "morgan";

import loginRoutes from "./routes/login.routes.js";
import registerRoutes from "./routes/register.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", loginRoutes);
app.use("/api", registerRoutes);

export default app;