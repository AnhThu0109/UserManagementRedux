import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { IsNotSpecialCharacterCustom } from '@app/utils/validate';

export interface IUserSchoolById {
  school?: string;
  startDate?: string;
  endDate?: string;
}

export class SchoolDTO {
  @IsNotEmpty()
  @IsString()
  @IsNotSpecialCharacterCustom({ message: 'School must not contain special character' })
  @MinLength(2)
  @MaxLength(20)
  school: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  @IsNotSpecialCharacterCustom({ message: 'Degree must not contain special character' })
  @MinLength(5)
  @MaxLength(20)
  degree: string;

  @IsNotEmpty()
  @IsString()
  @IsNotSpecialCharacterCustom({ message: 'Field of study must not contain special character' })
  @MinLength(5)
  @MaxLength(30)
  studyField: string;

  @IsNotEmpty()
  @IsString()
  @IsNotSpecialCharacterCustom({ message: 'Field of study must not contain special character' })
  @MinLength(3)
  @MaxLength(10)
  grade: string;
}

export interface SchoolEntity {
    school: string;
    startDate: string;
    endDate: string;
    degree: string;
    studyField: string;
    grade: string;
  }
