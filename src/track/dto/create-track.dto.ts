import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((value: unknown): boolean => value === null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @ValidateIf((value: unknown): boolean => value === null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null;

  @IsNumber()
  @IsPositive()
  duration: number;
}
