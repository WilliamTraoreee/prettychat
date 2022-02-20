import { registerAs } from '@nestjs/config';
import { env } from '../../utils/env';

export default registerAs('auth', () => ({
  passwordReset: {
    secret: env.JWT_PASSWORD_RESET_SECRET_KEY,
    expiresIn: '10m',
  },
}));
