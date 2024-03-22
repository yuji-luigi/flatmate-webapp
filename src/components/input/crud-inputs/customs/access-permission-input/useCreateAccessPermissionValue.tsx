import React, { useMemo } from "react";
import { useCrudSelectors } from "../../../../../redux/features/crud/crudSlice";
import { useItemSlice } from "../../../../../redux/features/crud/selectedItemSlice";
import {
  RoleModel,
  Role,
  UserModel,
  SpaceModel,
  AccessPermissionModel,
  permissionsDefaultValues,
  permissionsFormField,
} from "../../../../../types/models/space-model";
import { crudFormActions } from "../../../../drawer/crud-form-action";

export const useCreateAccessPermissionValue = ({
  selectedRole,
}: {
  selectedRole: RoleModel | null;
}) => {
  const { crudDocuments: accessPermissions } = useCrudSelectors<
    AccessPermissionModel & { role: { name: Role; _id: string } }
  >("accessPermissions");
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>("users");
  const { get } = useItemSlice<{ space: SpaceModel; role: RoleModel }>();
  const accessController = useMemo(() => {
    const _accessController = accessPermissions.find(
      (aCtrl) => aCtrl.role._id === selectedRole?._id && aCtrl.space
    );
    const defaultValue = permissionsFormField.reduce<
      Omit<AccessPermissionModel, "createdAt" | "_id" | "updatedAt">
    >(
      (acc, permission) => {
        return acc;
      },
      {
        user: selectedUser._id,
        role: selectedRole?._id || "",
        space: get?.space?._id || "",
        permissions: permissionsDefaultValues,
      }
    );

    return _accessController || defaultValue;
  }, [selectedRole?._id, get?.space]);
  return accessController;
};
