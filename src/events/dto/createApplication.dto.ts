import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({
    type: String,
    example: 'event test',
  })
  @IsString()
  @IsNotEmpty()
  event: string;

  @ApiProperty({
    type: String,
    example: 'alex',
  })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    type: String,
    example: '2023-12-01 10:00:00.00',
  })
  @IsString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({
    type: String,
    example: '2024-01-01 10:00:00.00',
  })
  @IsString()
  @IsNotEmpty()
  end: string;

  @ApiProperty({
    type: String,
    example: ['1,2', '2,3'],
  })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  positionsRequested: string[];

  @ApiProperty({
    type: String,
    example: ['request1', 'request2'],
  })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  facilitiesRequested: string[];

  @ApiProperty({
    type: String,
    example: 'event note',
  })
  @IsString()
  @IsNotEmpty()
  notes: string;
}
