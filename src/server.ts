import App from '@/app';
import IndexRoute from '@routes/index.route';
import MotorsRoute from '@routes/motors.route';
import MotionsRoute from '@routes/motions.route';
import validateEnv from '@utils/validateEnv';
import DemoRoute from './routes/demo.route';
validateEnv();

import rclnodejs, { Publisher, MessageType, Node} from 'rclnodejs'

const nodeName = 'api_node'
var node: Node

var motorPublisher: Publisher
var motionPublisher: Publisher

const motorMsgType: MessageType<any> = 'uxa_sam_msgs/msg/PositionMove'
const motorTopic = 'uxa_sam_driver/position_move'

const motionMsgType: MessageType<any> = 'uxa_uic_msgs/msg/Motion'
const motionTopic = 'uic_driver_motion'

rclnodejs.init()
.then(() => {
  console.log('[ROS2] Connection Successful')

  // creates new node
  node = new rclnodejs.Node(nodeName) 

  // creates motor publisher
  motorPublisher = node.createPublisher(motorMsgType, motorTopic)
  motionPublisher = node.createPublisher(motionMsgType, motionTopic)

  // runs the node
  node.spinOnce()

})
.catch(err => {
  console.log('[ROS2] Connection Failed')
  console.error(err)
}).then(() => {
  try {
    const app = new App([new IndexRoute(), new MotorsRoute(node, motorPublisher), new MotionsRoute(node, motionPublisher), new DemoRoute()]);
    app.listen();
  } catch(e) {
    console.error(e)
  }
})

