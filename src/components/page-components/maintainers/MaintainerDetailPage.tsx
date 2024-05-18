import { Box, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import { lorem100 } from "../../../_mock/strings";
import { useCustomModalContext } from "../../../context/modal-context/_ModalContext";
import { maintainersTableData } from "../../../json/dataTable/formfields/maintainersTableData";
import { RANDOM_UPLOAD_MODELS } from "../../../lib/image-paths";
import { useCrudSliceStore, useCrudSelectors } from "../../../redux/features/crud/crudSlice";
import { BuildingCard } from "../../../sections/dashboard/maintainer_detail_page/BuildingCard";
import { FavoriteMaintainerButton } from "../../../sections/dashboard/maintainer_detail_page/FavoritMaintainerButton";
import AddMaintainerModal from "../../../sections/dashboard/maintenance_detail_page/AddMaintainerModal";
import { MaintainerModel } from "../../../types/models/maintainer-model";
import { UserModel, ThreadModel } from "../../../types/models/space-model";
import { getEntityFromUrl } from "../../../utils/helpers/helper-functions";
import PostFeedCard from "../../posts/feed/PostFeedCard";
import { CoverDataProp } from "../../profile/CoverWithoutCard";
import ProfileCoverGeneric from "../../profile/ProfileCoverGeneric";
import AboutCard from "../../profile/side/AboutCard";
import ProfileSide from "../../profile/side/ProfileSide";
import { PATH_API } from "../../../path/path-api";
import axiosInstance from "../../../utils/axios-instance";
import classes from "../../../styles/global-useStyles.module.css";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";

const getMaintainer = async (slug?: string) => {
  if (!slug) return null;
  const res = await axiosInstance.get(`${PATH_API.maintainersSlug}/${slug}`);
  return res.data.data;
};

export const MaintainerDetailPage = () => {
  const router = useRouterWithCustomQuery({ entity: "maintainer" });

  const { openConfirmModal } = useCustomModalContext();

  // const _entity = getEntityFromUrl();
  const _entity = router.query.entity;
  //TODO: use useCrudSelectors + combine useSWR and fetchCrudDocument hook
  const {
    data: fetchedData,
    // error,
    isLoading,
  } = useSWR(["maintainer", router.query.slug], () => getMaintainer(router.query.slug as string));

  const { setCrudDocument } = useCrudSliceStore();
  const { crudDocument } = useCrudSelectors<MaintainerModel>("maintainer");
  // const { crudDocument: document } = useCrudSelectors(_entity);

  const isMobile = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    if (fetchedData) {
      setCrudDocument({ entity: _entity, document: fetchedData });
    }
  }, [fetchedData?._id]);

  if (isLoading) return "isLoading";

  const data = crudDocument
    ? {
        title: crudDocument.name,
        subtitle: crudDocument.company,
        avatarUrl: crudDocument.avatar?.url,
        coverUrl: crudDocument.cover?.url,
      }
    : ({} as CoverDataProp);
  // create about data
  const aboutData = {
    // title: 'About',
    email: crudDocument?.email,
    tel: crudDocument?.tel,
    company: crudDocument?.company,
    address: crudDocument?.address,
  };
  const handleAddMaintainer = async () => {
    // setSpaces(data);
    // setIsOpened(true);
    openConfirmModal({
      type: "custom",
      title: "Add maintainer to Building",
      centered: true,
      children: <AddMaintainerModal />,
      opened: false,
      onClose(): void {
        throw new Error("Function not implemented.");
      },
    });
  };

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.box}>
          <Box className={classes.cardMain}>
            <Group>
              <ProfileCoverGeneric formFields={maintainersTableData} data={data} />
              <ProfileSide
                contents={
                  <>
                    <FavoriteMaintainerButton onClick={handleAddMaintainer} />
                    <AboutCard aboutData={aboutData} />
                    <BuildingCard />
                  </>
                }
              />
            </Group>
            <PostFeedCard
              data={
                {
                  _id: "d",
                  createdAt: new Date(),
                  createdBy: { name: "No name user" } as UserModel,
                  title: "The First Job! maintainers detail page!",
                  description: lorem100,
                  images: RANDOM_UPLOAD_MODELS,
                  attachments: [],
                } as ThreadModel
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
