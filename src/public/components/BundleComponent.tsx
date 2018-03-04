import * as React from "react";
import {BundleInterface} from '../../Model/Bundle';

export interface BundleProps{bundle:BundleInterface}

export class BundleComponent extends React.Component<BundleProps,{}>{
  render(){
    return (
      <div>
        {this.props.bundle.services.map((service,index)=>
          <span>{service.name} { index<this.props.bundle.services.length-1 ? '+' : null } </span>
        )}
        <span> Preço:{this.props.bundle.cost}</span>
      </div>
    );
  }
}
