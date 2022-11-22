import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import MotionsController from '@/controllers/motions.controller';

class MotorsRoute implements Routes {
  public path = '/motion';
  public router = Router();
  public motionsController = new MotionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.motionsController.getMotions);
    this.router.get(`${this.path}/:id(\\d+)`, this.motionsController.getMotionById);
  }
}

export default MotorsRoute;
