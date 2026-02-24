import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "./global.css";

type Despesa = {
  id: number;
  tipo: string;
  descricao: string;
  valor: number;
  data: string;
  km?: number;
  carroId: number;
  comprovanteUrl?: string;
};

const tipos = [
  "combustível",
  "manutenção",
  "seguro",
  "imposto",
  "outro"
];

function App() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [form, setForm] = useState({
    tipo: "",
    descricao: "",
    valor: "",
    data: "",
    km: "",
    carroId: "1"
  });

  function fetchDespesas() {
    fetch("http://localhost:4000/despesas")
      .then(res => res.json())
      .then(setDespesas);
  }

  useEffect(() => {
    fetchDespesas();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch("http://localhost:4000/despesas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        valor: Number(form.valor),
        km: form.km ? Number(form.km) : undefined,
        carroId: Number(form.carroId)
      })
    })
      .then(res => res.json())
      .then(() => {
        setForm({ tipo: "", descricao: "", valor: "", data: "", km: "", carroId: "1" });
        fetchDespesas();
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-10 ">
        <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center">Despesas do Carro</h1>

        {/* Imagem + Formulário */}
        <div className="flex flex-col md:flex-row gap-8 mb-8 items-center justify-center">
          {/* Imagem do carro */}
          <img
            src="/palio.jpg"
            alt="Palio Attractive"
            className="rounded shadow object-cover md:h-[350px] md:w-[auto] w-full"
            style={{ maxHeight: 350, maxWidth: 360 }}
          />

          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-4 rounded shadow md:h-[350px] md:w-[350px] w-full flex flex-col justify-center"
            style={{ minWidth: 220, maxWidth: 350 }}
          >
            <select
              name="tipo"
              className="border rounded p-2"
              value={form.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Tipo</option>
              {tipos.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            <input
              name="descricao"
              className="border rounded p-2"
              placeholder="Descrição"
              value={form.descricao}
              onChange={handleChange}
              required
            />
            <input
              name="valor"
              className="border rounded p-2"
              placeholder="Valor"
              type="number"
              min="0"
              value={form.valor}
              onChange={handleChange}
              required
            />
            <input
              name="data"
              className="border rounded p-2"
              type="date"
              value={form.data}
              onChange={handleChange}
              required
            />
            <input
              name="km"
              className="border rounded p-2"
              placeholder="KM (opcional)"
              type="number"
              min="0"
              value={form.km}
              onChange={handleChange}
            />
            <input
              name="carroId"
              className="border rounded p-2"
              placeholder="ID do carro"
              type="number"
              min="1"
              value={form.carroId}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2 font-bold hover:bg-blue-700 transition"
            >
              Adicionar Despesa
            </button>
          </form>
        </div>

        {/* Lista de despesas */}
        <ul className="divide-y divide-gray-200">
          {despesas.map(d => (
            <li key={d.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-semibold text-gray-800">{d.tipo}</span>
                <span className="ml-2 text-gray-500">{d.descricao}</span>
                <div className="text-xs text-gray-400">{d.data} {d.km && `| ${d.km} km`}</div>
              </div>
              <div className="mt-2 sm:mt-0 text-right">
                <span className="text-lg font-bold text-green-600">R$ {d.valor.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;