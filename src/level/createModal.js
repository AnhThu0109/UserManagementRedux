import { forwardRef, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { useUpdateLevel } from '@app/apis/hooks';
import CustomButton from '@app/components/Button';
import { LevelDTO } from '@app/types/dtos/level.dto';

import CreateForm from './CreateForm';

export type UpdateFormRefType = {
  show: (data: LevelDTO) => void;
  hide: () => void;
};
const initialValue: LevelDTO = {
  code: '',
  name: ''
};
const resolver = classValidatorResolver(LevelDTO);

const UpdateModal = (_, ref: React.Ref<UpdateFormRefType>): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit
  } = useForm<LevelDTO>({ resolver });
  const handleShow = (data: LevelDTO) => {
    if (data) {
      reset(data);
    }
    setOpen(true);
  };
  const handleHide = useCallback(() => {
    reset(initialValue);
    setOpen(false);
  }, [reset]);
  const { mutate: execUpdate, isLoading: isUpdateLoading } = useUpdateLevel({
    onSuccess: () => {
      handleHide();
    }
  });
  const handleUpdateLevel = handleSubmit((formData: LevelDTO) => {
    execUpdate(formData);
  });
  return (
    <Dialog open={open} onClose={handleHide}>
      <DialogTitle id='update-level-dialog-title'>Update Level</DialogTitle>
      <DialogContent>
        <CreateForm
          ref={ref}
          control={control}
          isLoading={isUpdateLoading}
          register={register}
          errors={errors}
          isUpdate
        />
      </DialogContent>
      <DialogActions>
        <CustomButton type='text' onClick={handleHide} disabled={isUpdateLoading}>
          Cancel
        </CustomButton>
        <CustomButton type='contained' onClick={handleUpdateLevel} disabled={isUpdateLoading}>
          Update
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default forwardRef(UpdateModal);
