import App from '@/app';
import IndexRoute from '@routes/index.route';
import MotorsRoute from '@routes/motors.route';
import MotionsRoute from '@routes/motions.route';
import validateEnv from '@utils/validateEnv';
import DemoRoute from './routes/demo.route';
validateEnv();

import rclnodejs, { Publisher, MessageType, Client, Node, ServicesMap} from 'rclnodejs'

const nodeName = 'api_node'
var node: Node

var motorPublisher: Publisher<any>
var motionNumPublisher: Publisher<any>
var motionNamePublisher: Publisher<any>

const motorMsgType: MessageType<any> = 'uxa_sam_msgs/msg/PositionMove'
const motorTopic = 'uxa_sam_driver/position_move'

const motionNumMsgType: MessageType<any> = 'uxa_uic_msgs/msg/Remocon'
const motionNumTopic = 'uic_driver_remocon'

const motionNameMsgType: MessageType<any> = 'uxa_uic_msgs/msg/Motion'
const motionNameTopic = 'uic_driver_motion'

var motorClient: Client<any>

const motorServiceMap: any = 'uxa_sam_msgs/srv/MultiMove'
const motorServiceName: string = 'uxa_sam_driver/services/multimove'

process.on('SIGINT', () => {
  console.log("SIGTERM RECEIVED, EXITING");
  process.exit(0);
})

rclnodejs.init()
.then(() => {
  console.log('[ROS2] Connection Successful')

  // creates new node
  node = new rclnodejs.Node(nodeName) 

  // creates motor publisher
  motorPublisher = node.createPublisher(motorMsgType, motorTopic)
  motionNumPublisher = node.createPublisher(motionNumMsgType, motionNumTopic)
  motionNamePublisher = node.createPublisher(motionNameMsgType, motionNameTopic)

  motorClient = node.createClient(motorServiceMap, motorServiceName)

  // runs the node
  node.spinOnce()

})
.catch(err => {
  console.log('[ROS2] Connection Failed')
  console.error(err)
}).then(() => {
  try {
    const app = new App([new IndexRoute(), new MotorsRoute(node, motorPublisher, motorClient), new MotionsRoute(node, motionNumPublisher, motionNamePublisher), new DemoRoute()]);
    app.listen();
  } catch(e) {
    console.error(e)
  }
})


