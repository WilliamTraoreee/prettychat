import { PrimaryKey } from '@mikro-orm/core';

export const PrimaryKeyUuid = () =>
  PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' });
