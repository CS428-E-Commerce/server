import { Exclude, Expose } from "class-transformer";



@Exclude()
export class UserSerialize {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    address: string;

    @Expose()
    description: string;

    @Expose()
    username: string;

    @Expose()
    avatar: string;

    @Expose()
    phone: string;

}