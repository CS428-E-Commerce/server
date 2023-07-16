import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({name: 'courses'})
export class CourseEntity {
    @PrimaryColumn('int', { nullable: false })    
    id: number;

    @Column('varchar', {nullable: false})
    code: string

    @Column('int', { nullable: false })
    coachID: number;

    @Column('varchar', { nullable: false })
    title: string;

    @Column('text', { nullable: true })
    banner: string;

    @Column('varchar', { nullable: true })
    status: string;
  
    @Column('varchar', { nullable: true })
    level: string;

    @Column('numeric', { nullable: true })
    maxSlot: number;

    @Column('numeric', { nullable: true })
    cost: number;

    @Column('text', { nullable: true })
    description: string;

    @Column('varchar', {nullable:false})
    zoomLink: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}