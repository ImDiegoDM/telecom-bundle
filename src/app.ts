import * as express from 'express';
import { BroadBandController } from './Controllers/BroadBandController';

export class App{
  public app:any;
  private port:number;
  private broadBandController:BroadBandController;

  constructor(port:number){
    this.port = port;
    this.broadBandController = new BroadBandController();
    
    this.app = express();
    this.MountRoutes();
  }

  public StartServer(){
    this.app.listen(this.port, (err) => {
      if (err) {
        return console.log(err)
      }

      return console.log(`server is listening on ${this.port}`)
    })
  }

  private MountRoutes():void{
    this.app.get('/',this.broadBandController.GetAllBoradBands);
  }
}
