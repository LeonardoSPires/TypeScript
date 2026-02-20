import express, { Request, Response } from "express";
import cors from "cors";
import { Todo, CreateTodoDTO, UpdateTodoDTO } from "./types/todo";

const app = express();
app.use(cors());
app.use(express.json());

const todos: Todo[] = [
  { id: 1, title: "Estudar TypeScript", completed: false },
];

app.get("/todos", (req: Request, res: Response) => {
  res.json(todos);
});

app.post(
  "/todos",
  (req: Request<{}, {}, CreateTodoDTO>, res: Response<Todo>) => {
    const { title } = req.body;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
  }
);

app.patch(
  "/todos/:id",
  (req: Request<{ id: string }, {}, UpdateTodoDTO>, res: Response<Todo>) => {
    const id = Number(req.params.id);
    const todo = todos.find((t) => t.id === id);

    if(!todo) {
      return res.status(404).end();
    }

    if (typeof req.body.title === "string") {
      todo.title = req.body.title;
    }
    if (typeof req.body.completed === "boolean") {
      todo.completed = req.body.completed;
    }

    res.json(todo);
  }
);

app.delete("/todos/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).end();
  }

  todos.splice(index, 1);
  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

