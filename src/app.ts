import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT} from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import ip from 'ip'
import qrcode from 'qrcode'

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 50000

    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
    this.initializeViewEngine()
  }

  public listen() {
    this.app.listen((this.port) as number, ip.address(), () => {
      logger.info(`=======================================`)
      logger.info(`========== ENV: ${this.env} ==========`)
      logger.info(`API Listening on http://${ip.address()}:${this.port}`)
      logger.info(`=======================================`)
    });

    let apiURL = `http://${ip.address()}:${this.port}/demo`
  
    qrcode.toDataURL(apiURL, function (err, url) {
      console.log(url)
    })


  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeViewEngine() {
    this.app.set('view engine', 'pug')
  }
}

export default App;
