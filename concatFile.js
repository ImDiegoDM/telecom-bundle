var fs = require('fs');
var path = require('path');

function getFilesRecursivly(directory,type){
  let dir = fs.readdirSync(directory);
  let files =[];
  for (let i = 0; i < dir.length; i++) {
    dir[i] = directory+'/'+dir[i];
    //console.log(dir[i]);
    if(fs.lstatSync(dir[i]).isDirectory()){
      files = files.concat(getFilesRecursivly(dir[i],type));
    }
    else {
      if(path.extname(dir[i])==type||!type){
        files.push(dir[i]);
      }
    }
  }
  return files;
}

module.exports = function(directory,type,destination) {
  let files = getFilesRecursivly(directory,type);
  let concatFilesContent = '';
  for (var i = 0; i < files.length; i++) {
    concatFilesContent += fs.readFileSync(files[i],{encoding:'utf8'});
  }
  fs.writeFile(destination+'/main'+type, concatFilesContent, 'utf8', (err) => {
    if (err) throw err;
    console.log("The css build is done");
  });

}
