import { Motion } from '@/interfaces/motion.interface';

// password: password
const motionModel: Motion[] = [
  // FEET
  { id: 1, name: 'basic_motion', button: 'A' },
  { id: 2, name: 'kick_right', button: 'B' },
  { id: 3, name: 'turn_left', button: 'LR' },
  { id: 4, name: 'walk_forward_short', button: 'U' },
  { id: 5, name: 'turn_right', button: 'RR' },
  { id: 6, name: 'walk_left', button: 'L' },
  { id: 7, name: 'init/stop', button: 'S'},
  { id: 8, name: 'walk_right', button: 'R' },
  { id: 9, name: 'walk_foward_4step', button: 'LA' },
  { id: 10, name: 'basic_motion', button: 'D' },
  { id: 11, name: 'walk_foward_6step', button: 'RA' },
  { id: 12, name: 'demo_introduction', button: '1' },
  { id: 13, name: 'dance_gangnamstyle', button: '2' },
  { id: 21, name: 'sit_down', button: '0' },
  { id: 99, name: 'pc_control', button: '' }
];

export default motionModel;
