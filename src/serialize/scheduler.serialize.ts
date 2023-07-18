import { Exclude, Expose } from "class-transformer";

@Exclude()
export class SchedulerSerialize {
    @Expose()
    id: number;

    @Expose()
    coachId: number;

    @Expose()
    courseId: number;

    @Expose()
    startTime: Date;

    @Expose()
    endTime: Date;
}