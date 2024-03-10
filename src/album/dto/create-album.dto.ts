import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

const MIN_YEAR = 0;

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(MIN_YEAR)
  year: number;

  @ValidateIf((value: unknown): boolean => value === null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}
