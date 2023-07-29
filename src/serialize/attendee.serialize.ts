import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AttendeeSerialize {
  @Expose()
  id: number;

  @Expose()
  courseId: number;

  @Expose()
  userId: string;
}