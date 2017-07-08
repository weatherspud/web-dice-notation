const max_geometric_rolls = 100;

const geometric_roll = function (stop_if_le, num_faces) {
  let count = 1;
  for (let i = 0; i < max_geometric_rolls; ++i) {
    if (Math.ceil(Math.random() * num_faces) <= stop_if_le) {
      return count;
    }
    count = count + 1;
  }

  return count;
};

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
  } else if (ast[0] === 'I') {
    return geometric_roll(1, 6);
  } else if (ast[0] === 'II') {
    return geometric_roll(2, 6);
  } else if (ast[0] === 'III') {
    return geometric_roll(3, 6);
  } else if (ast[0] === 'IV') {
    return geometric_roll(4, 6);
  } else if (ast[0] === 'V') {
    return geometric_roll(5, 6);
  }
  throw new Error('unrecognized node type: ' + ast[0]);
};
