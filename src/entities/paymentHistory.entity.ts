import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'paymentHistory'})
export class UserEntity {
    @Column('varchar', { nullable: false })    
    CoachID: string;

    @PrimaryColumn('varchar', { nullable: false })
    studentID: string;

    @PrimaryColumn('varchar', { nullable: false })
    CourseID: string;

    @PrimaryColumn('varchar', { nullable: false })
    time: string;

    @Column('varchar', { nullable: false })
    money: string;
}