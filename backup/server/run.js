// test scripts
// run as
//  node run.js


const { server } = require('./server.js')
const { config } = require('../src/config.js')


server.serve(config.port);
