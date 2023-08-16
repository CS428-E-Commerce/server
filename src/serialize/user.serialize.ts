import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { CoachSerialize } from "./coach.serialize";

@Exclude()
class CoachInfo {
    @Expose()
    @ApiProperty()
    @IsNumber()
    id: string;

    @Expose()
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalRate: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    rateTurn: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalStudent: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalCourse: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalComment: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    averageCost: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    yearExperience: number;
}


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

    @Expose()
    @ApiProperty()
    @Type(() => CoachInfo)
    coachInfo: CoachInfo

}