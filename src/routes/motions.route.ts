import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import MotionsController from '@/controllers/motions.controller';
import { Publisher, Node} from 'rclnodejs'

class MotorsRoute implements Routes {
  public path = '/motion'
  public router = Router()
  public motionsController: MotionsController

  // sets up routes and controllers
  // gets ROS2 node/publisher from server
  constructor(node: Node, pub: Publisher) {
    this.initializeRoutes();
    this.motionsController = new MotionsController(node, pub)
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.motionsController.getMotions)
    this.router.get(`${this.path}/:id(\\d+)`, this.motionsController.getMotionById)
  }
}

export default MotorsRoute;
