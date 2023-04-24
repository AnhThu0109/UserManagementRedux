import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useDeleteLevel, useGetLevelList } from '@app/apis/hooks/level.hook';
import CustomButton from '@app/components/Button';
import MainCard from '@app/components/MainCard/MainCard';
import { LevelDTO } from '@app/types/dtos/level.dto';

import CustomTable from '../../../components/CustomTable/CustomTable';

interface IPagination {
  page: number;
  pageSize: number;
  totalDataLength: number;
}

const LevelList = (): JSX.Element => {
  const navigate = useNavigate();
  const { data: levelList = [] } = useGetLevelList({ onSuccess: (data) => {} });

  const { mutate: deleteLevel, isLoading: isDeleteLoading } = useDeleteLevel();
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 5,
    totalDataLength: 0 // set default value to 0
  });
  const handlePagination = (e: IPagination) => {
    setPagination({ ...e });
  };
  const handleEdit = (item: LevelDTO) => {};
  const handleDelete = (item: LevelDTO) => {
    deleteLevel(item);
  };
  return (
    <>
      <MainCard
        sx={{ borderRadius: 1 }}
        title={'Level'}
        headerChildren={
          <CustomButton
            type='contained'
            //   disabled={isDeleteLoading}
            onClick={() => {
              navigate('/master/level/create');
            }}
            icon={<AddCircleOutlineIcon />}>
            Create
          </CustomButton>
        }>
        <CustomTable
          data={levelList || []}
          paginationValue={pagination}
          handlePagination={handlePagination}
          tableField={[
            { field: 'code', label: 'Code' },
            { field: 'name', label: 'Name' },
            { field: 'action', label: 'Actions' }
          ]}
          uniqueField='code'
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </MainCard>
      {/* <UpdateModal ref={updateModalRef}></UpdateModal> */}
    </>
  );
};
export default LevelList;
