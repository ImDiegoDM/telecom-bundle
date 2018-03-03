import * as express from 'express';
import { ServiceController } from './Controllers/ServiceController';

export class App{
  public app:any;
  private port:number;
  private broadBandController:ServiceController;

  constructor(port:number){
    this.port = port;
    this.broadBandController = new ServiceController();

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
    this.app.get('/',(request,response)=>{this.broadBandController.GetAllBundles(request,response)});
  }
}
