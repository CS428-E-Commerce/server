import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'course_discussion' })
export class CourseDiscussion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  courseId: number;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @Column({ type: 'numeric', nullable: true })
  rate: number;

  @Column({ type: 'varchar', nullable: true })
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
