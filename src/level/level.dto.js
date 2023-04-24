import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { IsNotSpecialCharacter } from '@app/utils/validate';

export interface LevelListQueryFilter {
  name?: string;
  code?: string;
}
export class LevelDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  @IsNotSpecialCharacter()
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  id?: number;
}
