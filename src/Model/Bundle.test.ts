import { Service,ServiceConectionInterface,ServiceType,ServiceInterface} from './Service';
import { ServiceDiagram } from '../Controllers/ServiceController';
import { Bundle } from './Bundle';

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;
describe('Bundle', () => {

  it('Should check if a service has conection whit any bundle services' , () => {
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);
    let tv = new Service(2,'TV1',ServiceType.tv,50,[{conection_id:3,cost:-10}]);
    let bundle = new Bundle(service);
    let landline = new Service(3,'Landline',ServiceType.ll,35,[])
    bundle.Add(tv);

    expect(bundle.CheckIfHaveConection(landline)).to.deep.equal({conection_id:3,cost:-40});
  });

  it('Should add a service to bundle correctly' , () => {
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);
    let conectionService = new Service(2,'TV1',ServiceType.tv,50,[{conection_id:3,cost:-10}]);
    let bundle = new Bundle(service);
    bundle.Add(conectionService);

    expect(bundle.services).to.deep.equal([service,conectionService]);
    expect(bundle.cost).to.equal(100);
  });

  it('Should add a service to bundle without check if the bundle is empty' , () => {
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);
    let bundle = new Bundle();
    bundle.Add(service);

    expect(bundle.services).to.deep.equal([service]);
  });

  it('Should check if the bundle alredy have this service type' , () => {
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);
    let tv = new Service(2,'TV1',ServiceType.tv,50,[{conection_id:3,cost:-10}]);
    let bundle = new Bundle(service);
    bundle.Add(tv);

    expect(bundle.CheckIfHaveThisServiceType(ServiceType.tv)).to.be.true;
  });

  it('Should throw Error when try to add a service type that alredy have in bundle' , () => {
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);
    let tv = new Service(2,'TV1',ServiceType.tv,50,[{conection_id:3,cost:-10}]);
    let tv2 = new Service(3,'TV2',ServiceType.tv,50,[{conection_id:1,cost:-10}]);
    let bundle = new Bundle(service);
    bundle.Add(tv);

    expect(()=>{bundle.Add(tv2)}).to.throw('this bundle alredy have this service');
  });

  it('Should throw Error when try to add a service that has no conection' , () => {
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);
    let tv = new Service(2,'TV1',ServiceType.tv,50,[{conection_id:3,cost:-10}]);
    let landline = new Service(4,'Landline',ServiceType.ll,35,[])
    let bundle = new Bundle(service);
    bundle.Add(tv);

    expect(()=>{bundle.Add(landline)}).to.throw('the bundle does not have conection with this service');
  });

  it('Should return the possible bundles correctly' , () => {
    let diagramInterface:ServiceInterface[] =  [
      {
        "id":2,
        "name":"TV1",
        "type":"tv",
        "price":50,
        "conections":[
          {"conection_id":3,"cost":-10}
        ]
      },
      {
        "id":3,
        "name":"Landline",
        "type":"ll",
        "price":35,
        "conections":[]
      },
      {
        "id":4,
        "name":"Broadband2",
        "type":"bb",
        "price":60,
        "conections":[
          {"conection_id":2,"cost":-10},
          {"conection_id":3,"cost":-40}
        ]
      },
    ]

    let diagram = ServiceDiagram.GenerateDiagram(diagramInterface);

    let service = ServiceDiagram.GetServiceFromDiagram(4,diagram);
    let bundle = new Bundle(service);

    let possibleBundle1 = new Bundle(service);
    possibleBundle1.Add(ServiceDiagram.GetServiceFromDiagram(2,diagram));

    let possibleBundle2 = new Bundle(service);
    possibleBundle2.Add(ServiceDiagram.GetServiceFromDiagram(3,diagram));

    expect(bundle.GetPossibleBundles(diagram)).to.deep.equal([possibleBundle1,possibleBundle2]);
  });

  it('Should return the possible bundles correctly when the bundle has more then one service' , () => {
    let diagramInterface:ServiceInterface[] =  [
      {
        "id":2,
        "name":"TV1",
        "type":"tv",
        "price":50,
        "conections":[
          {"conection_id":3,"cost":-10}
        ]
      },
      {
        "id":3,
        "name":"Landline",
        "type":"ll",
        "price":35,
        "conections":[]
      },
      {
        "id":4,
        "name":"Broadband2",
        "type":"bb",
        "price":60,
        "conections":[
          {"conection_id":2,"cost":-10},
          {"conection_id":3,"cost":-40}
        ]
      },
    ]

    let diagram = ServiceDiagram.GenerateDiagram(diagramInterface);

    let service = ServiceDiagram.GetServiceFromDiagram(4,diagram);
    let bundle = new Bundle(service);
    bundle.Add(ServiceDiagram.GetServiceFromDiagram(2,diagram));

    let possibleBundle1 = bundle.Clone();
    possibleBundle1.Add(ServiceDiagram.GetServiceFromDiagram(3,diagram));

    expect(bundle.GetPossibleBundles(diagram)).to.deep.equal([possibleBundle1]);
  });

  it("Should compare two bundles correctly",()=>{
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);
    let tv = new Service(2,'TV1',ServiceType.tv,50,[{conection_id:3,cost:-10}]);
    let landline = new Service(3,'Landline',ServiceType.ll,35,[]);

    let bundle1 = new Bundle(service);
    bundle1.Add(tv);
    bundle1.Add(landline);

    let bundle2 = new Bundle(service);
    bundle2.Add(landline);
    bundle2.Add(tv);

    let bundle3 = new Bundle(service);
    bundle3.Add(landline);

    expect(bundle1.Equals(bundle2)).to.be.true;
    expect(bundle1.Equals(bundle3)).to.be.false;

  });

});
