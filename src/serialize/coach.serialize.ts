import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { UserSerialize } from "./user.serialize";


@Exclude()
export class CoachSkillSerialize {
    @Expose()
    @ApiProperty()
    @IsNumber()
    id: string;

    @Expose()
    @ApiProperty()
    @IsString()
    skill: string;
}

@Exclude()
export class CoachCertificateSerialize {
    @Expose()
    @ApiProperty()
    @IsNumber()
    id: string;

    @Expose()
    @ApiProperty()
    @IsString()
    certificate: string;
}


@Exclude()
export class CoachSerialize {
    @Expose()
    @ApiProperty()
    @IsNumber()
    id: string;

    @Expose()
    @ApiProperty()
    @IsNumber()
    totalRate: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    rateTurn: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    totalStudent: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    totalCourse: number;

    @Expose()
    @ApiProperty()
    @Type(() => UserSerialize)
    coachInfo: UserSerialize;

    @Expose()
    @ApiProperty()
    @Type(() => CoachCertificateSerialize)
    certificates: CoachCertificateSerialize[];


    @Expose()
    @ApiProperty()
    @Type(() => CoachSkillSerialize)
    skills: CoachSkillSerialize[];
}