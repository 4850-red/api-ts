import { NextFunction, Request, Response } from 'express';
import pug from 'pug'

class DemoController {
  public loadPage = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render('demo')
    } catch (error) {
      next(error);
    }
  };
}

export default DemoController;
