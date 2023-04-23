import { END_POINTS } from '../constants';
import { getAxiosInstance, getResponseData } from '../providers/axios';
import { SchoolDTO } from '@app/types/dtos/school.dto';

export const getSchoolListQuery = {
  name: 'getSchoolListQuery',
  fn: async (): Promise<SchoolDTO[]> => {
    const responseData = getResponseData<SchoolDTO[]>(await getAxiosInstance().post(END_POINTS.SCHOOL.GET_LIST_SCHOOL));
    return responseData;
  }
};

export const getSchoolListByUserIdQuery = {
  name: 'getSchoolListByUserIdQuery',
  fn: async (userId: number | string | undefined): Promise<SchoolDTO[]> => {
    const responseData = getResponseData<SchoolDTO[]>(
      await getAxiosInstance().post(`${END_POINTS.SCHOOL.GET_LIST_SCHOOL}/${userId}`)
    );

    return responseData;
  }
};

export const getSchoolByIdQuery = {
  name: 'getSchoolByIdQuery',
  fn: async (schoolId: number | string | undefined): Promise<SchoolDTO> => {
    const responseData = getResponseData<SchoolDTO>(
      await getAxiosInstance().post(`${END_POINTS.SCHOOL.GET_LIST_SCHOOL}/${schoolId}`)
    );

    return responseData;
  }
};

export const createSchoolMutation = {
  name: 'createSchoolMutation',
  fn: async (newSchool: SchoolDTO): Promise<SchoolDTO> => {
    const responseData = getResponseData<SchoolDTO>(
      await getAxiosInstance().post(END_POINTS.SCHOOL.CREATE_SCHOOL, {
        data: newSchool
      })
    );
    return responseData;
  }
};

export const updateSchoolMutation = {
  name: 'updateSchoolMutation',
  fn: async (newSchool: SchoolDTO): Promise<SchoolDTO> => {
    const responseData = getResponseData<SchoolDTO>(
      await getAxiosInstance().post(END_POINTS.SCHOOL.UPDATE_SCHOOL, {
        data: newSchool
      })
    );
    return responseData;
  }
};

export const deleteSchoolMutation = {
  name: 'deleteSchoolMutation',
  fn: async (school: string): Promise<object> => {
    const responseData = getResponseData<object>(
      await getAxiosInstance().post(END_POINTS.SCHOOL.DELETE_SCHOOL, {
        data: { school }
      })
    );
    return responseData;
  }
};



