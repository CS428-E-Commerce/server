import { ESORT_DIRECTION } from "@Constants/index.ts";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterCoachDto {
    @ApiProperty()
    @IsNotEmpty()
    offset: number;

    @ApiProperty()
    @IsNotEmpty()
    limit: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    sortBy: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(ESORT_DIRECTION)
    direction: ESORT_DIRECTION;
}

export class UpdateCoachDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    phone: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    yearExperience: number;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })    
    @IsOptional()
    skills: string[];

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })    
    @IsOptional()
    certificates: string[];
}
