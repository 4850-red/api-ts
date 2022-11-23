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

  // called from getMotionById in motions.controller
  public async findMotionById(motionId: number): Promise<Motion> {
    console.log(`motionId: ${motionId}`)
    const findMotion: Motion = this.motions.find(motion => motion.id === motionId)
    if (!findMotion) throw new HttpException(409, "Motion doesn't exist")

    return findMotion;
  }

  // called from getMotionByName in motions.controller
  public async findMotionByName(motionName: String): Promise<Motion> {
    console.log(`motionName: ${motionName}`)
    const findMotion: Motion = this.motions.find(motion => motion.name.toLowerCase() === motionName.toLowerCase());
    if (!findMotion) throw new HttpException(409, "Motion doesn't exist")

    return findMotion
  }
}

export default MotionService
