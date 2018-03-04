import * as $ from 'jquery';
import {ApiUrl} from '../env';
import {Bundle} from '../../Model/Bundle';

export class BundleProvider{
  public static GetAllBundles():Promise<Bundle[]>{
    return new Promise((resolve,reject)=>{
      $.get(ApiUrl+'/',(data:Bundle[])=>{
        resolve(data);
      });
    });
  }
}
