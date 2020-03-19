const path = require('path'),
    fs=require('fs'),
    basename = path.basename(__filename);

module.exports = function(app){
    fs.readdirSync(__dirname)
    .filter(file => 
        file.indexOf(".") !== 0
        && file.slice(-3) === ".js"
        && file !== basename)
    .forEach(file => {
        app.use(require(path.join(__dirname,file)));
    })    
} 
    