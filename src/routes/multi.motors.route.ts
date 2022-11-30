import { Router } from 'express';
import MultiMotorsController from '@/controllers/multi.motors.controller';
import { Routes } from '@interfaces/routes.interface';
import { Publisher, Node, Client} from 'rclnodejs'

class MotorsRoute implements Routes {
  public path = '/multimotor';
  public router = Router();
  public multiMotorsController: MultiMotorsController

  // sets up routes and controllers
  // gets ROS2 node/publisher from server
  constructor(node: Node, client: Client<any>) {
    this.multiMotorsController = new MultiMotorsController(node, client);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.multiMotorsController.handler);
  }
}

export default MotorsRoute;
