import * as telecomBundleDiagramJSON from '../telecom-bundle-diagrams.json';
import {Service,ServiceInterface} from '../Model/Service';
import {Bundle} from '../Model/Bundle';

export class ServiceDiagram{

  public static GenerateDiagram(diagramInterface:ServiceInterface[]):Service[]{
    let diagram:Service[] = [];
    for (let i = 0; i < diagramInterface.length; i++) {
        diagram.push(Service.CreateFromInterface(diagramInterface[i]));
    }
    return diagram;
  }

  public static GetServiceFromDiagram(id:number,diagram:Service[]):Service{
    for (let i = 0; i < diagram.length; i++) {
        if(diagram[i].id==id)return diagram[i];
    }
    return null;
  }
}

export class ServiceController{

  public telecomBundleDiagram:Service[];

  constructor(){
    if(telecomBundleDiagramJSON){
      let aux:any =telecomBundleDiagramJSON;
      this.telecomBundleDiagram = ServiceDiagram.GenerateDiagram(aux);
    }
  }

  public Bundles(diagram:Service[]):Bundle[]{
    let allBundles:Bundle[] = [];
    let index = 0;

    for (let i = 0; i < diagram.length; i++) {
        allBundles.push(new Bundle(diagram[i]));
    }

    while(index<allBundles.length){
      let possibleBundles = allBundles[index].GetPossibleBundles(diagram);
      for (let i = 0; i < possibleBundles.length; i++) {
          if(!possibleBundles[i].ChecfIfBundlesHaveThisBundle(allBundles)){
            allBundles.push(possibleBundles[i]);
          }
      }
      index++;
    }

    return allBundles;
  }

  public GetAllBundles(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    let bundles = this.Bundles(this.telecomBundleDiagram);
    bundles = bundles.sort((a:Bundle,b:Bundle):number=>{
      if(a.cost<b.cost){
        return -1;
      }
      else if(a.cost>b.cost){
        return 1;
      }
      return 0;
    });
    response.json(bundles);
  }
}
