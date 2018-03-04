var fs = require('fs');
var path = require('path');
var open = require('open');
const { exec } = require('child_process');

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

//example, copy file1.htm from 'test/dir_1/' to 'test/'
copyFile('./src/telecom-bundle-diagrams.json', './dist/');
if (!fs.existsSync('./dist/public/')){
    fs.mkdirSync('./dist/public/');
}
copyFile('./src/public/index.html', './dist/public/');
copyFile('./node_modules/react/umd/react.production.min.js', './dist/public/');
copyFile('./node_modules/react-dom/umd/react-dom.production.min.js', './dist/public/');
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
