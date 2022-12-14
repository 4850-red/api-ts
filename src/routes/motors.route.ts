import { Router } from 'express';
import MotorsController from '@/controllers/motors.controller';
import { Routes } from '@interfaces/routes.interface';
import { Publisher, Node, Client} from 'rclnodejs'

class MotorsRoute implements Routes {
  public path = '/motor';
  public router = Router();
  public motorsController: MotorsController

  // sets up routes and controllers
  // gets ROS2 node/publisher from server
  constructor(node: Node, pub: Publisher<any>) {
    this.motorsController = new MotorsController(node, pub);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.motorsController.handler);
  }
}

export default MotorsRoute;
