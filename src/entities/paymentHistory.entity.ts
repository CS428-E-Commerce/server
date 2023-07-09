import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'paymentHistory'})
export class PaymentEntity {
    @Column('varchar', { nullable: false })    
    CoachID: string;

    @PrimaryColumn('varchar', { nullable: false })
    studentID: string;

    @PrimaryColumn('varchar', { nullable: false })
    CourseID: string;

    @PrimaryColumn('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    time: Date;

    @Column('varchar', { nullable: false })
    money: string;
}