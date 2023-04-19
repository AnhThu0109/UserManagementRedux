import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { IsNaN, IsNotEmptyArray, IsNotSpecialCharacterCustom, IsOnlyNumber } from '@app/utils/validate';

export type RoleId = {
  id: string;
};

export interface UserListQueryFilter {
  fromDate?: string;
  toDate?: string;
  status?: number | string;
  fullname?: string;
  email?: string;
  role?: RoleId[];
}

export interface QueryFilterOutputDTO extends UserListQueryFilter {
  status?: number;
}

export interface QueryFilterInputDTO extends UserListQueryFilter {
  status?: string;
  createDate?: string[];
}

export interface UserCreationDTO {
  fullname: string;
  username: string;
  email: string;
  phone_no: string;
  address: string;
  date_of_birth: string;
  role: RoleId[];
}

export class CreateUserFormDTO {
  @IsNotEmpty()
  @IsString()
  @IsNotSpecialCharacterCustom({ message: 'Full name must not contain special character' })
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @IsNotSpecialCharacterCustom({ message: 'Username must not contain special character' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOnlyNumber({ message: 'Phone number must be only contains number character' })
  @IsString()
  @Length(10, 10, { message: 'Phone number length must be 10' })
  phone_no: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  date_of_birth: string;

  @IsNotEmptyArray()
  role: string[];
}

export type ChangePasswordDataDTO = {
  old_password: string;
  new_password: string;
};

export interface FormattedUserFormDTO {
  fullname: string;
  username: string;
  email: string;
  phone_no: string;
  address: string;
  date_of_birth: string;
  role: RoleId[];
}

// New interface based on new design

export class IUserCoreInfo {
  @Length(8, 8, { message: 'Employee ID length must be 8 character' })
  @IsOnlyNumber({ message: 'Employee ID must be only contain number' })
  @IsNotEmpty({ message: 'Employee ID should not be empty' })
  employeeId: string;

  @IsNotSpecialCharacterCustom({ message: 'Full name must not contain special character' })
  @IsNaN({ message: 'Full name must contain only alphabet character' })
  @IsNotEmpty({ message: 'Full name should not be empty' })
  fullName: string;

  @Length(12, 12, { message: 'ID carrd no length must be 12 character' })
  @IsOnlyNumber({ message: 'ID card no must be only contain number' })
  @IsNotEmpty({ message: 'ID card no should not be empty' })
  idCardNo: string;

  @IsString()
  @IsNotEmpty({ message: 'Department should not be empty' })
  department: string;

  @IsString()
  @IsNotEmpty({ message: 'Role should not be empty' })
  role: string;

  @IsString()
  @IsNotEmpty({ message: 'Position should not be empty' })
  position: string;

  @Length(10, 10, { message: 'Phone number must exactly 10 characters' })
  @IsOnlyNumber({ message: 'Phone number must be only contain number' })
  @IsString()
  @IsNotEmpty({ message: 'Phone number should not be empty' })
  phone: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'D.O.B should not be empty' })
  dob: string;

  @IsString()
  @IsNotEmpty({ message: 'Date of employment should not be empty' })
  dateOfEmployment: string;

  @IsString()
  @IsNotEmpty({ message: 'Date of affiliation appointment should not be empty' })
  dateOfAffAppointment: string;

  @IsString()
  @IsNotEmpty({ message: 'Date of last promotion should not be empty' })
  dateOfLastPromotion: string;

  @IsString()
  @IsNotEmpty({ message: 'Date of next Promotion should not be empty' })
  dateOfNextPromotion: string;

  @IsString()
  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;

  status?: string;
  mainButtonLabel: string;
  isEditMode?: boolean;
}

export interface IUserCoreInfoDropdown {
  value: string;
  label: string;
}

export interface IUserCoreInfoDropdowns {
  departmentOption: IUserCoreInfoDropdown[];
  roleOption: IUserCoreInfoDropdown[];
  positionOption: IUserCoreInfoDropdown[];
  statusOption?: IUserCoreInfoDropdown[];
}

export interface IUserSchoolById {
  school?: string;
  startDate?: string;
  endDate?: string;
}
