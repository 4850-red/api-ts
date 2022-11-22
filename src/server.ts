import App from '@/app';
import IndexRoute from '@routes/index.route';
import MotorsRoute from '@routes/motors.route';
import MotionsRoute from '@routes/motions.route';
import validateEnv from '@utils/validateEnv';
import DemoRoute from './routes/demo.route';
validateEnv();

const app = new App([new IndexRoute(), new MotorsRoute(), new MotionsRoute(), new DemoRoute()]);

app.listen();
