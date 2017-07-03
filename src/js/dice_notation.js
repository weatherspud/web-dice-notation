import peg from 'pegjs';

import { grammar } from './grammar.js';

(function () {

  const parser = peg.generate(grammar);
  alert(JSON.stringify(parser.parse('3d6')));

})();
