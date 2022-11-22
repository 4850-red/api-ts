import { NextFunction, Request, Response } from 'express';
import { Motion } from '@/interfaces/motion.interface';
import motionService from '@/services/motions.service';

class MotionsController {
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

      res.status(200).json({ data: findOneMotionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

}

export default MotionsController;
