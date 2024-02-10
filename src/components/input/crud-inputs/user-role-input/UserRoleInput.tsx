import { Box, Button, Dialog, Text } from '@mantine/core';
import { useState } from 'react';
import { Toolbar } from 'yet-another-react-lightbox';
import { UseFormReturnTypeCustom } from '../../input_interfaces/useForm_interface';
import { UserRoleInput } from '../../../../types/general/data/data-table/formField-types';
import { rolesTableData } from '../../../../../json/dataTable/formfields/roleTableData';
import { useLocale } from '../../../../../hooks/useLocale';
import FormFieldsWithoutRefInputs from '../../FormFieldsWithoutRefInputs';
import classes from './UserRoleInput.module.css';
import { useCustomModalContext } from '../../../../context/modal-context/_ModalContext';
import { ROLES } from '../../../../types/models/user-model';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

const rolesTableDataByRole = ROLES.map((role) => {
  return {
    label: role.toUpperCase(),
    formFields: rolesTableData
      .map((roleFormField) => {
        if (role === 'inhabitant') {
          if (roleFormField.id !== 'rootSpaces') {
            return null;
          }
          return {
            ...roleFormField,
            id: `${role}.${roleFormField.id}`,
            name: `${role}.${roleFormField.name}`,
          };
        }
        return {
          ...roleFormField,
          id: `${role}.${roleFormField.id}`,
          name: `${role}.${roleFormField.name}`,
        };
      })
      .filter(Boolean),
  };
});

interface Prop {
  formField: UserRoleInput;
  form: UseFormReturnTypeCustom;
}
const UserRoleInput = ({ formField, form, ...others }: Prop) => {
  const { t } = useLocale();
  const [show, setShow] = useState(false);
  const handleShowInputs = () => {
    setShow(!show);
    openConfirmModal({
      title: <Text className="title">Manage Role</Text>,
      type: 'custom',
      fullScreen: true,
      withinPortal: true,
      children: <RoleFormInputs formField={formField} form={form} {...others} />,
    });
  };
  const { openConfirmModal } = useCustomModalContext();

  return <Button onClick={handleShowInputs}>Manage Role</Button>;
};

const RoleFormInputs = (props: Prop) => {
  const { t } = useLocale();
  const { form, formField, ...others } = props;

  return (
    <>
      <fieldset className={classes.formControl}>
        {rolesTableDataByRole.map((formFieldGroup) => (
          <Box key={formFieldGroup.label}>
            <Text>{t(formFieldGroup.label)}</Text>
            {formFieldGroup.formFields.map((roleFormField) => (
              <FormFieldsWithoutRefInputs
                key={roleFormField!.id}
                formField={roleFormField!}
                form={form}
                {...others}
              />
            ))}
          </Box>
        ))}
      </fieldset>
      <Box
        display="grid"
        style={{
          position: 'sticky',
          bottom: 0, // Anchors the box to the bottom of the viewport
          left: 0,
          right: 0,
          gap: 'var(--flex-gap)',
          paddingBlock: 'var(--flex-gap)',
          gridTemplateColumns: 'repeat(4, 1fr)',
          // borderTop: '1px solid white',
          background: 'rgba(27, 26, 26, 0.5)',
        }}
      >
        <Button style={{ gridColumn: '3 / span 1' }}>confirm</Button>
        <Button style={{ gridColumn: '4 / span 1' }}>cancel</Button>
      </Box>
    </>
  );
};

export default UserRoleInput;
