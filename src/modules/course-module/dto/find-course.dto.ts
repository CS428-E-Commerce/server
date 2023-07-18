import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class FindCourseDTO{
    @ApiProperty()
    @IsString()
    @IsOptional()
    code: string = null;

    @ApiProperty()
    @IsOptional()
    coachId: number = null;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string = null;
    
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    status: string = null;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    level: string = null;
    
    @ApiProperty()
    @IsOptional()
    maxSlot: number = null;

    @ApiProperty()
    windowIndex: number = 0;
}

export class GetCourse{
    @ApiProperty()
    @IsString()
    code: string = null;
}

export class Scheduler{
    @ApiProperty()
    courseId: number = 0;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    startTime: Date = null;
}