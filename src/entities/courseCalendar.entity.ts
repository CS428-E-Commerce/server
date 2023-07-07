import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'courseCalendar'})
export class UserEntity {
    @PrimaryColumn('varchar', { nullable: false })    
    CoachID: string;

    @PrimaryColumn('varchar', { nullable: false })
    CourseID: string;

    @PrimaryColumn('date', { nullable: false})
    start: string;

    @Column('date', { nullable: true})
    end: string;
}