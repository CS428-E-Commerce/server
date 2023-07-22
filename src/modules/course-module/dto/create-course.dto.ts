import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateCourseDTO{ 
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsString()
    code: string;
    
    @ApiProperty()
    coachId: number;
    
    @ApiProperty()
    @IsString()
    title: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    banner: string;
    
    @ApiProperty()
    @IsString()
    status: string;
    
    @ApiProperty()
    @IsString()
    level: string;
    
    @ApiProperty()
    maxSlot: number;
    
    @ApiProperty()
    cost: number;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    zoomLink: string;
}

export class CreateCourseDTO{
    @ApiProperty()
    @IsString()
    code: string;
    
    @ApiProperty()
    coachId: number;
    
    @ApiProperty()
    @IsString()
    title: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    banner: string;
    
    @ApiProperty()
    @IsString()
    status: string;
    
    @ApiProperty()
    @IsString()
    level: string;
    
    @ApiProperty()
    maxSlot: number;
    
    @ApiProperty()
    cost: number;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    zoomLink: string;
}

export class CreateSchedulerDTO{
    @ApiProperty()
    coachId: number;

    @ApiProperty()
    courseId: number;

    @ApiProperty()
    @IsDate()
    startTime: Date;

    @ApiProperty()
    @IsDate()
    endTime: Date;
}