import {Service,ServiceType} from './Service';

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;
describe("Service",()=>{

  it("Shold return the service conection correctly",()=>{
    let service = new Service(1,'broadband2',ServiceType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]);

    expect(service.GetServiceConection(3)).to.deep.equal({conection_id:3,cost:-40});
  })
})
