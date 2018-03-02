import * as broadBandDiagram from '../telecom-bundle-diagrams.json';

export class BroadBandController{

  public GetAllBoradBands(request,response){
    response.json(broadBandDiagram);
  }
}
