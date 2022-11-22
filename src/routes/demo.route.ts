import { Router } from 'express';
import DemoController from '@controllers/demo.controller';
import { Routes } from '@interfaces/routes.interface';

class DemoRoute implements Routes {
  public path = '/demo';
  public router = Router();
  public demoController = new DemoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.demoController.loadPage);
  }
}

export default DemoRoute;
