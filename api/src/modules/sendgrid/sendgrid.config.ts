import { registerAs } from '@nestjs/config';
import { env } from '../../utils/env';

export default registerAs('sendgrid', () => ({
  apiKey: env.sendgrid.API_KEY,
  fromEmail: env.sendgrid.FROM_EMAIL,
  fromName: 'AIPMI - Ouvre boîtes 4.0',
  frontEndUrl: env.sendgrid.FRONTEND_URL || 'http://localhost:3001',
  templateIds: {
    createClassicUserAccountConfirm: env.sendgrid.template.CREATE_ACCOUNT,
    resetPasswordRequest: env.sendgrid.template.UPDATE_PASSWORD,
  },
}));
