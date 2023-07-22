import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'coach_certificate'})
export class CoachCertificateEntity {
    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    id: number;

    @Column('int', {nullable: false})
    coachId: number;

    @Column('varchar', {nullable: false})
    certificate: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}
