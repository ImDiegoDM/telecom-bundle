import * as fs from 'fs';

export class FrontEndController{

  public GetPage(request,response){
    let html = fs.readFileSync('./dist/react-src/index.html');
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
  }
}
