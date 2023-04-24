import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
  useCreateSchool,
  useDeleteSchool,
  useGetSchoolListByUserId,
  useUpdateSchool
} from '@app/apis/hooks/school.hook';
import CustomButton from '@app/components/Button';
import ConfirmationDialog from '@app/components/CommonDialog/ConfirmationDialog';
import FormDialog from '@app/components/CommonDialog/FormDialog';
import CustomTable from '@app/components/CustomTable/CustomTable';
import { useToast } from '@app/hooks';
import { IDialogBaseRef } from '@app/types/dialog';
import { SchoolDTO } from '@app/types/dtos/school.dto';

import CoreUserInfoEducationForm from './CoreUserInfoEducationForm';

interface UserData {
  school: string;
  startDate: string;
  endDate: string;
}

const UserEducation = (props): JSX.Element => {
  const [data, setData] = useState<UserData[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const removeUriDialogRef = useRef<IDialogBaseRef>(null);
  const urisAddNewDialogRef = useRef<IDialogBaseRef>(null);
  const urisEditDialogRef = useRef<IDialogBaseRef>(null);
  const [currentData, setCurrentData] = useState<SchoolDTO>({
    school: '',
    startDate: '',
    endDate: '',
    degree: '',
    studyField: '',
    grade: ''
  });

  const defaultData = {
    school: '',
    startDate: '',
    endDate: '',
    degree: '',
    studyField: '',
    grade: ''
  };

  const initialData: UserData[] = useMemo(
    () => [
      {
        school: 'School 1',
        startDate: '01/2022',
        endDate: '01/2024',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 2',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 3',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 4',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 5',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 6',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 7',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 8',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 9',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 10',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      },
      {
        school: 'School 11',
        startDate: '01/2021',
        endDate: '01/2023',
        degree: 'Bachelor',
        studyField: 'Information Technology',
        grade: 'Good'
      }
    ],
    []
  );

  useEffect(() => {
    setData(initialData);
    setIsUpdate(false);
  }, [isUpdate]);

  const [paginationValue, setPaginationValue] = useState({
    page: 0,
    pageSize: 10,
    totalDataLength: 11
  });

  // declare useToast hook
  const toast = useToast();

  //get school list
  // const {
  //   data: userSchoolList = [],
  //   isFetching,
  //   refetch
  // } = useGetSchoolListByUserId(props.userId, {
  //   onSuccess: (data) => {
  //     setPaginationValue({
  //       page: 0,
  //       pageSize: 10,
  //       totalDataLength: data?.length || 0
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error(`Get user school list Fail!\n${error?.message}`);
  //   }
  // });

  const {
    data: userSchoolList = [],
    isFetching,
    refetch
  } = useGetSchoolListByUserId({
    userId: props.userId,
    onSuccess: (data) => {
      setPaginationValue({
        page: 0,
        pageSize: 10,
        totalDataLength: data?.length || 0
      });
    },
    onError: () => {
      // toast.error('Get education list Fail!');
    }
  });

  const { mutate: deleteSchool } = useDeleteSchool({
    onSuccess: () => {
      console.log('delete');
      setIsUpdate(true);
    }
  });

  const handleDelete = (item: SchoolDTO) => {
    removeUriDialogRef.current?.show(() => {
      toast.success('Delete user successful!');
      deleteSchool(item);
    });
  };

  const handleAddNew = useCallback(() => {
    setCurrentData(defaultData);
    urisAddNewDialogRef.current?.show();
  }, []);

  const handleUpdate = useCallback((item: SchoolDTO) => {
    setCurrentData(item);
    urisEditDialogRef.current?.show();
  }, []);

  const closeDialogHandler = (ref) => {
    ref.current?.hide();
  };

  return (
    <>
      <CustomButton
        type='contained'
        icon={<AddCircleOutlineIcon />}
        onClick={handleAddNew}
        className='float-right sm:mt-4'>
        Add New
      </CustomButton>
      <CustomTable
        data={data}
        tableField={[
          { field: 'school', label: 'School' },
          { field: 'startDate', label: 'Start Date' },
          { field: 'endDate', label: 'End Date' },
          { field: 'action', label: 'Actions' }
        ]}
        paginationValue={paginationValue}
        handlePagination={setPaginationValue}
        uniqueField='username'
        handleEdit={handleUpdate}
        handleDelete={handleDelete}
      />
      <ConfirmationDialog title='Delete' ref={removeUriDialogRef} cancelLabel='No' confirmedLabel='Yes'>
        Do you want to delete this school information?
      </ConfirmationDialog>

      <FormDialog width='sm' title='Add Education' ref={urisAddNewDialogRef}>
        <div className='pt-4'>
          <CoreUserInfoEducationForm
            handleAction={useCreateSchool}
            messageSuccess='Create education information successful!'
            messageFail='Create education information fail!'
            data={currentData}
            onCloseDialog={() => closeDialogHandler(urisAddNewDialogRef)}
          />
        </div>
      </FormDialog>

      <FormDialog width='sm' title='Edit Education' ref={urisEditDialogRef}>
        <div className='pt-4'>
          <CoreUserInfoEducationForm
            handleAction={useUpdateSchool}
            messageSuccess='Update education information successful!'
            messageFail='Update education information fail!'
            data={currentData}
            onCloseDialog={() => closeDialogHandler(urisEditDialogRef)}
          />
        </div>
      </FormDialog>
    </>
  );
};

export default UserEducation;
