import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './entities/job-applications.entity';
import { Job } from './entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobApplication, Job])
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule { }
