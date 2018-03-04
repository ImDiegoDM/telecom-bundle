import * as React from "react";
import {BundleInterface} from '../../Model/Bundle';

export interface BundleProps{bundle:BundleInterface}

export class BundleComponent extends React.Component<BundleProps,{}>{
  render(){
    return (
      <div className="bundle col-4 col-md-3">
        <div>
          <span className="names">
            {this.props.bundle.services.map((service,index)=>
              <span key={index}>{service.name} { index<this.props.bundle.services.length-1 ? '+' : null } </span>
            )}
          </span>
          <span className="price"> Preço:{this.props.bundle.cost}</span>
        </div>
      </div>
    );
  }
}
