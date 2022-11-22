import { Motor } from '@/interfaces/motor.interface';

// password: password
const motorModel: Motor[] = [
  // FEET
  { id: 0, name: 'left-foot', position: 0, min: 1, max: 254 },
  { id: 1, name: 'right-foot', position: 0, min: 0, max: 255 },
  { id: 2, name: 'left-heel', position: 0, min: 0, max: 255 },
  { id: 3, name: 'right-heel', position: 0, min: 0, max: 255 },

  // KNEE
  { id: 4, name: 'left-knee', position: 0, min: 0, max: 255 },
  { id: 5, name: 'right-knee', position: 0, min: 0, max: 255 },

  // UPPER LEG
  { id: 6, name: 'left-front-upper-leg', position: 0, min: 0, max: 255 },
  { id: 7, name: 'right-front-upper-leg', position: 0, min: 0, max: 255 },
  { id: 8, name: 'left-back-upper-leg', position: 0, min: 0, max: 255 },
  { id: 9, name: 'right-back-upper-leg', position: 0, min: 0, max: 255 },

  // HIP
  { id: 10, name: 'left-hip', position: 0, min: 0, max: 255 },
  { id: 11, name: 'right-hip', position: 0, min: 0, max: 255 },

  // shoulder
  { id: 12, name: 'left-upper-shoulder', position: 0, min: 0, max: 255 },
  { id: 13, name: 'right-upper-shoulder', position: 0, min: 0, max: 255 },
  { id: 14, name: 'left-lower-shoulder', position: 0, min: 0, max: 255 },
  { id: 15, name: 'right-lower-shoulder', position: 0, min: 0, max: 255 },

  // bicep
  { id: 16, name: 'left-bicep', position: 0, min: 0, max: 255 },
  { id: 17, name: 'right-bicep', position: 0, min: 0, max: 255 },

  // elbow
  { id: 18, name: 'left-eblow', position: 0, min: 0, max: 255 },
  { id: 19, name: 'right-elbow', position: 0, min: 0, max: 255 },

  // hands
  { id: 20, name: 'left-hand', position: 0, min: 0, max: 255 },
  { id: 21, name: 'right-hand', position: 0, min: 0, max: 255 },

  // waist
  { id: 22, name: 'waist', position: 0, min: 0, max: 255 },

  // neck
  { id: 23, name: 'neck', position: 0, min: 0, max: 255 },

  // head
  { id: 24, name: 'head', position: 0, min: 0, max: 255 },
];

export default motorModel;
