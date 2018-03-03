import { Service,ServiceConectionInterface,ServiceType} from './Service';
import { ServiceDiagram } from '../Controllers/ServiceController';

export class Bundle{
  services:Service[];
  cost:number;

  constructor(serviceRoot?:Service){
    if(serviceRoot){
      this.services = [serviceRoot];
      this.cost = serviceRoot.price;
    }
    else{
      this.services = [];
      this.cost = 0;
    }
  }

  public Equals(bundle:Bundle):boolean{
    bundle1:
    for (let i = 0; i < this.services.length; i++) {
        for (let j = 0; j < bundle.services.length; j++) {
            if(this.services[i].name == bundle.services[j].name){
              continue bundle1;
            }
        }
        return false;
    }
    return true;
  }

  public Add(service:Service){
    if(this.services.length==0){
      this.services.push(service);
      this.cost+=service.price;
      return
    }
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

  public Clone():Bundle{
    let clone = new Bundle();
    clone.services = this.services.slice();
    clone.cost = this.cost;
    return clone;
  }

  /*public CheckIfHaveThisBundle(bundle:Bundle,bundles:Bundle[]):boolean{
    for (let i = 0; i < bundles.length; i++) {
        for (let i = 0; i < bundles[i].length; i++) {
            bundles[i][i];
        }
    }
  }*/

  public ChecfIfBundlesHaveThisBundle(bundles:Bundle[]):boolean{
    for (let i = 0; i < bundles.length; i++) {
        if(this.Equals(bundles[i])) return true;
    }
    return false;
  }

  public GetPossibleBundles(diagram:Service[]):Bundle[]{
    let bundles:Bundle[]=[];
    for (let i = 0; i < this.services.length; i++) {
      for (let j = 0; j < this.services[i].conections.length; j++) {
        let bundle = this.Clone();
        try{
          bundle.Add(ServiceDiagram.GetServiceFromDiagram(this.services[i].conections[j].conection_id,diagram));
        }catch(Error){
          continue;
        }
        if(!bundle.ChecfIfBundlesHaveThisBundle(bundles)){
          bundles.push(bundle);
        }
      }
    }

    return bundles;
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

  public CheckIfHaveConection(broadband:Service):ServiceConectionInterface{
    let conection:ServiceConectionInterface;
    for (let i = 0; i < this.services.length; i++) {
        let aux = this.services[i].GetServiceConection(broadband.id);
        if(aux){
          if(!conection){
            conection = aux;
          }
          else if(conection.cost>aux.cost){
            conection = aux;
          }
        }
    }
    return conection;
  }

}
