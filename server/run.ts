// test scripts
// run as
//  node run.js

import * as server from './server'
const { config } = require('../src/config.js')


server.serve(config.port);
