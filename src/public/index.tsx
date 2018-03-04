import * as React from "react";
import * as ReactDOM from "react-dom";

import { BundleComponent } from "./components/BundleComponent";
import {Hello} from "./components/hello";
import {BundleProvider} from './provider/BundleProvider';

BundleProvider.GetAllBundles().then((data)=>{
  ReactDOM.render((
    <div>
    teste
      {data.map(bundle=>
        <BundleComponent bundle={bundle}/>
      )}
    </div>
    ),
    document.getElementById("example")
  );
})
