export enum ServiceType{
  bb="bb",tv="tv",ll="ll",addon="addon"
}

export interface ServiceConectionInterface{
  conection_id:number;
  cost:number;
}

export interface ServiceInterface{
  id:number;
  name:string;
  type:string;
  price:number;
  conections:ServiceConectionInterface[];
}

export class Service{

  public id:number;
  public name:string;
  public type:ServiceType;
  public price:number;
  public conections:ServiceConectionInterface[];

  constructor(id:number,name:string,type:ServiceType,price:number,conections:ServiceConectionInterface[]){
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
    this.conections = conections;
  }

  public static CreateFromInterface(serviceInterface:ServiceInterface):Service{
    return new Service(serviceInterface.id,serviceInterface.name,ServiceType[serviceInterface.type],serviceInterface.price,serviceInterface.conections);
  }

  public GetServiceConection(id:number):ServiceConectionInterface{
    for (let i = 0; i < this.conections.length; i++) {
        if(this.conections[i].conection_id == id) return this.conections[i];
    }
    return null;
  }

}
