export const roll = function (ast) {
  if (ast[0] === 'literal') {
    return ast[1];
  } else if (ast[0] === 'die') {
    let sum = 0;
    for (let i = 0; i < ast[1][1]; ++i) {
      sum = sum + Math.ceil(Math.random() * ast[2][1]);
    }
    return sum;
  } else if (ast[0] === 'keep-high') {
    let rolls = [];
    for (let i = 0; i < ast[1][1]; ++i) {
      rolls.push(Math.ceil(Math.random() * ast[2][1]));
    }
    rolls.sort().reverse();
    let sum = 0;
    for (let i = 0; i < ast[3][1]; ++i) {
      sum = sum + rolls[i];
    }
    return sum;
  } else if (ast[0] === 'keep-low') {
    let rolls = [];
    for (let i = 0; i < ast[1][1]; ++i) {
      rolls.push(Math.ceil(Math.random() * ast[2][1]));
    }
    rolls.sort();
    let sum = 0;
    for (let i = 0; i < ast[3][1]; ++i) {
      sum = sum + rolls[i];
    }
    return sum;
  } else if (ast[0] === '*') {
    return roll(ast[1]) * roll(ast[2]);
  } else if (ast[0] === '/') {
    return roll(ast[1] / roll(ast[2]));
  } else if (ast[0] === '+') {
    return roll(ast[1]) + roll(ast[2]);
  } else if (ast[0] === '-') {
    return roll(ast[1] - roll(ast[2]));
  }
  throw new Error('unrecognized node type: ' + ast[0]);
};
