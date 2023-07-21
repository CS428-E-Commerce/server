import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";



@Exclude()
export class UserSerialize {
    @Expose()
    @ApiProperty()
    @IsString()
    id: string;

    @Expose()
    @ApiProperty()
    @IsString()
    email: string;

    @Expose()
    @ApiProperty()
    @IsString()
    address: string;

    @Expose()
    @ApiProperty()
    @IsString()
    description: string;

    @Expose()
    @ApiProperty()
    @IsString()
    username: string;

    @Expose()
    @ApiProperty()
    @IsString()
    avatar: string;

    @Expose()
    @ApiProperty()
    @IsString()
    phone: string;

}