import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdminUserModule } from './admin-user/admin-user.module';
import { ProfileModule } from './profile/profile.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      password: "qwertysky123",
      username: "postgres",
      database: "andiarecrut",
      port: 5432,
      autoLoadEntities: true,
      synchronize: true
    }),
    AdminUserModule,
    ProfileModule,
    JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
