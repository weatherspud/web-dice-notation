export const roll = function (ast) {
  if (ast[0] === 'literal') {
    return ast[1];
  } else if (ast[0] === 'die') {
    let sum = 0;
    for (let i = 0; i < ast[1][1]; ++i) {
      sum = sum + Math.ceil(Math.random() * ast[2][1]);
    }
    return sum;
  }
  throw new Error('unrecognized node type: ' + ast[0]);
};
