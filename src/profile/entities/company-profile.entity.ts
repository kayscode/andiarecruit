import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./location.entity";
import { Job } from "src/job/entities/job.entity";

@Entity("company_profiles")
export class CompanyProfile {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    created: Date;

    @Column()
    mission: string;

    @Column()
    activities_sector: string;

    @Column({ nullable: true })
    cover: string;

    @Column({ nullable: true })
    logo: string;

    @OneToOne(() => User, (user) => user.profile, { lazy: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "owner" })
    user: User;

    @OneToOne(() => Location, { lazy: true, nullable: true })
    @JoinColumn()
    location: Location;

    @OneToMany(() => Job, (job) => job.company)
    jobs: Job[];

}