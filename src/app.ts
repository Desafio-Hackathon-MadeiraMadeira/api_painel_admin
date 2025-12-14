import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API rodando 🔥");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor na porta ${process.env.PORT || 3000}`);
});
