import { UseMutationResult } from '@tanstack/react-query';

import FormDialog from '@app/components/CommonDialog/FormDialog';
import { IDialogBaseRef } from '@app/types/dialog';
import { SchoolDTO } from '@app/types/dtos/school.dto';

import CoreUserInfoEducationForm from './CoreUserInfoEducationForm';

type EducationProps = {
  title: string;
  dialogRef: React.RefObject<IDialogBaseRef>;
  handleAction: (options: { onSuccess: () => void }) => UseMutationResult<SchoolDTO, unknown, SchoolDTO, unknown>;
  messageSuccess: string;
  messageFail: string;
  data: SchoolDTO;
  onCloseDialog: (ref: React.RefObject<IDialogBaseRef>) => void;
};

const UserEducationDialog: React.FC<EducationProps> = ({
  title,
  dialogRef,
  handleAction,
  messageSuccess,
  messageFail,
  data,
  onCloseDialog
}) => {
  return (
    <FormDialog width='sm' title={title} ref={dialogRef}>
      <CoreUserInfoEducationForm
        handleAction={handleAction}
        messageSuccess={messageSuccess}
        messageFail={messageFail}
        data={data}
        onCloseDialog={onCloseDialog}
      />
    </FormDialog>
  );
};

export default UserEducationDialog;
