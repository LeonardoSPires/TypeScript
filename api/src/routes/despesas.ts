import { Router, Request, Response } from "express";
import { Despesa, CriarDespesaDTO } from "../types/despesas";

const despesas: Despesa[] = [];
const router = Router();

// Criar despesa
router.post("/", (req: Request<{}, {}, CriarDespesaDTO>, res: Response<Despesa>) => {
  const novaDespesa: Despesa = { ...req.body, id: Date.now() };
  despesas.push(novaDespesa);
  res.status(201).json(novaDespesa);
});

// Listar despesas
router.get("/", (req: Request, res: Response<Despesa[]>) => {
  let resultado = despesas;

  if (req.query.carroId) {
    const carroId = Number(req.query.carroId);
    resultado = resultado.filter(d => d.carroId === carroId);
  }
  if (req.query.tipo) {
    resultado = resultado.filter(d => d.tipo === req.query.tipo);
  }
  if (req.query.dataInicial) {
    resultado = resultado.filter(d => d.data >= String(req.query.dataInicial));
  }
  if (req.query.dataFinal) {
    resultado = resultado.filter(d => d.data <= String(req.query.dataFinal));
  }

  res.json(resultado);
});

// Editar despesa
router.patch("/:id", (req: Request<{ id: string }, {}, Partial<Despesa>>, res: Response) => {
  const id = Number(req.params.id);
  const despesa = despesas.find(d => d.id === id);
  if (!despesa) return res.status(404).json({ error: "Despesa não encontrada" });
  Object.assign(despesa, req.body);
  res.json(despesa);
});

// Excluir despesa
router.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const index = despesas.findIndex(d => d.id === id);
  if (index === -1) return res.status(404).json({ error: "Despesa não encontrada" });
  despesas.splice(index, 1);
  res.status(204).end();
});

export default router;