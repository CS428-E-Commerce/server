import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'skills'})
export class UserEntity {
    @PrimaryColumn('varchar', { nullable: false })    
    CoachID: string;

    @PrimaryColumn('varchar', { nullable: false })
    skill: string;
}