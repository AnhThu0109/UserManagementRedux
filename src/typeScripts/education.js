import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useToast } from '@app/hooks';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Grid, MenuItem, TextField } from '@mui/material';

import CustomButton from '@app/components/Button';
import ConfirmationDialog from '@app/components/CommonDialog/ConfirmationDialog';
import FormDialog from '@app/components/CommonDialog/FormDialog';
import CustomTable from '@app/components/CustomTable/CustomTable';
import URISelectionForm from '@app/pages/permission/partitions/URISelectionForm';
import { URIPosition } from '@app/pages/permission/type';
import { IDialogBaseRef } from '@app/types/dialog';
import { useGetUserById } from '@app/apis/hooks';
import { CreateUserFormDTO, FormattedUserFormDTO } from '../../types/dtos/user.dto';

interface UserData {
  school: string;
  startDate: string;
  endDate: string;
}

const resolver = classValidatorResolver(CreateUserFormDTO);
const InputForm = (props): JSX.Element => {
  //get method from use hook form
  const {
    register,
    reset,
    setError,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors, isSubmitting, touchedFields }
  } = useForm<CreateUserFormDTO>({
    resolver,
    defaultValues: {
      school: '',
      startDate: '',
      endDate: '',
      degree: '',
      studyField: '',
      grade: ''
    }
  });

  // get query method
  const { mutate: execCreate, isLoading } = useCreateUser();

  const { data: roleList = [] } = useGetRoleList({
    filter: { status: '-1' }
  });

  const toast = useToast();

  const onCloseModal = () => {
    clearErrors(['fullname', 'username', 'address', 'date_of_birth', 'email', 'phone_no', 'role']);
    handleClose();
  };

  const formatFormData = (formData: CreateUserFormDTO): FormattedUserFormDTO => {
    const roleList = formData.role;

    const newRole = roleList?.map((item) => {
      return {
        id: item
      };
    });

    return { ...formData, ...{ role: newRole } };
  };

  // handle create new user
  const handleCreateUser = (formData: CreateUserFormDTO) => {
    execCreate(formatFormData(formData), {
      onSuccess: () => {
        reset({
          fullname: '',
          username: '',
          address: '',
          date_of_birth: '',
          email: '',
          phone_no: '',
          role: []
        }); //reset modal when create success
        toast.success('Create new user success!');
        onCloseModal();
      },
      onError: (error) => {
        toast.error(`Create new user fail!\n${error?.message}`);
        setError('username', { type: 'invalid', message: error?.message });
      }
    });
  };

  const currentDate = moment(moment.now()).format('YYYY-MM-DD');

  return (
    <FormDialog width='sm' title='Add Education' ref={props.urisAddNewDialogRef}>
    <Grid container spacing={2} item xs={12} sm={6}>
      <Grid item xs={12} sm={4}>
        <Controller
          name='school'
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id='schoolId'
              label='School'
              variant='outlined'
              value={value ? value : employeeId}
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.employeeId}
              helperText={errors.employeeId?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name='fullName'
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id='fullName'
              label='Full name'
              variant='outlined'
              value={value ? value : fullName}
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name='idCardNo'
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id='idCardNo'
              label='ID Card no'
              variant='outlined'
              value={value ? value : idCardNo}
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.idCardNo}
              helperText={errors.idCardNo?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name='department'
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              fullWidth
              id='department'
              label='Department'
              value={value || department}
              onChange={(data) => {
                onChange(data.target.value);
              }}>
              {departmentOption.map((option: IUserCoreInfoDropdown) => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name='role'
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              fullWidth
              id='role'
              label='Role'
              value={value ? value : role}
              onChange={(data) => {
                onChange(data.target.value);
              }}>
              {roleOption.map((option: IUserCoreInfoDropdown) => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name='position'
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              fullWidth
              id='position'
              label='Position'
              value={value ? value : position}
              onChange={(data) => {
                onChange(data.target.value);
              }}>
              {positionOption.map((option: IUserCoreInfoDropdown) => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      </Grid>
    </Grid>
    </FormDialog>
  );
};

const UserEducation = (props): JSX.Element => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [data, setData] = useState<UserData[]>([]);
  const removeUriDialogRef = useRef<IDialogBaseRef>(null);
  const saveDialogRef = useRef<IDialogBaseRef>(null);
  const urisAddNewDialogRef = useRef<IDialogBaseRef>(null);
  const [currentUriPosition, setCurrentUriPosition] = useState<URIPosition>(null);

  const initialData: UserData[] = useMemo(
    () => [
      {
        school: 'Example School',
        startDate: '01/01/2022',
        endDate: '01/01/2024'
      },
      {
        school: 'Another School',
        startDate: '01/01/2021',
        endDate: '01/01/2023'
      }
    ],
    []
  );

  useEffect(() => {
    setData(initialData);
  }, []);

  const [paginationValue, setPaginationValue] = useState({
    page: 0,
    pageSize: 10,
    totalDataLength: 100
  });

  // declare useToast hook
  const toast = useToast();

  //get user by Id
  const {
    data: userSchoolList = [],
    isFetching,
    refetch
  } = useGetUserById(props.userId, {
    onSuccess: (data) => {
      setPaginationValue({
        page: 0,
        pageSize: 10,
        totalDataLength: data?.length || 0
      });
    },
    onError: (error) => {
      toast.error(`Get user school list Fail!\n${error?.message}`);
    }
  });

  const handleDelete = useCallback(() => {
    removeUriDialogRef.current?.show(() => {});
  }, []);

  const handleAddNew = useCallback(() => {
    urisAddNewDialogRef.current?.show(() => {});
  }, []);

  const handleSave = () => {};

  const handleEdit = () => {
    setIsOpenDialog(true);
  };

  return (
    <>
      <CustomButton type='contained' icon={<AddCircleOutlineIcon />} onClick={handleAddNew}>
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
        handlePagination={setPaginationValue}
        uniqueField='username'
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <ConfirmationDialog title='Remove Education Info' ref={removeUriDialogRef} cancelLabel='No' confirmedLabel='Yes'>
        Do you want to remove this school information?
      </ConfirmationDialog>
      <FormDialog width='sm' title='Add Education' ref={urisAddNewDialogRef}>
        <URISelectionForm
          uriPosition={currentUriPosition}
          onAdd={handleSave}
          onCancel={() => {
            urisAddNewDialogRef.current?.hide();
          }}
        />
      </FormDialog>
    </>
  );
};

export default UserEducation;
