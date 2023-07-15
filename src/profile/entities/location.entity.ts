import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("locations")
export class Location {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    province: string;

    @Column()
    town: string;

    @Column({ nullable: true })
    avenue: string;

    @Column({ nullable: true })
    streetNumber: string;
}