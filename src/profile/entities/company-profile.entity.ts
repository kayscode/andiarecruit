import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(() => User)
    user: User;

    @OneToOne(() => Location, { lazy: true })
    location: Location;

}