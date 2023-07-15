import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("people_profiles")
export class PeopleProfile {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    middleName: string;

    @Column()
    bearth_date: Date;

    @Column()
    profession: string;

    @Column()
    profile: string;

    @OneToOne((_type) => Location, { lazy: true })
    location: Location

    @Column({ nullable: true })
    image: string;

    // @OneToOne(() => User, (user) => user.profile, { eager: true })
    // user: User
}