export interface QueryResult {
    title: string;
    url: string;
  }
  
  export interface IQueryService {
    search(query: string): Promise<QueryResult[]>;
    getHistory(): string[];
    saveQuery(query: string): void;
  }
  