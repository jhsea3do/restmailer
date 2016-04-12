var lib = 'app';

if(process.argv[2] == 'cli') {
  lib = process.argv[2];
}

var main = require( [".", lib].join("/") );

main();
