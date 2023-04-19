import moment from 'moment';

import { END_POINTS } from '../constants';
import { getAxiosInstance, getOriginalResponseData, getResponseData } from '../providers/axios';
import { LoginDataDTO, LoginOriginalResponse } from '../types/dtos/login.dto';
import { ChangePasswordDataDTO, UserCreationDTO, UserListQueryFilter, IUserSchoolById } from '../types/dtos/user.dto';
import { CreateUserEntity, UserEntity } from '../types/entities/user.entity';

export const loginMutation = {
  name: 'loginMutation',
  fn: async (data: LoginDataDTO): Promise<LoginOriginalResponse> => {
    const responseData = getOriginalResponseData<LoginOriginalResponse>(
      await getAxiosInstance().post(END_POINTS.AUTH.LOGIN, {
        request_date_time: moment(new Date()).format('YYYYMMDDHHmmssSSS'),
        data
      })
    );

    return responseData;
  }
};

export const getUserListQuery = {
  name: 'getUserListQuery',
  fn: async (filter: UserListQueryFilter): Promise<UserEntity[]> => {
    const responseData = getResponseData<UserEntity[]>(
      await getAxiosInstance().post(END_POINTS.USER.GET_LIST_USER, {
        data: filter
      })
    );

    return responseData;
  }
};

export const createUserMutation = {
  name: 'createUserMutation',
  fn: async (newUser: UserCreationDTO): Promise<CreateUserEntity> => {
    const responseData = getResponseData<CreateUserEntity>(
      await getAxiosInstance().post(END_POINTS.USER.CREATE_USER, {
        data: newUser
      })
    );
    return responseData;
  }
};

export const resetUserPasswordMutation = {
  name: 'resetPasswordMutation',
  fn: async (username: string): Promise<unknown> => {
    return getResponseData<unknown>(
      await getAxiosInstance().put(END_POINTS.USER.RESET_PASSWORD, {
        data: {
          username
        }
      })
    );
  }
};

export const changePasswordMutation = {
  name: 'changePasswordMutation',
  fn: async (passwordData: ChangePasswordDataDTO): Promise<unknown> => {
    return getResponseData<unknown>(
      await getAxiosInstance().put(END_POINTS.USER.CHANGE_PASSWORD, {
        data: {
          ...passwordData
        }
      })
    );
  }
};

export const deleteUserMutation = {
  name: 'changePasswordMutation',
  fn: async (username: string): Promise<unknown> => {
    return getResponseData<unknown>(
      await getAxiosInstance().post(END_POINTS.USER.DELETE_USER, {
        data: {
          username
        }
      })
    );
  }
};

export const getUserByIdQuery = {
  name: 'getUserByIdQuery',
  fn: async (userId: number): Promise<IUserSchoolById[]> => {
    const responseData = getResponseData<IUserSchoolById[]>(
      await getAxiosInstance().post(`${END_POINTS.USER.GET_LIST_USER}/${userId}`)
    );

    return responseData;
  }
};