import { NextFunction, Request, Response } from 'express';
import { Motor } from '@/interfaces/motor.interface';
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
    let motorsReq = req.body.motors

    // error no body
    if(motorsReq == undefined) return

    let multiMsg = {
      positions: [
        motorsReq
      ]
    }

    this.client.sendRequest(multiMsg)
    this.node.spinOnce()

    res.status(200).json({ message: 'setMultiMotorsPos', multiMsg: multiMsg})


  }
}

export default MultiMotorsController;
