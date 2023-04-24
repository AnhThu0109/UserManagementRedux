import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import CustomButton from '@app/components/Button';
import { useToast } from '@app/hooks';
import { SchoolDTO } from '@app/types/dtos/school.dto';

const resolver = classValidatorResolver(SchoolDTO);

const initialData = {
  school: '',
  startDate: '',
  endDate: '',
  degree: '',
  studyField: '',
  grade: ''
};

const CoreUserInfoEducationForm = (props: any): JSX.Element => {
  const { school, startDate, endDate, degree, studyField, grade } = props.data;
  const [minDate, setMinDate] = useState<string | undefined>(startDate);
  const [maxDate, setMaxDate] = useState<string | undefined>(endDate);

  const {
    register,
    reset,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors }
  } = useForm<SchoolDTO>({
    resolver,
    defaultValues: {
      school,
      startDate,
      endDate,
      degree,
      studyField,
      grade
    }
  });

  // get query method
  const { mutate: execCreate, isLoading } = props.handleAction({
    onSuccess: () => {
      console.log('Successful');
    }
  });

  const toast = useToast();

  const onCloseModal = () => {
    clearErrors(['school', 'startDate', 'endDate', 'degree', 'studyField', 'grade']);
    props.onCloseDialog();
  };

  // handle create new school
  const onSubmit = (formData: SchoolDTO) => {
    execCreate(formData, {
      onSuccess: () => {
        console.log('submit data', formData);
        reset(initialData); //reset modal when create success
        toast.success(props.messageSuccess);
        onCloseModal();
      },
      onError: () => {
        toast.error(props.messageFail);
      }
    });
  };

  return (
    <>
      <Grid container spacing={2} item xs={12} sm={12}>
        <Grid item xs={12} sm={4}>
          <Controller
            name='school'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  {...register('school')}
                  label='School'
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
                <DatePicker
                  {...register('startDate')}
                  label='Start Date'
                  views={['year', 'month']}
                  className='w-full'
                  value={value ? dayjs(value, 'MM/YYYY') : null}
                  onChange={(date) => {
                    onChange(date?.format('MM/YYYY'));
                    setMinDate(date?.format('MM/YYYY'));
                  }}
                  maxDate={dayjs(maxDate, 'MM/YYYY')}
                  slotProps={{
                    textField: {
                      helperText: (
                        <Typography sx={{ color: 'red', fontSize: 12 }}>{errors.startDate?.message}</Typography>
                      )
                    }
                  }}
                  format='MM/YYYY'
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
                <DatePicker
                  {...register('endDate')}
                  label='End Date'
                  views={['year', 'month']}
                  className='w-full'
                  value={value ? dayjs(value, 'MM/YYYY') : null}
                  onChange={(date) => {
                    onChange(date?.format('MM/YYYY'));
                    setMaxDate(date?.format('MM/YYYY'));
                  }}
                  minDate={dayjs(minDate, 'MM/YYYY')}
                  slotProps={{
                    textField: {
                      helperText: <Typography sx={{ color: 'red', fontSize: 12 }}>{errors.endDate?.message}</Typography>
                    }
                  }}
                  format='MM/YYYY'
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
                <TextField
                  {...register('degree')}
                  label='Degree'
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
                <TextField
                  {...register('studyField')}
                  label='Field of Study'
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
                <TextField
                  {...register('grade')}
                  label='Grade'
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
    </>
  );
};

export default CoreUserInfoEducationForm;
