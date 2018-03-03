import {ServiceController,ServiceDiagram} from './ServiceController';
import {Service,ServiceType,ServiceInterface} from '../Model/Service';
import {Bundle} from '../Model/Bundle';

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;
describe('Service Controller', () => {

  it('Should return correct list of all bundles' , () => {
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

    let allBundles = new ServiceController().Bundles(diagram);

    expect(allBundles.length).to.equal(7);
  });

});
