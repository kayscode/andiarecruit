import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecruitingState } from "../utils/job-recruiting-state.enum";
import { JobApplication } from "./job-applications.entity";
import { CompanyProfile } from "src/profile/entities/company-profile.entity";

@Entity('jobs')
export class Job {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    candidateProfile: string;

    @Column()
    requiredSkills: string;

    @Column()
    additionalSkills: string;

    @Column()
    published: Date;

    @Column()
    isRecruiting: RecruitingState;

    @Column()
    isCVRequired: boolean;

    @Column()
    isIndentityCardRequired: boolean;

    @Column()
    isOnemCardRequired: boolean;

    @OneToMany((_type) => JobApplication, (JobApplication) => JobApplication.job)
    applications: JobApplication[]

    @ManyToOne((_type) => CompanyProfile, (companyProfile) => companyProfile.jobs)
    company: CompanyProfile
}
