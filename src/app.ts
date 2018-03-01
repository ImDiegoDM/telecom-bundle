import * as express from 'express';

export class App{
  public app:any;
  private port:number;

  constructor(port:number){
    this.port = port;
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
    this.app.get('/',(request,response)=>{
      response.json({
        message:'Hello Mother fucker'
      });
    });
  }
}
