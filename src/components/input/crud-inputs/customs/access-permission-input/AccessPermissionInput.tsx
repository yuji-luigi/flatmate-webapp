import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { useLocale } from "../../../../../../hooks/useLocale";
import { Icons } from "../../../../../data/icons/icons";
import { useCrudSelectors, useCrudSliceStore } from "../../../../../redux/features/crud/crudSlice";
import { UserModel } from "../../../../../types/models/space-model";
import { AccessPermissionDisplay } from "./access-permission-display/AccessPermissionDisplay";
import { AccessPermissionFormModal } from "./form-modal/AccessPermissionFormModal";
import { AccessPermissionFormFieldType } from "../../../../../types/general/data/data-table/form-field-type/formField-types";

interface Prop {
  form: UseFormReturnType<Record<string, any>>;
  formField: AccessPermissionFormFieldType;
}
export const AccessPermissionFormButton = ({ form, ...others }: Prop) => {
  const { t } = useLocale("common");
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>("users");
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    fetchCrudDocuments({ entity: "roles" });
    if (selectedUser?._id) {
      fetchCrudDocuments({ entity: "accessPermissions", queryObject: { user: selectedUser._id } });
    }
    return () => {};
  }, []);

  return (
    <>
      <Button
        style={{ placeContent: "center" }}
        className="crud-input"
        onClick={() => setOpened(true)}
        data-column="4"
        variant="outline"
        leftSection={<Icons.alert size={20} />}
      >
        {t("Manage Access")}
      </Button>
      <AccessPermissionDisplay
        aCtrlValues={form.values.accessController as Record<string, boolean>[]}
      />

      <AccessPermissionFormModal
        form={form}
        opened={opened}
        closeModal={() => setOpened(false)}
        {...others}
      />
    </>
  );
};
