import { Service,ServiceConection,ServiceType} from './Service';
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

  it('Should add the a service to bundle correctly' , () => {
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);
    let conectionService = new Service(2,'TV1',ServiceType.tv,50,[{conection_id:3,cost:-10}]);
    let bundle = new Bundle(service);
    bundle.Add(conectionService);

    expect(bundle.services).to.deep.equal([service,conectionService]);
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

});
