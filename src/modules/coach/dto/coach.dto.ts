import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
}