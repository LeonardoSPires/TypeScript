import express from "express";
import cors from "cors";
import despesasRouter from "./routes/despesas";
import carrosRouter from "./routes/carros";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/despesas", despesasRouter);
app.use("/carros", carrosRouter);

const PORT = 4000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
  });
}

export default app;