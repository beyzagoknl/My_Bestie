import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/user", userRouter);

export default app;
