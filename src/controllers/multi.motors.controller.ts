import { NextFunction, Request, Response } from 'express';
import { Motor } from '@/interfaces/motor.interface';
import { MotorReq } from '@interfaces/motor.req.interface'
import MotorService from '@/services/motors.service'
import { Publisher, Node, Client} from 'rclnodejs'

class MultiMotorsController {


  public motorService = new MotorService();
  
  public node: Node
  public client: Client<any>

  // gets node/publisher from route
  constructor(node: Node, client: Client<any>){
    this.node = node
    this.client = client
  }

  public handler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    let motorsReq = (req.body.motors) as MotorReq[]
    // error no body
    if(motorsReq == undefined) return

    let roundedMotorsReq = await this.roundMotorsReq(motorsReq, next)

    let multiMsg = {
      positions: roundedMotorsReq
    }

    this.client.sendRequest(multiMsg, (callback) => {
      console.log(callback)
    })
    this.node.spinOnce()

    res.status(200).json({ message: 'setMultiMotorsPos', multiMsg: multiMsg})
  }

  public getMotorById = async (motorId: number, next: NextFunction): Promise<Motor | void> => {
    try {
      const findOneMotorData: Motor = await this.motorService.findMotorById(motorId)
      return new Promise( (resolve, reject) => {
        resolve(findOneMotorData)
      })
    } catch (error) {
      next(error)
    }
  }
  private roundMotorPosTorq = (motor: Motor, newPosition: number, newTorq: number) => {

    // rounds up/down accordingly
    if (newPosition < motor.min) newPosition = motor.min
    if (newPosition > motor.max) newPosition = motor.max

    if (newTorq == undefined) newTorq = 0
    if (newTorq < 0) newTorq = 0
    if (newTorq > 4) newTorq = 4

    return {newPosition: newPosition, newTorq: newTorq}

  }

  private roundMotorsReq = async(motorsReq: MotorReq[], next: NextFunction): Promise<MotorReq[]> => {
  
    return new Promise(async (resolve, reject) => {
      for(let motorReq of motorsReq){
        let motor: Motor | void
        motor = await this.getMotorById(motorReq.id, next)
        // if(motor == undefined) resolve(motorsReq)
        let roundedPosTorq = this.roundMotorPosTorq(motor as Motor, motorReq.pos, motorReq.torq)


        motorReq.pos = roundedPosTorq.newPosition
        motorReq.torq = roundedPosTorq.newTorq
        
      }
      resolve(motorsReq)
    })
  }
}

export default MultiMotorsController;
