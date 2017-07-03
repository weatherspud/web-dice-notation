export const grammar = `

start = int_expr

digits = digits:[0-9]+ {
  return ['literal', parseInt(digits)];
}

single_die_expr = "d" + num_faces:digits {
  return ['die', 1, num_faces];
}

multiple_die_expr = num_dice:digits + "d" + num_faces:digits {
  return ['die', num_dice, num_faces];
}

int_expr = multiple_die_expr / single_die_expr / digits

`;
