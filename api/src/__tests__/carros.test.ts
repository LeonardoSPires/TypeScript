import request from 'supertest';
import app from '../index';

afterEach(() => {
  // Limpeza global após cada teste
});

describe('Rotas de carros', () => {
  it('deve criar um novo carro', async () => {
    const novoCarro = {
      modelo: "Onix",
      placa: "ABC-1234",
      ano: 2020
    };
    const response = await request(app).post('/carros').send(novoCarro);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.modelo).toBe("Onix");
  });

  it('deve listar os carros', async () => {
    const response = await request(app).get('/carros');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('modelo');
    expect(response.body[0]).toHaveProperty('placa');
    expect(response.body[0]).toHaveProperty('ano');
  });
});

let carroId: number;

beforeAll(async () => {
  // Cria um carro para usar nos testes de PATCH e DELETE
  const response = await request(app).post('/carros').send({
    modelo: "Fiesta",
    placa: "XYZ-9876",
    ano: 2018
  });
  carroId = response.body.id;
});

it('deve editar um carro existente', async () => {
  const response = await request(app)
    .patch(`/carros/${carroId}`)
    .send({ modelo: "Fiesta Titanium" });
  expect(response.status).toBe(200);
  expect(response.body.modelo).toBe("Fiesta Titanium");
});

it('deve retornar erro ao editar carro inexistente', async () => {
  const response = await request(app)
    .patch('/carros/999999')
    .send({ modelo: "Inexistente" });
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('error');
});

it('deve deletar um carro existente', async () => {
  const response = await request(app).delete(`/carros/${carroId}`);
  expect(response.status).toBe(204);
});

it('deve retornar erro ao deletar carro inexistente', async () => {
  const response = await request(app).delete('/carros/999999');
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('error');
});