import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/todos");
        const data: Todo[] = await res.json();
        setTodos(data);
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <main>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;