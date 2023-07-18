import { Exclude, Expose } from "class-transformer";



@Exclude()
export class CourseSerialize {
    @Expose()
    id: number;

    @Expose()
    code: string;

    @Expose()
    coachId: number;

    @Expose()
    title: string;

    @Expose()
    banner: string;

    @Expose()
    status: string;

    @Expose()
    level: string;

    @Expose()
    maxSlot: number;

    @Expose()
    cost: number;

    @Expose()
    description: string;
}