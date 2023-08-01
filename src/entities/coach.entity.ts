import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'coach'})
export class CoachEntity {
    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    id: number;

    @Column('varchar', {nullable: false})
    userId: string;

    @Column('numeric', {nullable: true, default: 0})
    totalRate: number;

    @Column('numeric', {nullable: true, default: 0})
    rateTurn: number;

    @Column('numeric', {nullable: true, default: 0})
    totalStudent: number;

    @Column('numeric', {nullable: true, default: 0})
    totalCourse: number;

    @Column('numeric', {nullable: true, default: 0})
    totalComment: number;

    @Column('numeric', {nullable: true, default: 0})
    yearExperience: number;

    @Column('numeric', {nullable: true, default: 0})
    averageCost: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}