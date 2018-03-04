import * as express from 'express';
import * as path from 'path';
import { ServiceController } from './Controllers/ServiceController';
import { FrontEndController } from './Controllers/FrontEndController';

export class App{
  public backEnd:any;
  public frontEnd:any;
  private port:number;
  private serviceController:ServiceController;
  private frontEndController:FrontEndController;

  constructor(port:number){
    this.port = port;
    this.serviceController = new ServiceController();
    this.frontEndController = new FrontEndController();

    this.backEnd = express();
    this.frontEnd = express();
    this.MountBackEndRoutes();
    this.frontEnd.use(express.static(path.join(__dirname, 'public')));
  }

  public StartServer(){
    this.backEnd.listen(this.port, (err:any) => {
      if (err) {
        return console.log(err)
      }
      console.log(`The build is finished`);
      return console.log(`Back End server is listening on ${this.port}`)
    })
    this.frontEnd.listen(8080, (err:any) => {
      if (err) {
        return console.log(err)
      }
      console.log(`Front End server is listening on 8080`);
      return console.log(`The magic happens http://localhost:8080`)
    })
  }

  private MountBackEndRoutes():void{
    this.backEnd.get('/',(request:any,response:any)=>{this.serviceController.GetAllBundles(request,response)});
  }
  private MountFrontEndRoutes():void{
    this.frontEnd.get('/',(request:any,response:any)=>{this.frontEndController.GetPage(request,response)});
  }
}
