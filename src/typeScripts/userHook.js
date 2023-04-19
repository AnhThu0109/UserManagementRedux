import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { ChangePasswordDataDTO, UserCreationDTO, UserListQueryFilter, IUserSchoolById } from '../../types/dtos/user.dto';
import { CreateUserEntity, UserEntity } from '../../types/entities/user.entity';
import { IHttpError } from '../../types/http';
import {
  changePasswordMutation,
  createUserMutation,
  deleteUserMutation,
  getUserListQuery,
  resetUserPasswordMutation,
  getUserByIdQuery
} from '../user.api';

type UserGetListQueryResult = UseQueryResult<UserEntity[], IHttpError>;

export const useGetUserList = (
  filter: UserListQueryFilter,
  {
    onSuccess,
    onError
  }: {
    onSuccess?: (data: UserEntity[]) => void;
    onError?: (err: IHttpError) => void;
  }
): UserGetListQueryResult => {
  const query = useQuery<UserEntity[], IHttpError>({
    queryKey: [getUserListQuery.name, filter],
    queryFn: async () => {
      return getUserListQuery.fn(filter);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 3000
  });

  return query;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateUserEntity, IHttpError, UserCreationDTO>({
    mutationFn: async (data: UserCreationDTO) => {
      // return createUserMutation.fn(data);
      const user = await createUserMutation.fn(data);

      // refetch query getUserList after create success
      queryClient.invalidateQueries([getUserListQuery.name]);

      return user;
    }
  });
};

export const useUserResetPassword = () => {
  return useMutation<unknown, IHttpError, string>({
    mutationFn: async (username: string) => {
      return await resetUserPasswordMutation.fn(username);
    }
  });
};

export const useChangePassword = () => {
  return useMutation<unknown, IHttpError, ChangePasswordDataDTO>({
    mutationFn: async (passwordData: ChangePasswordDataDTO) => {
      return await changePasswordMutation.fn(passwordData);
    }
  });
};

export const useDeleteUser = () => {
  return useMutation<unknown, IHttpError, string>({
    mutationFn: async (username: string) => {
      return await deleteUserMutation.fn(username);
    }
  });
};

type UserGetByIdQueryResult = UseQueryResult<IUserSchoolById[], IHttpError>;

export const useGetUserById = (
  userId: number,
  {
    onSuccess,
    onError
  }: {
    onSuccess?: (data: IUserSchoolById[]) => void;
    onError?: (err: IHttpError) => void;
  }
): UserGetByIdQueryResult => {
  const query = useQuery<IUserSchoolById[], IHttpError>({
    queryKey: [getUserByIdQuery.name, userId],
    queryFn: async () => {
      return getUserByIdQuery.fn(userId);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 3000
  });

  return query;
};






