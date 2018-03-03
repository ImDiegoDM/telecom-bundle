import { Service,ServiceConection,ServiceType} from './Service';
import { ServiceDiagram } from '../Controllers/ServiceController';

export class Bundle{
  services:Service[];
  cost:number;

  constructor(serviceRoot:Service){
    this.services = [serviceRoot];
    this.cost = serviceRoot.price;
  }

  public Add(service:Service){
    let conection = this.CheckIfHaveConection(service);
    if(conection){
      if(!this.CheckIfHaveThisServiceType(service.type)){
        this.services.push(service);
        this.cost += service.price + conection.cost;
      }
      else{
        throw new Error('this bundle alredy have this service');
      }
    }
    else{
      throw new Error('the bundle does not have conection with this service');
    }
  }

  public CheckIfHaveThisServiceType(type:ServiceType):boolean{
    if(type==ServiceType.addon)return false;
    for (let i = 0; i < this.services.length; i++) {
        if(this.services[i].type==type){
          return true;
        }
    }
    return false;
  }

  public CheckIfHaveConection(broadband:Service):ServiceConection{
    let conection:ServiceConection;
    for (let i = 0; i < this.services.length; i++) {
        let aux = this.services[i].GetServiceConection(broadband.id);
        if(!conection){
          conection = aux;
        }
        else if(conection.cost>aux.cost){
          conection = aux;
        }
    }
    return conection;
  }

}
