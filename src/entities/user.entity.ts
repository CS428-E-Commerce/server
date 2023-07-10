import { LoginDto } from "src/auth/dto";
import { UpdateUserDto } from "src/modules/user/dto";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


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
    username: string;
  
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

    setAttribute() {
        this.id = uuidv4();
    }

    updateAttributes({phone, address, description, avatar, username}: UpdateUserDto) {
        this.phone = phone ? phone : this.phone
        this.address = address ? address : this.address
        this.description = description ? description : this.description
        this.avatar = avatar ? avatar : this.avatar
        this.username = username ? username : this.username

    }
}