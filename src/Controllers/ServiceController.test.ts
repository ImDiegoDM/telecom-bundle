import {ServiceController} from './ServiceController';
import {Service,ServiceType} from '../Model/Service';
import {Bundle} from '../Model/Bundle';

import * as mocha from 'mocha';
import * as chai from 'chai';

/*const expect = chai.expect;
describe('Broad Band Controller', () => {

  it('should return correct list of broad bands' , () => {
    let broadBandController = new BroadBandController();
    let diagram:BroadBand[]=[];
    diagram.push(new BroadBand(1,'broadband2',BroadBandType.bb,60,[{conection_id:2,cost:-10},{conection_id:3,cost:-40}]));
    diagram.push(new BroadBand(2,'TV1',BroadBandType.tv,50,[{conection_id:3,cost:-10}]));
    diagram.push(new BroadBand(3,'Landline',BroadBandType.ll,35,[]));
    broadBandController.broadBandDiagram = diagram;
    let expectedPack:BroadBandPack[] = [
      {names:['Landline'],cost:35},
      {names:['TV1'],cost:50},
      {names:['broadband2'],cost:60},
      {names:['Landline','TV1'],cost:75},
      {names:['broadband2','TV1'],cost:100},
      {names:['broadband2','Landline','TV1'],cost:125},
    ]
    expect(broadBandController.BroadBandPacks()).to.equal(expectedPack);
  });

});*/
