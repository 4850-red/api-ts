import { NextFunction, Request, Response } from 'express';
import { Motor } from '@/interfaces/motor.interface';
import MotorService from '@/services/motors.service'
import { Publisher, Node, Client} from 'rclnodejs'
import { Type } from 'class-transformer';

class MotorsController {


  public motorService = new MotorService();

  // ROS2 Node: api_node
  // Publisher: Motor
  public node: Node
  public pub: Publisher<any>

  // gets node/publisher from route
  constructor(node: Node, pub: Publisher<any>){
    this.node = node
    this.pub = pub
  }

  public handler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const torqMin = 0 // higher torq
    const torqMax = 4 // lower torq

    let id: any = (req.query.id)
    let position: any = (req.query.pos) || (req.query.position)
    let torq: any = (req.query.torq) || (req.query.torque)

    // get all motors
    // - id doesnt exist
    // - ignores if position and torq exist
    if(id == undefined) {
      return this.getMotors(res, next)
    }

    id = Number(id)
    // get motor info by id
    // - only id exists
    // - position and torq dont exist
    if(position == undefined && torq == undefined){
      return this.getMotorById(id, res, next)
    } 

    // sets motor position
    // - id exists
    // - position exists
    // - torq optional
    if(position != undefined) {
      position = Number(position)
      // - torq exist
      if(torq !== undefined) {
        torq = Number(torq)
        if(torq < torqMin) torq = torqMin
        if(torq > torqMax) torq = torqMax
      } else torq = 0
      return this.setMotorPosition(id, position, torq, res, next)
    }
  }

  public getMotors = async (res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMotorsData: Motor[] = await this.motorService.findAllMotors();

      res.status(200).json({ data: findAllMotorsData, message: 'getAllMotors' });
    } catch (error) {
      next(error);
    }
  };

  public getMotorById = async (motorId: number, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findOneMotorData: Motor = await this.motorService.findMotorById(motorId)

      res.status(200).json({ data: findOneMotorData, message: 'getMotorInfo' })
    } catch (error) {
      next(error)
    }
  }

  public setMotorPosition = async (motorId: number, newPosition: number, torq: number, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findOneMotorData: Motor = await this.motorService.findMotorById(motorId)
      newPosition = this.convertMotorPosition(findOneMotorData, newPosition)
      
      let motorMsg = {
        id: motorId,
        pos: newPosition,
        torqlevel: torq
      }

      this.pub.publish(motorMsg)
      this.node.spinOnce()

      let oldPosition = findOneMotorData.position
      this.motorService.updateMotorPos(motorId, newPosition)

      res.status(200).json({ data: findOneMotorData, message: 'setMotorPos', oldPosition: oldPosition, newPosition: newPosition, torq: torq})

    } catch (error) {
      next(error)
    }
  }

  private convertMotorPosition = (motor: Motor, newPosition: number) => {

    // rounds up/down accordingly
    if (newPosition < motor.min) newPosition = motor.min
    if (newPosition > motor.max) newPosition = motor.max

    return newPosition

  }
}

export default MotorsController;
