import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClassicUserPasswordResetRequestInput {
  @Field()
  email: string;
}

@InputType()
export class PasswordResetClassicUserInput {
  @Field()
  passwordResetToken: string;
  @Field()
  newPassword: string;
}
