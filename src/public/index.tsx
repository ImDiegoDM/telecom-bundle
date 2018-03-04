import * as React from "react";
import * as ReactDOM from "react-dom";

import { BundleComponent } from "./components/BundleComponent";
import {BundleProvider} from './provider/BundleProvider';

BundleProvider.GetAllBundles().then((data)=>{
  ReactDOM.render((
      data.map((bundle,index)=>
        <BundleComponent key={index} bundle={bundle}/>
      )
    ),
    document.getElementById("bundles")
  );
})
