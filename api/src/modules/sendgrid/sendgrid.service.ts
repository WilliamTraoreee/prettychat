import { Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EmailData } from '@sendgrid/helpers/classes/email-address';
import sgMail from '@sendgrid/mail';
import { env } from '../../utils/env';
import sendgridConfig from './sendgrid.config';

export type CreateClassicUserAccountConfirmEmailInput = {
  email: string;
};

export type ContactUsEmailInput = {
  from: string;
  title: string;
  body: string;
};

export type PasswordResetRequestEmailInput = {
  email: string;
  token: string;
};

export class SendgridService {
  private readonly logger = new Logger('SendgridService');

  constructor(
    @Inject(sendgridConfig.KEY)
    private readonly _sendgridConfig: ConfigType<typeof sendgridConfig>,
  ) {
    if (!_sendgridConfig.apiKey) {
      this.logger.warn("SENDGRID_API_KEY provided, you can't send mail");
      return;
    }

    if (!_sendgridConfig.fromEmail) {
      this.logger.warn("SENGRID_FROM_EMAIL not provided, you can't send mail");
      return;
    }

    this.logger.log('SendGrid initialized');
    sgMail.setApiKey(_sendgridConfig.apiKey);
  }

  private async sendMail(
    templateId: string,
    to: EmailData | EmailData[],
    variables?: Record<string, any>,
  ) {
    if (!this._sendgridConfig || !this._sendgridConfig.fromEmail) {
      this.logger.debug(`Should send email to ${JSON.stringify(to)}`);
      return;
    }

    try {
      await sgMail.send({
        templateId: templateId,
        from: {
          email: this._sendgridConfig.fromEmail,
          name: this._sendgridConfig.fromName,
        },
        to: to,
        dynamicTemplateData: variables,
      });
    } catch (err) {
      this.logger.error(`Fail send email with id ${templateId}`, err);
    } finally {
      this.logger.debug(`Email with id ${templateId} to ${JSON.stringify(to)}`);
    }
  }

  sendCreateClassicUserAccountConfirmEmail(
    input: CreateClassicUserAccountConfirmEmailInput,
  ) {
    this.sendMail(
      this._sendgridConfig.templateIds.createClassicUserAccountConfirm,
      {
        email: input.email,
      },
    );
  }

  sendPasswordResetRequestEmail(input: PasswordResetRequestEmailInput) {
    const url = `${env.sendgrid.FRONTEND_URL}/reset-password?token=${input.token}`;

    this.sendMail(
      this._sendgridConfig.templateIds.resetPasswordRequest,
      {
        email: input.email,
      },
      { resetPasswordUrl: url },
    );
  }
}
