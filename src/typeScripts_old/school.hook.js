import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { IUserSchoolById } from '../../types/dtos/school.dto';
import { IHttpError } from '../../types/http';
import { createSchoolMutation, deleteSchoolMutation, getSchoolByIdQuery, getSchoolListByUserIdQuery, getSchoolListQuery, updateSchoolMutation } from '../school.api';
import { SchoolDTO } from '@app/types/dtos/school.dto';

type UserGetByIdQueryResult = UseQueryResult<IUserSchoolById[], IHttpError>;

interface PropsType {
  onSuccess: (data: SchoolDTO[]) => void;
}

export const useGetSchoolList = ({ onSuccess }: PropsType): UseQueryResult<SchoolDTO[], IHttpError> => {
  return useQuery<SchoolDTO[], IHttpError>({
    queryKey: [getSchoolListQuery.name],
    queryFn: async () => getSchoolListQuery.fn(), //add argument
    onSuccess: (data) => {
      onSuccess?.(data);
    }
  });
};

export const useGetSchoolListByUserId = ({
  userId,
  onSuccess,
  onError,
  enabled = true
}: {
  userId: number | string | undefined;
  onSuccess: (data: SchoolDTO[]) => void;
  onError: () => void;
  enabled?: boolean;
}): UseQueryResult<SchoolDTO[], IHttpError> => {
  return useQuery<SchoolDTO[], IHttpError, SchoolDTO[]>({
    queryKey: [getSchoolListByUserIdQuery.name, userId],
    queryFn: async () => getSchoolListByUserIdQuery.fn(userId),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      onError?.();
    },
    enabled: enabled
  });
};

// export const useGetShoolList = (
//   userId: number,
//   {
//     onSuccess,
//     onError
//   }: {
//     onSuccess?: (data: SchoolDTO[]) => void;
//     onError?: (err: IHttpError) => void;
//   }
// ): UserGetByIdQueryResult => {
//   const query = useQuery<SchoolDTO[], IHttpError>({
//     queryKey: [getUserSchoolByIdQuery.name, userId],
//     queryFn: async () => {
//       return getUserSchoolByIdQuery.fn(userId);
//     },
//     onSuccess: (data) => {
//       onSuccess?.(data);
//     },
//     onError: (err) => {
//       onError?.(err);
//     },
//     refetchOnWindowFocus: false,
//     retry: 3,
//     retryDelay: 3000
//   });

//   return query;
// };

export const useGetSchool = ({
  schoolId,
  onSuccess,
  onError,
  enabled = true
}: {
  schoolId: number | string | undefined;
  onSuccess: (data: SchoolDTO) => void;
  onError: () => void;
  enabled?: boolean;
}): UseQueryResult<SchoolDTO, IHttpError> => {
  return useQuery<SchoolDTO, IHttpError, SchoolDTO>({
    queryKey: [getSchoolByIdQuery.name, schoolId],
    queryFn: async () => getSchoolByIdQuery.fn(schoolId),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      onError?.();
    },
    enabled: enabled
  });
};

export const useCreateSchool = ({
    onSuccess
  }: {
    onSuccess: (data: SchoolDTO) => void;
  }): UseMutationResult<SchoolDTO, unknown, SchoolDTO, unknown> => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: SchoolDTO) => {
        const level = await createSchoolMutation.fn(data);
        queryClient.invalidateQueries([getSchoolListQuery.name]);
        return level;
      },
      onSuccess: (data) => {
        onSuccess?.(data);
      }
    });
  };

  export const useUpdateSchool = ({
    onSuccess
  }: {
    onSuccess: (data: SchoolDTO) => void;
  }): UseMutationResult<SchoolDTO, unknown, SchoolDTO, unknown> => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: SchoolDTO) => {
        const level = await updateSchoolMutation.fn(data);
        queryClient.invalidateQueries([getSchoolListQuery.name]);
        return level;
      },
      onSuccess: (data) => {
        onSuccess?.(data);
      }
    });
  };

  // export const useDeleteSchool = (): UseMutationResult<object, IHttpError, SchoolDTO, unknown> => {
  //   //// Change parameter type in UseMutationResult from string to SchoolDTO
  //   const queryClient = useQueryClient();
  //   return useMutation({
  //     mutationFn: async (data: SchoolDTO) => {
  //       //// Change parameter type in mutationFn from string to SchoolDTO
  //       const deletedSchool = await deleteSchoolMutation.fn(data.school);
  //       queryClient.invalidateQueries([getSchoolListQuery.name]);
  //       return data;
  //     },
  //   });
  // };

  export const useDeleteSchool = ({
    onSuccess
  }: {
    onSuccess: (data: SchoolDTO) => void;
  }): UseMutationResult<SchoolDTO, unknown, SchoolDTO, unknown> => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: SchoolDTO) => {
        const deletedSchool = await deleteSchoolMutation.fn(data.school);
        queryClient.invalidateQueries([getSchoolListQuery.name]);
        return data;
      },
      onSuccess: (data) => {
        onSuccess?.(data);
      }
    });
  };
