import { CreateSchedulerDTO } from "src/modules/course-module/dto";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'course_schedule'})
export class CourseCalendarEntity {
    @PrimaryGeneratedColumn({type: 'int', unsigned: true })
    id: number

    @Column('int', { nullable: false })    
    coachId: number;

    @Column('int', { nullable: false })
    courseId: number;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    endTime: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    updateAttributes(createScheduler: CreateSchedulerDTO) {
        this.coachId = createScheduler.coachId ? createScheduler.coachId : this.coachId
        this.courseId = createScheduler.courseId ? createScheduler.courseId : this.courseId
        this.startTime = createScheduler.startTime ? createScheduler.startTime : this.startTime
        this.endTime = createScheduler.endTime ? createScheduler.endTime : this.endTime
    }
}