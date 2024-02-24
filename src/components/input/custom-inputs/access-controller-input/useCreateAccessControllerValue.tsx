import React, { useMemo } from 'react';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import { useItemSlice } from '../../../../redux/features/crud/selectedItemSlice';
import {
  AccessControllerModel,
  permissionsFormField,
  permissionsDefaultValues,
} from '../../../../types/models/access-controller-type';
import { RoleModel, Role, UserModel, SpaceModel } from '../../../../types/models/space-model';
import { crudFormActions } from '../../../drawer/crud-form-action';

export const useCreateAccessControllerValue = ({
  selectedRole,
}: {
  selectedRole: RoleModel | null;
}) => {
  const { crudDocuments: accessControllers } = useCrudSelectors<
    AccessControllerModel & { role: { name: Role; _id: string } }
  >('accessControllers');
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>('users');
  const { get } = useItemSlice<{ space: SpaceModel; role: RoleModel }>();
  const accessController = useMemo(() => {
    const _accessController = accessControllers.find(
      (aCtrl) => aCtrl.role._id === selectedRole?._id && aCtrl.space
    );
    const defaultValue = permissionsFormField.reduce<
      Omit<AccessControllerModel, 'createdAt' | '_id' | 'updatedAt'>
    >(
      (acc, permission) => {
        return acc;
      },
      {
        user: selectedUser._id,
        role: selectedRole?._id || '',
        space: get?.space?._id || '',
        permissions: permissionsDefaultValues,
      }
    );

    return _accessController || defaultValue;
  }, [selectedRole?._id, get?.space]);
  return accessController;
};
