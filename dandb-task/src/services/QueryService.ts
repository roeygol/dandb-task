import axios from 'axios';
import fs from 'fs';
import { IQueryService, QueryResult } from '../interfaces';

export class QueryService implements IQueryService {
  private historyFilePath: string;
  private queryHistory: string[] = [];

  constructor(historyFilePath: string) {
    this.historyFilePath = historyFilePath;
    this.loadHistory();
  }

  private loadHistory() {
    if (fs.existsSync(this.historyFilePath)) {
      try {
        this.queryHistory = JSON.parse(fs.readFileSync(this.historyFilePath, 'utf-8'));
      } catch (error) {
        console.error('Error reading query history file:', error);
        this.queryHistory = [];
      }
    }
  }

  private saveHistory() {
    try {
      fs.writeFileSync(this.historyFilePath, JSON.stringify(this.queryHistory, null, 2));
    } catch (error) {
      console.error('Error saving query history:', error);
    }
  }

  public async search(query: string): Promise<QueryResult[]> {
    try {
      const response = await axios.get(`http://api.duckduckgo.com/?q=${query}&format=json`);
      return response.data.RelatedTopics?.map((item: any) => ({
        title: item.Text,
        url: item.FirstURL
      })) || [];
    } catch (error) {
      console.error('Error fetching data from DuckDuckGo:', error);
      throw new Error('Error fetching data from DuckDuckGo');
    }
  }

  public getHistory(): string[] {
    return this.queryHistory;
  }

  public saveQuery(query: string): void {
    if (!this.queryHistory.includes(query)) {
      this.queryHistory.push(query);
      this.saveHistory();
    }
  }
}
