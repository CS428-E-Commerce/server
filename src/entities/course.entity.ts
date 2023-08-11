import { CreateCourseDTO } from "src/modules/course-module/dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'course'})
export class CourseEntity {
    @PrimaryGeneratedColumn({type: 'int', unsigned: true }) 
    id: number;

    @Column('varchar', {nullable: false})
    code: string

    @Column('int', { nullable: false })
    coachId: number;

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

    @Column('numeric', { nullable: true })
    attendeeNumber: number;

    @Column('varchar', {nullable:false})
    zoomLink: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    updateAttributes({code, coachId, title, banner, level, maxSlot, cost, status, description, zoomLink}: CreateCourseDTO) {
        this.code = code ? code : this.code
        this.coachId = coachId ? coachId : this.coachId
        this.description = description ? description : this.description
        this.banner = banner ? banner : this.banner
        this.title = title ? title : this.title
        this.status = status ? status : this.status
        this.level = level ? level : this.level
        this.maxSlot = maxSlot ? maxSlot : this.maxSlot
        this.cost = cost ? cost : this.cost
        this.zoomLink = zoomLink ? zoomLink : this.zoomLink
    }
}