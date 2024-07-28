import express from 'express';
import request from 'supertest';
import { SearchController } from '../controllers/SearchController';
import { IQueryService } from '../interfaces';
import { QueryResult } from '../interfaces';

// Mock implementation of IQueryService
class MockQueryService implements IQueryService {
  private history: string[] = [];

  async search(query: string): Promise<QueryResult[]> {
    return [{ title: 'Mock Result', url: 'http://mockurl.com' }];
  }

  saveQuery(query: string): void {
    this.history.push(query);
  }

  getHistory(): string[] {
    return this.history;
  }

  clearHistory() {
    this.history = [];
  }
}

const app = express();
app.use(express.json());

const mockQueryService = new MockQueryService();
const controller = new SearchController(mockQueryService);

app.get('/search', (req, res) => controller.searchHandler(req, res));
app.post('/search', (req, res) => controller.searchPostHandler(req, res));
app.get('/history', (req, res) => controller.historyHandler(req, res));

describe('SearchController', () => {
  beforeEach(() => {
    mockQueryService.clearHistory(); // Clear history before each test
  });

  test('GET /search should return search results', async () => {
    const response = await request(app).get('/search?q=test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ title: 'Mock Result', url: 'http://mockurl.com' }]);
  });

  test('GET /search should return 400 if query is missing', async () => {
    const response = await request(app).get('/search');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Query parameter is required and must be a string' });
  });

  test('POST /search should return search results', async () => {
    const response = await request(app).post('/search').send({ query: 'test' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ title: 'Mock Result', url: 'http://mockurl.com' }]);
  });

  test('POST /search should return 400 if query is missing', async () => {
    const response = await request(app).post('/search').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Query parameter is required and must be a string' });
  });

  test('GET /history should return query history', async () => {
    mockQueryService.saveQuery('test');
    const response = await request(app).get('/history');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['test']);
  });
});
