import request from 'supertest';
import express from 'express';
import { Todo } from '../types/todo';
import app from '../index';

describe('GET /todos', () => {
  it('deve retornar uma lista de tarefas', async () => {
    const response = await request(app).get('/todos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('completed');
  });
});
