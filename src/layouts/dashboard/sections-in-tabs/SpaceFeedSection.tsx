import { useEffect } from "react";
import { useCrudSelectors, useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import PostFeedCard from "../../../components/posts/feed/PostFeedCard";
import { ThreadModel } from "../../../types/models/space-model";
import { useGetCrudDocuments } from "../../../hooks/useGetCrudDocuments";
import { FeedLayout } from "./layout/FeedLayout";
import { Alert } from "@mantine/core";

// TODO: Change entity to  "feeds". create endpoint that responds with feeds [posts, maintenances, spendingNotifications]
const entity = "threads";
// const entity = "feeds";

export const SpaceFeedSection = () => {
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocuments, crudError, crudStatus } = useCrudSelectors(entity);
  useGetCrudDocuments({ entity: entity, withPagination: false });
  useEffect(() => {
    if (!crudDocuments.length) {
      fetchCrudDocuments({ entity: entity });
    }
  }, []);
  if (crudError) {
    return <Alert color="red">{crudError}</Alert>;
  }
  if (crudStatus === "loading") {
    return <Alert>Loading posts...</Alert>;
  }
  return (
    <FeedLayout>
      {crudDocuments.map((thread) => (
        <PostFeedCard key={thread._id} data={thread} />
      ))}
    </FeedLayout>
  );
};
