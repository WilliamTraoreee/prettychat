import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};
