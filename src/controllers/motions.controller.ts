import { NextFunction, Request, Response } from 'express';
import { Motion } from '@/interfaces/motion.interface';
import motionService from '@/services/motions.service';
import { Publisher, Node} from 'rclnodejs'

class MotionsController {

  public node: Node
  public pub: Publisher<any>

  constructor(node: Node, pub: Publisher<any>) {
    this.pub = pub
    this.node = node
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

  public getMotionByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const motionId = Number(req.params.id);
      const findOneMotionData: Motion = await this.motionService.findMotionByName(motionName);

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
  }

}

export default MotionsController;
