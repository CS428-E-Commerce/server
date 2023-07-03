import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'user'})
export class UserEntity {
    @PrimaryColumn('varchar', { unique: true, nullable: false })    
    id: string;

    @Column('varchar', { nullable: true })
    email: string;

    @Column('varchar', { nullable: true })
    password: string;

    @Column('varchar', { nullable: true })
    phone: string;

    @Column('varchar', { nullable: true })
    userName: string;
  
    @Column('varchar', { nullable: true })
    address: string;

    @Column('varchar', { nullable: true })
    description: string;

    @Column('varchar', { nullable: true })
    avatar: string;

    @Column('varchar', { nullable: true })
    role: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}