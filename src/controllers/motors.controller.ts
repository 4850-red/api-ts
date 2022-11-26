import { NextFunction, Request, Response } from 'express';
import { Motor } from '@/interfaces/motor.interface';
import MotorService from '@/services/motors.service'
import { Publisher, Node, Client} from 'rclnodejs'

class MotorsController {


  public motorService = new MotorService();

  // ROS2 Node: api_node
  // Publisher: Motor
  public node: Node
  public pub: Publisher<any>
  public client: Client<any>

  // gets node/publisher from route
  constructor(node: Node, pub: Publisher<any>, client: Client<any>){
    this.node = node
    this.pub = pub
    this.client = client
  }

  public getMotors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMotorsData: Motor[] = await this.motorService.findAllMotors();

      res.status(200).json({ data: findAllMotorsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMotorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const motorId = Number(req.params.id)
      const findOneMotorData: Motor = await this.motorService.findMotorById(motorId)

      res.status(200).json({ data: findOneMotorData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public setMotorPosition = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const motorId = Number(req.params.id)
      const findOneMotorData: Motor = await this.motorService.findMotorById(motorId)
      const smartPosition = req.params.position
      const newMotorPos = this.convertMotorPosition(findOneMotorData, smartPosition)
      
      let motorMsg = {
        id: motorId,
        pos: newMotorPos,
        torqlevel: 1
      }

      // this.client.sendRequest(
      //   {
      //   positions: [
      //     motorMsg, motorMsg2, motorMsg3
      //   ]
      //   }, (response) => {
      //     console.log(response)
      //   })

      // this.pub.publish(motorMsg)
      // this.node.spinOnce()

      res.status(200).json({ data: findOneMotorData, message: 'setMotorPos', smartPosition: smartPosition, rawPosition: newMotorPos})

    } catch (error) {
      next(error)
    }
  }

  private convertMotorPosition = (motor: Motor, newPosition: string) => {
    let smartPosition: number = Number(newPosition)
    let div = motor.inverted ? motor.max : motor.min
    smartPosition = motor.inverted ? smartPosition : 100-smartPosition
    let rawPosition = smartPosition/div * 254

    console.table({
      newPosition: newPosition,
      div: div,
      smartPosition: smartPosition,
      rawPosition: rawPosition
    })

    return rawPosition

  }
}

export default MotorsController;
