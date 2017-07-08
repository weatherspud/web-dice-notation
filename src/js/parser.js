import peg from 'pegjs';

const grammar = `
start = sum_expr

digits = digits:[0-9]+ {
  return ['literal', parseInt(digits.join(''))];
}

single_die_expr = "d" num_faces:digits {
  return ['die', ['literal', 1], num_faces];
}

multiple_die_expr = num_dice:digits "d" num_faces:digits {
  return ['die', num_dice, num_faces];
}

keep_drop_op = "kh" / "kl" / "dh" / "dl" / "k" / "d"

keep_drop_expr = num_dice:digits "d" num_faces:digits op:keep_drop_op num_keep_drop:digits {
  if (num_keep_drop[1] > num_dice[1]) {
    throw new Error('cannot keep or drop more dice than are rolled');
  }
  if (op === 'k' || op === 'kh') {
    return ['keep-high', num_dice, num_faces, num_keep_drop];
  }
  if (op === 'kl') {
    return ['keep-low', num_dice, num_faces, num_keep_drop];
  }
  if (op === 'd' || op === 'dl') {
    return ['keep-high', num_dice, num_faces, ['literal', num_dice[1] - num_keep_drop[1]]];
  }
  if (op === 'dh') {
    return ['keep-low', num_dice, num_faces, ['literal', num_dice[1] - num_keep_drop[1]]];
  }
  throw new Error('unrecognized keep/drop operator: ' + op);
}

int_expr = keep_drop_expr /  multiple_die_expr / single_die_expr / digits

prod_expr = left:int_expr op:[*/] right:prod_expr {
  return [op, left, right];
} / int_expr

sum_expr = left:prod_expr op:[+-] right:sum_expr {
  return [op, left, right];
} / prod_expr
`;

export const parser = peg.generate(grammar);
