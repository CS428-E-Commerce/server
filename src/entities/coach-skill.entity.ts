import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'coach_skill'})
export class CoachSkillEntity {
    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    id: number;

    @Column('int', {nullable: false})
    coachId: number;

    @Column('varchar', {nullable: false})
    skill: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}
