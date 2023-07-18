import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'comments'})
export class CommentsEntity {
    @PrimaryColumn('varchar', { unique: true, nullable: false })    
    coachID: string;

    @PrimaryColumn('varchar', { nullable: false })
    studentID: string;

    @Column('varchar', { nullable: true })
    comment: string;

    @Column('timestamp', { nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column('integer', { nullable: true })
    rate: number;
}