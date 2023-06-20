import { Expose } from "class-transformer";


export class SampleSerialize {
    @Expose()
    id: number;
    
    @Expose()
    name: string;
}