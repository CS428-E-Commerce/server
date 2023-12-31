import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class FindCourseDTO{
    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    code: string = null;

    @ApiProperty()
    @IsOptional()
    coachId: number = null;

    @ApiProperty()
    @IsOptional()
    userId: string = null;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    status: string = null;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    level: string = null;

    @ApiProperty()
    offset: number = 0;

    @ApiProperty()
    limit: number = 0;
}

export class FindScheduler{
    @ApiProperty()
    courseId: number = 0;

    @ApiProperty()
    @IsOptional()
    startTime: Date = null;

    @ApiProperty()
    offset: number = 0;

    @ApiProperty()
    limit: number = 0;
}

export class GetID{
    @ApiProperty()
    id: number;
}