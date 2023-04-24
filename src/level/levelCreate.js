import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useCreateLevel, useGetLevel } from '@app/apis/hooks';
import CustomButton from '@app/components/Button';
import MainCard from '@app/components/MainCard/MainCard';
import { LevelDTO } from '@app/types/dtos/level.dto';

import CreateForm from './CreateForm';

const resolver = classValidatorResolver(LevelDTO);

interface PageProps {
  editMode?: boolean;
}
const LevelCreate = ({ editMode = false }): JSX.Element => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<LevelDTO>({ resolver });

  const { isFetching } = useGetLevel({
    levelId: levelId,
    onSuccess: (data) => {
      reset(data);
    },
    onError() {
      navigate('/master/level');
    },
    enabled: editMode
  });
  const { mutate: execCreate, isLoading: isCreateLoading } = useCreateLevel({
    onSuccess: () => {
      navigate('/master/level');
    }
  });
  const handleCreateLevel = handleSubmit((formData: LevelDTO) => {
    execCreate(formData);
  });
  return (
    <MainCard
      title={'Create Level'}
      headerChildren={
        <CustomButton
          type='contained'
          //   disabled={isFetching || isCreateLoading}
          onClick={handleCreateLevel}
          icon={<AddCircleOutlineIcon />}>
          Create
        </CustomButton>
      }>
      <CreateForm control={control} isLoading={isFetching || isCreateLoading} register={register} errors={errors} />
    </MainCard>
  );
};

export default LevelCreate;
