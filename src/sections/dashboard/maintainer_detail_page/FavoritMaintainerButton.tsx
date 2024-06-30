import { ActionIcon, Button, Skeleton } from "@mantine/core";
import React, { useState } from "react";
import { hideNotification, notifications, showNotification } from "@mantine/notifications";
import { AxiosRequestConfig } from "axios";
import { useCrudSelectors, useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { useCookieContext } from "../../../context/CookieContext";
import { getEntityFromUrl, sleep } from "../../../utils/helpers/helper-functions";
import { MaintainerModel } from "../../../types/models/maintainer-model";
import axiosInstance from "../../../utils/axios-instance";
import { apiEndpointRootsEnum, apiEndpoint } from "../../../path/path-api";
import { useCustomModalContext } from "../../../context/modal-context/_ModalContext";
import { useLocale } from "../../../../hooks/useLocale";
import { Icons } from "../../../data/icons/icons";
import LoadingScreen from "../../../components/screen/LoadingScreen";

export const FavoriteMaintainerButton = ({ onClick }: { onClick: () => void }) => {
  const _entity = "maintainer";
  const { t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const { setCrudDocument: setMaintainer } = useCrudSliceStore();
  const { crudDocument: maintainer } = useCrudSelectors<MaintainerModel>(_entity);
  const { currentSpace } = useCookieContext();
  const hasSpace = maintainer?.spaces?.map((s) => s._id).includes(currentSpace?._id || "");
  const { openConfirmModal } = useCustomModalContext();

  const handleAddRemoveFromSpace = async () => {
    setIsLoading(true);
    const id = showNotification({
      title: "Submitting",
      message: t("Please wait..."),
      loading: true,
    });
    try {
      if (!currentSpace?._id) {
        showNotification({
          title: "Error",
          message: t("Please select a building first"),
          color: "red",
        });
        return;
      }

      const config: AxiosRequestConfig = {
        method: hasSpace ? "delete" : "post",
        url: apiEndpoint.maintainers.space(maintainer._id),
        ...(hasSpace
          ? { data: { space: currentSpace._id } }
          : { data: { space: currentSpace._id } }),
      };

      const rawMaintainer = await axiosInstance(config);
      await sleep(750);
      hideNotification(id);

      setMaintainer({
        entity: _entity,
        document: rawMaintainer.data.data,
      });
    } catch (error: any) {
      hideNotification(id);
      showNotification({
        title: "Error",
        message: error.message || error,
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ActionIcon disabled={isLoading} onClick={handleAddRemoveFromSpace}>
      <Icons.star
        style={{
          color: hasSpace ? "var(--mantine-color-primary)" : "var(--mantine-color-grey)",
          fill: hasSpace ? "var(--mantine-color-primary)" : "",
          opacity: isLoading ? 0.5 : 1,
        }}
      />
    </ActionIcon>
  );
  // const { setCrudDocument } = useCrudSliceStore();
  // const [submitting, setSubmitting] = useState(false);

  // const { openConfirmModal } = useCustomModalContext();
  // const handleRemove = () => {
  //   openConfirmModal({
  //     labels: {
  //       confirm: 'Proceed',
  //       cancel: 'Go back',
  //     },
  //     centered: true,
  //     type: 'confirm',
  //     title: 'Remove maintainer from building',
  //     children: 'Are you sure you want to remove this maintainer from this building?',
  //     onConfirm: removeMaintainer,
  //     opened: false,
  //     onClose(): void {
  //       throw new Error('Function not implemented.');
  //     },
  //   });
  // };

  // const removeMaintainer = async (): Promise<void> => {
  //   try {
  //     setSubmitting(true);
  //     notifications.show({
  //       id: 'submit',
  //       title: 'Removing maintainer from building',
  //       message: 'Please wait...',
  //       autoClose: false,
  //       loading: true,
  //     });
  //     await sleep(1500);

  //     if (!currentSpace?._id) throw new Error('Building not selected: select a building at navbar');
  //     if (!maintainer?._id) {
  //       throw new Error(
  //         'Error: maintainer id is not found. If error persists please contact flatmates support team.'
  //       );
  //     }
  //     const res = await axiosInstance.delete(
  //       `${apiEndpointRootsEnum.maintainersSpace}?maintainer=${maintainer._id}&space=${currentSpace._id}`
  //     );
  //     setCrudDocument({ entity: _entity, maintainer: res.data.data });
  //     notifications.show({
  //       title: 'Success',
  //       message: 'maintainer removed from building',
  //       autoClose: 5000,
  //       // color: 'blue',
  //     });
  //   } catch (error: any) {
  //     console.log(error);
  //     notifications.show({
  //       title: 'Error',
  //       message: error.message || error,
  //       autoClose: 5000,
  //       color: 'red',
  //     });
  //   } finally {
  //     notifications.hide('submit');
  //     setSubmitting(false);
  //   }
  // };
  // console.log(maintainer);
  // if (!maintainer?.spaces) {
  //   return (
  //     <Button onClick={onClick} variant="outline" color="yellow">
  //       {t('Add/Remove maintainer to building')}
  //     </Button>
  //   );
  // }
  // const assignedToCurrentSpace = currentSpace?._id
  //   ? maintainer.spaces.map((space) => space._id)?.includes(currentSpace?._id)
  //   : false;
  // return (
  //   <>
  //     {assignedToCurrentSpace ? (
  //       <Button onClick={handleRemove} variant="outline" color="red">
  //         Remove maintainer From Building
  //       </Button>
  //     ) : (
  //       <Button onClick={onClick} variant="outline" color="yellow">
  //         Add maintainer to Building
  //       </Button>
  //     )}
  //   </>
  // );
};
