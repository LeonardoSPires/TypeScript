import { Router, Request, Response } from "express";
import { Carro } from "../types/despesas";

const carros: Carro[] = [
  {
    id: 1,
    modelo: "Palio Attractive",
    placa: "ABC-1234",
    ano: 2017
  }
];
const router = Router();

// Criar carro
router.post("/", (req: Request<{}, {}, Carro>, res: Response<Carro>) => {
  const novoCarro: Carro = { ...req.body, id: Date.now() };
  carros.push(novoCarro);
  res.status(201).json(novoCarro);
});

// Listar carros
router.get("/", (_req: Request, res: Response<Carro[]>) => {
  res.json(carros);
});

// Editar carro
router.patch("/:id", (req: Request<{ id: string }, {}, Partial<Carro>>, res: Response) => {
  const id = Number(req.params.id);
  const carro = carros.find(c => c.id === id);
  if (!carro) return res.status(404).json({ error: "Carro não encontrado" });
  Object.assign(carro, req.body);
  res.json(carro);
});

// Excluir carro
router.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const index = carros.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Carro não encontrado" });
  carros.splice(index, 1);
  res.status(204).end();
});

export default router;