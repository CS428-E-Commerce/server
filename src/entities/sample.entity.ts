import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class SampleEntity {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column('varchar', { nullable: false })
    name: string;
  
    @Column('varchar', { nullable: false })
    address: string;
}