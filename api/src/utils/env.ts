export const env = {
  MIKRO_CLIENT_URL: process.env.MIKRO_CLIENT_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_PASSWORD_RESET_SECRET_KEY: process.env.JWT_PASSWORD_RESET_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
  sendgrid: {
    API_KEY: process.env.SENDGRID_API_KEY,
    FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
    FRONTEND_URL: process.env.SENDGRID_FRONTEND_URL,
    template: {
      CREATE_ACCOUNT: process.env.SENDGRID_TEMPLATE_CREATE_ACCOUNT,
      UPDATE_PASSWORD: process.env.SENDGRID_TEMPLATE_RESET_PASSWORD,
    },
  },
};
