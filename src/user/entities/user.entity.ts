import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "../utils/user-type.enum";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    role: UserType;

    @Column({ nullable: true })
    profile: string;
}