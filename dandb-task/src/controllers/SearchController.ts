import { Request, Response } from 'express';
import { IQueryService } from '../interfaces';

export class SearchController {
  private queryService: IQueryService;

  constructor(queryService: IQueryService) {
    this.queryService = queryService;
  }

  public async searchHandler(req: Request, res: Response) {
    const query = typeof req.query.q === 'string' ? req.query.q : '';
    if (!query) {
      return res.status(400).send({ error: 'Query parameter is required and must be a string' });
    }

    try {
      let results = await this.queryService.search(query);

      // Filter out results with undefined title or url
      results = results.filter(result => result.title !== undefined && result.url !== undefined);

      this.queryService.saveQuery(query);
      res.json(results);

    } catch (error) {
      res.status(500).send({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  public async searchPostHandler(req: Request, res: Response) {
    const query = typeof req.body.query === 'string' ? req.body.query : '';
    if (!query) {
      return res.status(400).send({ error: 'Query parameter is required and must be a string' });
    }

    try {
      let results = await this.queryService.search(query);

      const additionalResults = await this.queryService.search(query);
      results = results.concat(additionalResults); // Add additional results


      const additionalResults1 = await this.queryService.search(query);
      results = results.concat(additionalResults1); // Add additional results


      const additionalResults2 = await this.queryService.search(query);
      results = results.concat(additionalResults2); // Add additional results


      const additionalResults3 = await this.queryService.search(query);
      results = results.concat(additionalResults3); // Add additional results

      // Filter out results with undefined title or url
      // results = results.filter(result => result.title !== undefined && result.url !== undefined);

      this.queryService.saveQuery(query);
      res.json(results.concat(additionalResults3));

    } catch (error) {
      res.status(500).send({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  public historyHandler(req: Request, res: Response) {
    const history = this.queryService.getHistory();
    // Reverse the history array to show the most recent search first
    res.json(history);
  }
}
