import { Button, Drawer, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  cleanNotifications,
  hideNotification,
  notifications,
  showNotification,
} from "@mantine/notifications";
import { FormEvent, useEffect, useState, useMemo } from "react";
import allFormFields from "../../json/dataTable/formfields";
import { constructErrorNotificationData } from "../../data/showNofification/notificationObjects";
import { capitalize, sleep } from "../../utils/helpers/helper-functions";
import { getDefaultValues } from "../../utils/getDefaultValues";
import FormFields from "../input/FormFields";
import { useDrawerContext } from "../../context/DataTableDrawerContext";
import { useCrudSelectors, useCrudSliceStore } from "../../redux/features/crud/crudSlice";
import { usePaginationQuery } from "../../context/PaginationContext";
import { hasMedia } from "../../redux/features/crudAsyncThunks";
import CreationToolBar from "../input/CreationToolBar";
import { UseFormReturnTypeCustom } from "../input/input_interfaces/useForm_interface";

import { extractUploadingMedia, uploadFileAndGetModelId } from "../../utils/upload-helper";
import { FormFieldTypes } from "../../types/general/data/data-table/form-field-type/formField-types";
import classes from "./CrudDrawerDefault.module.css";
import useAuth from "../../../hooks/useAuth";
import { Entity } from "../../types/redux/CrudSliceInterfaces";
import { sectionsJson } from "../../json/section-config/sectionsConfig";
import useRouterWithCustomQuery from "../../hooks/useRouterWithCustomQuery";
import { useLocale } from "../../../hooks/useLocale";

export function CrudDrawerDefault({ overridingEntity }: { overridingEntity?: Entity }) {
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { query } = useRouterWithCustomQuery();
  const entity = overridingEntity || (query.entity as Entity);
  const { t } = useLocale();
  const parentId = query.parentId as string;
  const paginationQuery = usePaginationQuery();
  const sectionFormFields: FormFieldTypes[] = allFormFields[entity];
  const { closeDrawer, drawerIsOpen } = useDrawerContext();

  const {
    createCrudDocumentWithPagination: addCrud,
    updateCrudDocument,
    createLinkedChildDocumentWithPagination,
  } = useCrudSliceStore();
  const { crudDocument: singleCrudDocument, crudStatus, crudError } = useCrudSelectors(entity);
  const singleCrudId = singleCrudDocument?._id || null;
  /**
   * initialValues
   * defined here
   */
  const initialValues = useMemo(
    () => getDefaultValues(sectionFormFields, singleCrudDocument),
    [singleCrudDocument]
  );

  const form = useForm({
    name: "crud-form",
    initialValues,
  }) as UseFormReturnTypeCustom;

  function handleCloseDrawer() {
    closeDrawer();
    // selectCrudDocument({ entity, document: null });
    // form.reset();
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    showNotification({
      id: "submit",
      message: "Sending data to the server.",
      autoClose: false,
    });
    setSubmitting(true);

    // const data = media ? extractUploadingMedia(media) : {};

    const reqBody: Record<string, any> = {
      ...form.values,
      // ...data,

      media: undefined,
    };
    const media = structuredClone(form.values.media);
    if (media && hasMedia(media)) {
      try {
        const uploadIdData = await uploadFileAndGetModelId(extractUploadingMedia(media), entity);
        // eslint-disable-next-line guard-for-in
        for (const key in uploadIdData) {
          reqBody[key] = [...reqBody[key], ...uploadIdData[key]];
        }
      } catch (error) {
        console.log(error);
        notifications.hide("submit");
        setSubmitting(false);
        return;
      }
    }
    /** Create new Document */
    if (!singleCrudId) {
      if (parentId) {
        createLinkedChildDocumentWithPagination({
          entity,
          parentId,
          query: paginationQuery,
          newDocument: form.values,
        });
      } else {
        addCrud({ entity, newDocument: reqBody, parentId, query: paginationQuery });
      }
    }
    /** Modify selected document */
    if (singleCrudId) {
      updateCrudDocument({
        entity,
        updateData: reqBody,
        documentId: singleCrudId,
        parentId: query.parentId as string,
      });
    }
    // form.reset();
  };

  /** TODO: separate the function in to hooks or util function.*/
  async function handleSubmitSucceed() {
    /**
     * delay for drawer closing and ect these lines
     * to handle multiple notifications
     * */
    await sleep(800);
    closeDrawer();
    await sleep(200);
    hideNotification("submit");
    await sleep(100);

    /** show success notification */
    showNotification({
      message: "Operation success!!",
      title: "Success",
      color: "green",
      autoClose: 1000,
    });
    setSubmitting(false);
  }

  /** runs every time crudStatus changed */
  useEffect(() => {
    if (submitting) {
      if (crudStatus === "loading") {
        null;
      }
      /** define case for succeed */
      if (crudStatus === "succeed") {
        handleSubmitSucceed();
      }
      if (crudError && crudStatus === "failed") {
        hideNotification("submit");
        notifications.show(constructErrorNotificationData(crudError, 5000));
        setSubmitting(false);
        sleep(5000).then(() => {
          notifications.hide("error");
          cleanNotifications();
        });
      }
    }
    () => {
      hideNotification("submit");
      hideNotification("error");
    };
  }, [crudStatus]);

  useEffect(() => {
    form.setValues(initialValues);
  }, [singleCrudId]);

  useEffect(() => {
    form.setValues(initialValues);
  }, [drawerIsOpen]);

  if (!user) {
    return null;
  }

  const sectionJson = sectionsJson.dataTable[entity];
  const entityText = capitalize(sectionJson.title);
  const submitText = singleCrudId ? `Update ${entityText}!` : `Add ${entityText}!`;
  if (!drawerIsOpen) return null;
  return (
    <Drawer
      className={classes.drawer}
      opened={drawerIsOpen}
      onClose={handleCloseDrawer}
      title={<Text className="title">Create/Edit {entityText}</Text>}
      padding="xl"
      size="xl"
      position="right"
    >
      {/* <Icons.close onClick={handleCloseDrawer} /> */}
      <form onSubmit={onSubmit}>
        <div className="crud-drawer-form-fields">
          {sectionFormFields?.map((formField) => (
            <FormFields
              // initialValues={initialValues}
              form={form}
              formField={{ ...formField, label: t(formField.label) }}
              key={formField.id}
            />
          ))}
        </div>
        <CreationToolBar
          formFields={sectionFormFields}
          form={form}
          entity={entity}
          submitButton={
            <Button
              fullWidth
              className={classes.submitButton}
              disabled={submitting}
              type="submit"
              mt="xl"
              size="md"
            >
              {submitText}
            </Button>
          }
        />
      </form>
    </Drawer>
  );
}
