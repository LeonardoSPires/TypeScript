import request from 'supertest';
import app from '../index';

afterEach(() => {
  // Limpeza global após cada teste
});

describe('GET /despesas', () => {
  it('deve retornar uma lista de despesas', async () => {
    const response = await request(app).get('/despesas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /despesas', () => {
  it('deve criar uma nova despesa', async () => {
    const novaDespesa = {
      tipo: "manutenção",
      descricao: "Troca de óleo",
      valor: 120,
      data: "2026-02-23",
      km: 45000,
      carroId: 1
    };
    const response = await request(app).post('/despesas').send(novaDespesa);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.tipo).toBe("manutenção");
  });
});

let despesaId: number;

beforeAll(async () => {
  // Cria uma despesa para usar nos testes de PATCH e DELETE
  const response = await request(app).post('/despesas').send({
    tipo: "manutenção",
    descricao: "Troca de pneus",
    valor: 800,
    data: "2026-02-23",
    km: 50000,
    carroId: 1
  });
  despesaId = response.body.id;
});

it('deve editar uma despesa existente', async () => {
  const response = await request(app)
    .patch(`/despesas/${despesaId}`)
    .send({ descricao: "Troca de pneus dianteiros" });
  expect(response.status).toBe(200);
  expect(response.body.descricao).toBe("Troca de pneus dianteiros");
});

it('deve retornar erro ao editar despesa inexistente', async () => {
  const response = await request(app)
    .patch('/despesas/999999')
    .send({ descricao: "Inexistente" });
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('error');
});

it('deve deletar uma despesa existente', async () => {
  const response = await request(app).delete(`/despesas/${despesaId}`);
  expect(response.status).toBe(204);
});

it('deve retornar erro ao deletar despesa inexistente', async () => {
  const response = await request(app).delete('/despesas/999999');
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('error');
});