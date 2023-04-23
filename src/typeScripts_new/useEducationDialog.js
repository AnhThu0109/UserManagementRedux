import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, InputLabel, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers';
import { UseMutationResult } from '@tanstack/react-query';
import dayjs from 'dayjs';

import CustomButton from '@app/components/Button';
import FormDialog from '@app/components/CommonDialog/FormDialog';
import { useToast } from '@app/hooks';
import { IDialogBaseRef } from '@app/types/dialog';
import { SchoolDTO } from '@app/types/dtos/school.dto';
import { validate } from 'class-validator';

type EducationProps = {
  title: string;
  dialogRef: React.RefObject<IDialogBaseRef>;
  handleAction: (options: { onSuccess: () => void }) => UseMutationResult<SchoolDTO, unknown, SchoolDTO, unknown>;
  messageSuccess: string;
  messageFail: string;
  data: SchoolDTO;
};
const resolver = classValidatorResolver(SchoolDTO);

const initialData = {
  school: '',
  startDate: '',
  endDate: '',
  degree: '',
  studyField: '',
  grade: ''
};

const UserEducationDialog: React.FC<EducationProps> = ({
  title,
  dialogRef,
  handleAction,
  messageSuccess,
  messageFail,
  data
}) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors }
  } = useForm<SchoolDTO>({
    resolver,
    defaultValues: data
  });

  // get query method
  const { mutate: execCreate, isLoading } = handleAction({
    onSuccess: () => {
      console.log('Successful');
    }
  });
  // useCreateSchool

  const toast = useToast();

  const onCloseModal = () => {
    reset(initialData);
    clearErrors(['school', 'startDate', 'endDate', 'degree', 'studyField', 'grade']);
  };

  // handle create new school
  const onSubmit = (formData: SchoolDTO) => {
    execCreate(formData, {
      onSuccess: () => {
        console.log("formdata",formData);
        reset({
          school: '',
          startDate: '',
          endDate: '',
          degree: '',
          studyField: '',
          grade: ''
        }); //reset modal when create success
        toast.success(messageSuccess);
        onCloseModal();
      },
      onError: (error) => {
        console.log("formdata",formData);
        toast.error(messageFail);
      }
    });
  };

  return (
    <FormDialog width='sm' title={title} ref={dialogRef}>
      <Grid container spacing={2} item xs={12} sm={12}>
        <Grid item xs={12} sm={4}>
          <Controller
            name='school'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <InputLabel htmlFor='school'>School</InputLabel>
                <TextField
                  {...register('school')}
                  fullWidth
                  id='school'
                  variant='outlined'
                  value={value}
                  onChange={(data) => {
                    onChange(data);
                  }}
                  error={!!errors.school}
                  helperText={errors.school?.message}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name='startDate'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <InputLabel htmlFor='startDate'>Start Date</InputLabel>
                <DatePicker
                  {...register('startDate')}
                  views={['year', 'month']}
                  className='w-full'
                  value={value ? dayjs(value, 'MM/YYYY') : null}
                  onChange={(date) => {
                    onChange(date?.format('MM/YYYY'));
                  }}
                  slotProps={{
                    textField: {
                      helperText: (
                        <Typography sx={{ color: 'red', fontSize: 12 }}>{errors.startDate?.message}</Typography>
                      )
                    }
                  }}
                  format="MM/YYYY"
                  sx={{
                    '& > label': {
                      color: errors.startDate && 'red'
                    },
                    '& fieldset.MuiOutlinedInput-notchedOutline': {
                      border: errors.startDate && '0.5px solid red'
                    }
                  }}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name='endDate'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <InputLabel htmlFor='endDate'>End Date</InputLabel>
                <DatePicker
                  {...register('endDate')}
                  views={['year', 'month']}
                  className='w-full'
                  value={value ? dayjs(value, 'MM/YYYY') : null}
                  onChange={(date) => {
                    onChange(date?.format('MM/YYYY'));
                  }}
                  slotProps={{
                    textField: {
                      helperText: <Typography sx={{ color: 'red', fontSize: 12 }}>{errors.endDate?.message}</Typography>
                    }
                  }}
                  format="MM/YYYY"
                  sx={{
                    '& > label': {
                      color: errors.endDate && 'red'
                    },
                    '& fieldset.MuiOutlinedInput-notchedOutline': {
                      border: errors.endDate && '0.5px solid red'
                    }
                  }}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name='degree'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <InputLabel htmlFor='degree'>Degree</InputLabel>
                <TextField
                  {...register('degree')}
                  fullWidth
                  id='degree'
                  variant='outlined'
                  value={value}
                  onChange={(data) => {
                    onChange(data);
                  }}
                  error={!!errors.degree}
                  helperText={errors.degree?.message}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name='studyField'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <InputLabel htmlFor='studyField'>Field of Study</InputLabel>
                <TextField
                  {...register('studyField')}
                  fullWidth
                  id='studyField'
                  variant='outlined'
                  value={value}
                  onChange={(data) => {
                    onChange(data);
                  }}
                  error={!!errors.studyField}
                  helperText={errors.studyField?.message}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name='grade'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <InputLabel htmlFor='grade'>Grade</InputLabel>
                <TextField
                  {...register('grade')}
                  fullWidth
                  id='grade'
                  variant='outlined'
                  value={value}
                  onChange={(data) => {
                    onChange(data);
                  }}
                  error={!!errors.grade}
                  helperText={errors.grade?.message}
                />
              </>
            )}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent='flex-end' sx={{ marginTop: 2 }}>
        <Grid container={true} item xs={3} justifyContent='flex-end'>
          <CustomButton type='contained' onClick={handleSubmit(onSubmit)}>
            <IconButton>
              <SaveIcon className='text-white' />
            </IconButton>
            <span className='mr-2'>Save</span>
          </CustomButton>
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default UserEducationDialog;
