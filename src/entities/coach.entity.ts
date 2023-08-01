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

    @Column('varchar', {nullable: true})
    transactionId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}