import { Alert, Stack } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { useCrudSelectors, useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import PostFeedCard from "../../../../components/posts/feed/PostFeedCard";
import { NewPostInFeed } from "../../../../components/posts/feed/NewPostInFeed";
import { SimpleDisclosureContextProvider } from "../../../../context/SimpleDisclosureContext";
import classes from "../SpacePostSection.module.css";
import { ThreadModel } from "../../../../types/models/space-model";
import { useGetCrudDocuments } from "../../../../hooks/useGetCrudDocuments";

export const FeedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack gap={16} className={classes.feed}>
      <SimpleDisclosureContextProvider>
        <NewPostInFeed />
      </SimpleDisclosureContextProvider>
      {children}
    </Stack>
  );
};
