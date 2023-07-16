import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'attendees'})
export class AttendeeEntity {
    @PrimaryColumn('varchar', { unique: true, nullable: false })    
    courseID: string;

    @PrimaryColumn('varchar', { nullable: false })
    studentID: string;
}