import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { QueryService } from './services/QueryService';
import { SearchController } from './controllers/SearchController';

const cors = require('cors');

export class App {
  public app: Application;
  private PORT = 3001;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware() {
    this.app.use(bodyParser.json());
  }

  private configureRoutes() {
    const historyFilePath = path.join(__dirname, 'query-history.json');
    const queryService = new QueryService(historyFilePath);
    const searchController = new SearchController(queryService);

    this.app.get('/search', (req, res) => searchController.searchHandler(req, res));
    this.app.post('/search', (req, res) => searchController.searchPostHandler(req, res));
    this.app.get('/history', (req, res) => searchController.historyHandler(req, res));
  }

  public start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}
