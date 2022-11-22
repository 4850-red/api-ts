import { Router } from 'express';
import MotorsController from '@/controllers/motors.controller';
import { Routes } from '@interfaces/routes.interface';

class MotorsRoute implements Routes {
  public path = '/motor';
  public router = Router();
  public motorsController = new MotorsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.motorsController.getMotors);
    this.router.get(`${this.path}/:id(\\d+)`, this.motorsController.getMotorById);
    this.router.get(`${this.path}/:id(\\d+)/:position(\\d+)`, this.motorsController.setMotorPosition);
  }
}

export default MotorsRoute;
