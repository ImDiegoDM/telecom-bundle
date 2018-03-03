export enum ServiceType{
  bb,tv,ll,addon
}

export class ServiceConection{
  public conection_id:number;
  public cost:number;

  constructor(conection_id:number,cost:number){
    this.conection_id = conection_id;
    this.cost = cost;
  }
}

export class Service{

  public id:number;
  public name:string;
  public type:ServiceType;
  public price:number;
  private conections:ServiceConection[];

  constructor(id:number,name:string,type:ServiceType,price:number,conections:ServiceConection[]){
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
    this.conections = conections;
  }

  public GetServiceConection(id:number):ServiceConection{
    for (let i = 0; i < this.conections.length; i++) {
        if(this.conections[i].conection_id == id) return this.conections[i];
    }
    return null;
  }

}
