import * as bcrypt from 'bcrypt';

export function checkPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
