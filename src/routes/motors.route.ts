import { Router } from 'express';
import MotorsController from '@/controllers/motors.controller';
import { Routes } from '@interfaces/routes.interface';
import { Publisher, Node} from 'rclnodejs'

class MotorsRoute implements Routes {
  public path = '/motor';
  public router = Router();
  public motorsController: MotorsController

  // sets up routes and controllers
  // gets ROS2 node/publisher from server
  constructor(node: Node, pub: Publisher) {
    this.motorsController = new MotorsController(node, pub);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.motorsController.getMotors);
    this.router.get(`${this.path}/:id(\\d+)`, this.motorsController.getMotorById);
    this.router.get(`${this.path}/:id(\\d+)/:position(\\d+)`, this.motorsController.setMotorPosition);
  }
}

export default MotorsRoute;
