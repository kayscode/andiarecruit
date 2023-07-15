import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdminUserModule } from './admin-user/admin-user.module';
import { ProfileModule } from './profile/profile.module';
import { JobModule } from './job/job.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    AuthModule,
    AdminUserModule,
    ProfileModule,
    JobModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.STAGE}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          password: configService.get('DB_PASSWORD'),
          username: configService.get('DB_USERNAME'),
          database: configService.get('DB_NAME'),
          port: configService.get('DB_PORT'),
          autoLoadEntities: true,
          synchronize: true
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
