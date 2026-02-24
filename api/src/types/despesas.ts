export type Carro = {
    id: number;
    modelo: string;
    placa: string;
    ano: number;
};

export type Despesa = {
    id: number;
    tipo: "combustível" | "manutenção" | "seguro" | "imposto" | "outro";
    descricao: string;
    valor: number;
    data: string;
    Km?: number;
    carroId: number;
    comprovanteUrl?: string;
};

export type CriarDespesaDTO = {
  tipo: "combustível" | "manutenção" | "seguro" | "imposto" | "outro";
  descricao: string;
  valor: number;
  data: string; // formato ISO
  km?: number;
  carroId: number;
  comprovanteUrl?: string;
};