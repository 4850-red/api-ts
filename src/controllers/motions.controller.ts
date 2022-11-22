import { NextFunction, Request, Response } from 'express';
import { Motion } from '@/interfaces/motion.interface';
import motionService from '@/services/motions.service';
import { Publisher, Node} from 'rclnodejs'

class MotionsController {

  public node: Node
  public pub: Publisher

  constructor(node: Node, pub: Publisher) {
    this.pub = pub
  }

  public motionService = new motionService();

  public getMotions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: Motion[] = await this.motionService.findAllMotions();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMotionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const motionId = Number(req.params.id);
      const findOneMotionData: Motion = await this.motionService.findMotionById(motionId);

      let motionName: String = findOneMotionData.name

      let motionMsg = {
        motion_name: motionName
      }

      this.pub.publish(motionMsg)
      this.node.spinOnce()

      res.status(200).json({ data: findOneMotionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

}

export default MotionsController;
