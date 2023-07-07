import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'comments'})
export class UserEntity {
    @PrimaryColumn('varchar', { unique: true, nullable: false })    
    coachID: string;

    @PrimaryColumn('varchar', { nullable: false })
    studentID: string;

    @Column('varchar', { nullable: true })
    comment: string;

    @Column('date', { nullable: true })
    date: string;

    @Column('integer', { nullable: true })
    rate: number;
}