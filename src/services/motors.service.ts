import { HttpException } from '@exceptions/HttpException';
import { Motor } from '@/interfaces/motor.interface';
import motorModel from '@/models/motor.model';
import { isEmpty } from '@utils/util';

class MotorService {
  public motors = motorModel;

  public async findAllMotors(): Promise<Motor[]> {
    const motors: Motor[] = this.motors;
    return motors;
  }

  public async findMotorById(motorId: number): Promise<Motor> {
    const findMotor: Motor = this.motors.find(motor => motor.id === motorId);
    if (!findMotor) throw new HttpException(409, "Motor doesn't exist");

    return findMotor;
  }
}

export default MotorService;
