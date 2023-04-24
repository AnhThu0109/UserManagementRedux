import { forwardRef } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Box, CircularProgress, Grid, TextField } from '@mui/material';

import { UpdateFormRefType } from '@app/pages/role/components/UpdateModal';
import { LevelDTO } from '@app/types/dtos/level.dto';

interface CreateFormProps {
  isLoading?: boolean;
  register: UseFormRegister<LevelDTO>;
  errors: FieldErrors<LevelDTO>;
  data?: LevelDTO;
  control?: any;
  ref?: any;
  isUpdate?: boolean;
}
const CreateForm = (
  { isLoading, register, errors, data, isUpdate = false }: CreateFormProps,
  ref: React.Ref<UpdateFormRefType>
): JSX.Element => {
  return (
    <div className='p-4'>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <CircularProgress />
        </div>
      ) : (
        <Box component='form' noValidate autoComplete='off' key={isLoading ? 'loading' : 'loaded'}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                disabled={isUpdate ? isUpdate : isLoading}
                fullWidth
                label='Code'
                defaultValue={data ? data.code : ''}
                {...register('code')}
                error={!!errors.code}
                helperText={errors.code?.message}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                disabled={isLoading}
                fullWidth
                label='Name'
                defaultValue={data ? data.name : ''}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};
export default forwardRef(CreateForm);
