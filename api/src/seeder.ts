import { MikroOrmModule } from '@mikro-orm/nestjs';
import { seeder } from 'nestjs-seeder';
import { AdminUser } from './modules/admin-user/entities/admin-user.entity';
import { ClassicUser } from './modules/classic-user/entities/classic-user.entity';
import { AdminUsersSeeder } from './seeders/admin-user.seeder';
import { ClassicUsersSeeder } from './seeders/classic-user.seeder';

seeder({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature([ClassicUser, AdminUser]),
  ],
}).run([ClassicUsersSeeder, AdminUsersSeeder]);
