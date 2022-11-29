import { NextFunction, Request, Response } from 'express';
import { Motion } from '@/interfaces/motion.interface';
import motionService from '@/services/motions.service';
import { Publisher, Node} from 'rclnodejs'

class MotionsController {

  public node: Node
  public pubNum: Publisher<any>
  public pubName: Publisher<any>

  constructor(node: Node, pubNum: Publisher<any>, pubName: Publisher<any>) {
    this.pubNum = pubNum
    this.pubName = this.pubName
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
      const motionId = Number(req.params.key);
      const findOneMotionData: Motion = await this.motionService.findMotionById(motionId);

      let motionRemocon: number = findOneMotionData.id

      let motionMsg: object

      if(motionRemocon == 99) {
        motionMsg = {
          motion_name: findOneMotionData.name
        }
        this.pubName.publish(motionMsg)
      } else {
        motionMsg = {
          btn_code: motionRemocon
        }
        this.pubNum.publish(motionMsg)
      }

      this.node.spinOnce()

      res.status(200).json({ data: findOneMotionData, message: 'callMotionById', motionMsg: motionMsg });
    } catch (error) {
      next(error);
    }
  };

  public getMotionByKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let motionKey: string = req.params.key

      if(isNaN(parseInt(motionKey))) this.getMotionByName(req, res, next)
      else this.getMotionById(req, res, next)

    } catch (error) {
      next(error)
    }
  }

  public getMotionByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let motionName: String = req.params.key;
      const findOneMotionData: Motion = await this.motionService.findMotionByName(motionName);

      let motionRemocon: number = findOneMotionData.id

      let motionMsg: object

      if(motionRemocon == 99) {
        motionMsg = {
          motion_name: findOneMotionData.name
        }
        this.pubName.publish(motionMsg)
      } else {
        motionMsg = {
          btn_code: motionRemocon
        }
        this.pubNum.publish(motionMsg)
      }
      this.node.spinOnce()

      res.status(200).json({ data: findOneMotionData, message: 'callMotionByName', motionMsg: motionMsg});
    } catch (error) {
      next(error);
    }
  }

}

export default MotionsController;
