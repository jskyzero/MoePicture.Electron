function main () {

const fs = require('fs');
fs.writeFile("./test.file", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

};

module.exports = {main:main}
