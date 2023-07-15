import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobApplicationState } from "../utils/job-application-state.enum";
import { Job } from "./job.entity";


@Entity("job_applications")
export class JobApplication {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    // connect to the job

    // refer the one who apply for the job

    @Column()
    state: JobApplicationState;

    @Column({ nullable: true })
    curriculumVitae: string;

    @Column({ nullable: true })
    identityCard: string;

    @Column({ nullable: true })
    onemCard: string;

    @ManyToOne((_type) => Job, (job) => job.applications)
    job: Job;

}