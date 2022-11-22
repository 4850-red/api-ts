import { Motion } from '@/interfaces/motion.interface';

// password: password
const motionModel: Motion[] = [
  // FEET
  { id: 0, name: 'basic_motion', button: 'A' },
  { id: 1, name: 'kick_right', button: 'B' },
  { id: 2, name: 'turn_left', button: 'LR' },
  { id: 3, name: 'walk_forward_short', button: 'U' },
  { id: 4, name: 'turn_right', button: 'RR' },
  { id: 5, name: 'walk_left', button: 'L' },
  { id: 6, name: 'walk_right', button: 'R' },
  { id: 7, name: 'walk_foward_4step', button: 'LA' },
  { id: 8, name: 'basic_motion', button: 'D' },
  { id: 9, name: 'walk_foward_6step', button: 'RA' },
  { id: 10, name: 'demo_introduction', button: '1' },
  { id: 11, name: 'dance_gangnamstyle', button: '2' },
  { id: 12, name: 'stop', button: 'C' },
  { id: 13, name: 'pc_control', button: 'A' }
];

export default motionModel;
