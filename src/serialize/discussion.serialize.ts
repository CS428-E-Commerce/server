import { Exclude, Expose } from "class-transformer";

@Exclude()
export class DiscussionSerialize {
    @Expose()
    id: number;
    
    @Expose()
    courseId: number;
    
    @Expose()
    userId: string;
    
    @Expose()
    rate: number;
    
    @Expose()
    comment: string;
}