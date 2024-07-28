import fs from 'fs';
import { QueryService } from '../services/QueryService';
import { QueryResult } from '../interfaces';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('QueryService', () => {
  const historyFilePath = 'test-history.json';
  let queryService: QueryService;

  beforeEach(() => {
    queryService = new QueryService(historyFilePath);
  });

  afterEach(() => {
    if (fs.existsSync(historyFilePath)) {
      fs.unlinkSync(historyFilePath);
    }
  });

  test('should initialize with empty history if no history file exists', () => {
    expect(queryService.getHistory()).toEqual([]);
  });

  test('should save and retrieve query history', () => {
    queryService.saveQuery('test query');
    expect(queryService.getHistory()).toContain('test query');
  });

  test('should fetch search results', async () => {
    const mockResponse = {
      data: {
        RelatedTopics: [
          { Text: 'Test Result', FirstURL: 'http://example.com' }
        ]
      }
    };
    mockedAxios.get.mockResolvedValue(mockResponse);
  
    const results = await queryService.search('test query');
    expect(results).toEqual([
      { title: 'Test Result', url: 'http://example.com' }
    ]);
  });
  

  test('should handle errors in search', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(queryService.search('test query')).rejects.toThrow('Error fetching data from DuckDuckGo');
  });
});
