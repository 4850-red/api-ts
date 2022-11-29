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
  constructor(node: Node, pubNum: Publisher<any>, pubName: Publisher<any>) {
    this.motionsController = new MotionsController(node, pubNum, pubName);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.motionsController.getMotions)
    this.router.get(`${this.path}/:key`, this.motionsController.getMotionByKey)
  }
}

export default MotorsRoute;
