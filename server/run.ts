// test scripts
// run as
//  node run.js

import * as server from './server'
import * as Config from '../src/services/config'


server.serve(Config.config.port);
