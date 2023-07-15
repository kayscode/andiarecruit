import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// import entitites
import { PeopleProfile } from './entities/people-profile.entity';
import { CompanyProfile } from './entities/company-profile.entity';
import { Location } from './entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, PeopleProfile, CompanyProfile])
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule { }
