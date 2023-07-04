import express, { Application, Request, Response } from "express";
import cors from "cors";

import UserRoutes from "./routes/UserRoutes";
import CommunityRoutes from "./routes/CommunityRoutes";
import PostRoutes from "./routes/PostRoutes";

const app: Application = express();

// Apply middlewares
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get("/healthz", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/user", UserRoutes);
app.use("/community", CommunityRoutes);
app.use("/post", PostRoutes);

export default app;
