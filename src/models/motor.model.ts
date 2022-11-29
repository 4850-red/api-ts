import { Motor } from '@/interfaces/motor.interface';

// password: password
const motorModel: Motor[] = [
  // FEET
  { id: 0, name: 'left-foot', description: 'foot tilt in/out', position: 127, min: 115, max: 140, default: 127, inverted: true },
  { id: 1, name: 'right-foot', description: 'foot tilt in/out', position: 127, min: 110, max: 140, default: 127, inverted: false },
  { id: 2, name: 'left-heel', description: 'foot up/down', position: 127, min: 77, max: 175, default: 127, inverted: true },
  { id: 3, name: 'right-heel', description: 'foot up/down', position: 127, min: 78, max: 175, default: 127, inverted: false },

  // KNEE
  { id: 4, name: 'left-knee', description: 'shin front/back', position: 204, min: 77, max: 204, default: 204, inverted: true },
  { id: 5, name: 'right-knee', description: 'shin fron/back', position: 50, min: 50, max: 180, default: 50, inverted: false },

  // UPPER LEG
  { id: 6, name: 'left-front-upper-leg', description: '', position: 127, min: 0, max: 255, default: 127, inverted: true },
  { id: 7, name: 'right-front-upper-leg', description: '', position: 127, min: 0, max: 255, default: 127, inverted: false },
  { id: 8, name: 'left-back-upper-leg', description: '', position: 127, min: 0, max: 255, default: 127, inverted: true },
  { id: 9, name: 'right-back-upper-leg', description: '', position: 127, min: 0, max: 255, default: 127, inverted: false },

  // HIP
  { id: 10, name: 'left-hip', description: '', position: 127, min: 0, max: 255, default: 127, inverted: true },
  { id: 11, name: 'right-hip', description: '', position: 127, min: 0, max: 255, default: 127, inverted: false },

  // shoulder
  { id: 12, name: 'left-upper-shoulder', description: '', position: 180, min: 10, max: 254, default: 180, inverted: true },
  { id: 13, name: 'right-upper-shoulder', description: '', position: 180, min: 1, max: 254, default: 180, inverted: false },
  { id: 14, name: 'left-lower-shoulder', description: '', position: 115, min: 1, max: 120, default: 115, inverted: true },
  { id: 15, name: 'right-lower-shoulder', description: '', position: 138, min: 130, max: 254, default: 138, inverted: false },

  // bicep
  { id: 16, name: 'left-bicep', description: 'twist in', position: 127, min: 1, max: 254, default: 127, inverted: true },
  { id: 17, name: 'right-arm', description: 'twist in', position: 127, min: 1, max: 254, default: 127, inverted: false },

  // elbow
  { id: 18, name: 'left-eblow', description: 'max is up', position: 48, min: 48, max: 190, default: 48, inverted: true },
  { id: 19, name: 'right-elbow', description: 'min is up', position: 210, min: 65, max: 210, default: 210, inverted: false },

  // waist
  { id: 22, name: 'hip', description: 'rotate left/right', position: 127, min: 90, max: 170, default: 127, inverted: false },

  // neck
  { id: 23, name: 'neck', description: 'look left/right', position: 127, min: 1, max: 254, default: 127, inverted: false },

  // head 
  { id: 24, name: 'head', description: 'look up/down', position: 127, min: 70, max: 160, default: 127, inverted: false },
];

export default motorModel;
