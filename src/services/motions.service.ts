import { HttpException } from '@exceptions/HttpException';
import { Motion } from '@/interfaces/motion.interface';
import motionModel from '@/models/motion.model';
import { isEmpty } from '@utils/util';

class MotionService {
  public motions = motionModel;

  public async findAllMotions(): Promise<Motion[]> {
    const motions: Motion[] = this.motions
    return motions
  }

  public async findMotionById(motionId: number): Promise<Motion> {
    const findMotion: Motion = this.motions.find(motion => motion.id === motionId)
    if (!findMotion) throw new HttpException(409, "Motion doesn't exist")

    return findMotion;
  }

  public async findMotionByName(motionName: string): Promise<Motion> {
    const findMotion: Motion = this.motions.find(motion => motion.name.toLowerCase() === motionName.toLowerCase());
    if (!findMotion) throw new HttpException(409, "Motion doesn't exist")

    return findMotion
  }
}

export default MotionService
