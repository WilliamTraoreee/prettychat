import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { env } from './utils/env';

const config: MikroOrmModuleSyncOptions = {
  entities: ['dist/modules/**/*.entity.js', 'dist/utils/**/*.embeddable.js'],
  entitiesTs: ['src/modules/**/*.entity.ts', 'src/utils/**/*.embeddable.ts'],
  type: 'postgresql',
  clientUrl: env.MIKRO_CLIENT_URL,
  debug: env.NODE_ENV !== 'production',
  metadataProvider: TsMorphMetadataProvider,
  driverOptions: {
    keepAlive: true,
  },
};

export default config;
