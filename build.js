var fs = require('fs');
var path = require('path');
var open = require('open');
var sass = require('node-sass');
var concatFile = require('./concatFile');
const { exec,execSync } = require('child_process');

//copy the $file to $dir2
var copyFile = (file, dir2)=>{
  //include the fs, path modules

  //gets file name and adds it to dir2
  var f = path.basename(file);
  var source = fs.createReadStream(file);
  var dest = fs.createWriteStream(path.resolve(dir2, f));

  source.pipe(dest);
  source.on('end', function() { console.log('Succesfully copied'); });
  source.on('error', function(err) { console.log(err); });
};

execSync('npm run node-sass');

concatFile('./dist/public','.css','./dist/public');


//copy dependecies file for front end
copyFile('./src/telecom-bundle-diagrams.json', './dist/');
if (!fs.existsSync('./dist/public/')){
    fs.mkdirSync('./dist/public/');
}
copyFile('./src/public/index.html', './dist/public/');
copyFile('./node_modules/react/umd/react.development.js', './dist/public/');
copyFile('./node_modules/jquery/dist/jquery.min.js', './dist/public/');
copyFile('./node_modules/react-dom/umd/react-dom.development.js', './dist/public/');


// build front end, back end and then run the node server
var child = exec('npm run webpack && npm run tsc && node ./dist/index.js');
child.stdout.on('data', function(data) {
    console.log(data);
});
child.stderr.on('data', function(data) {
    console.log(data);
});
child.on('close', function(code) {
    console.log(code);
});
