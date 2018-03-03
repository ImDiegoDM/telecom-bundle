import * as broadBandDiagramJSON from '../telecom-bundle-diagrams.json';
import {Service} from '../Model/Service';
import {Bundle} from '../Model/Bundle';

export class ServiceDiagram{

  public static GetDiagram():Service[]{
    let diagram:any = broadBandDiagramJSON;
    return <Service[]>diagram;
  }

  public static GetServiceFromDiagram(id:number):Service{
    let diagram:any = broadBandDiagramJSON;
    diagram = <Service[]>diagram;
    for (let i = 0; i < diagram.length; i++) {
        if(diagram[i].id==id)return diagram[i];
    }
    return null;
  }
}

export class ServiceController{

  public broadBandDiagram:Service[];

  constructor(){

  }

  public Bundles():Bundle[]{
    throw new Error('Not Implemented yet');
  }

  public GetAllBundles(request,response){
    response.json(this.broadBandDiagram);
  }
}
