import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'coach'})
export class CoachEntity {
    @PrimaryColumn('varchar', { unique: true, nullable: false })    
    coachID: string;

    @Column('integer', { nullable: true, default: 0 })
    totalRate: number;

    @Column('integer', { nullable: false, default: 0 })
    rateTurn: number;

    @Column('integer', { nullable: false, default: 0 })
    classTaught: number;

    @Column('money', { nullable: true })
    costPerClass: number;
  
    @Column('integer', { nullable: false, default: 0 })
    studentNumber: number;

    @Column('varchar', { nullable: true })
    wallet: string;
}