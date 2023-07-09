import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({name: 'courses'})
export class CourseEntity {
    @PrimaryColumn('varchar', { nullable: false })    
    Title: string;

    @PrimaryColumn('varchar', { nullable: false })
    coachID: string;

    @Column('varchar', { nullable: true })
    description: string;

    @Column('varchar', { nullable: true })
    image: string;

    @Column('integer', { nullable: true })
    maxSlot: number;
  
    @Column('money', { nullable: true })
    cost: number;

    @Column('integer', { nullable: true })
    status: number;

    @Column('integer', { nullable: true })
    level: number;

    @Column('varchar', { nullable: true })
    join_link: string;
}