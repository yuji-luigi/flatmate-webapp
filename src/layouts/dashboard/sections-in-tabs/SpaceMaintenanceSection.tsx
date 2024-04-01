import React, { useEffect } from "react";
import { Group, Stack, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useCrudSelectors } from "../../../redux/features/crud/crudSlice";

import PostFeedCard from "../../../components/posts/feed/PostFeedCard";
import { StaticDataTable } from "../../../components/datatable/StaticDataTable";
import { maintenancesTableData } from "../../../json/dataTable/formfields/maintenancesTableData";
import { Icons } from "../../../data/icons/icons";
import { DashboardTopHeader } from "../../../sections/dashboard/dashboard_top/components/DashboardTopHeader";
import { FeedTableSwitch } from "./compontents/FeedTableSwitch";
import {
  SegmentedControlContextProvider,
  useSegmentedControl,
} from "../../../components/tab/useSegmentedControl";
import { filterList } from "../../../components/datatable/filter/logic/applyFilter";
import { useFilter } from "../../../../hooks/useFilter";
import useTable, { getComparator } from "../../../../hooks/useTable";
import { MaintenanceModel } from "../../../types/models/maintenance-check-type";
import { FeedView } from "../../../components/posts/FeedView";
import { StackOverride } from "../../../components/overrides/stack/StackOverride";
import { DashboardTopCenteredHeader } from "../../../sections/dashboard/dashboard_top/components/DashboardTopCenteredHeader";
import { ClientProvider } from "../../ClientProvider";
import LoadingScreen from "../../../components/screen/LoadingScreen";

const VIEW_KEY = "feed-maintenance-view";

export const SectionContent = () => {
  const { crudDocuments } = useCrudSelectors<MaintenanceModel>("maintenances");
  const [value, setValue] = useLocalStorage({
    key: VIEW_KEY,
    defaultValue: "table",
    getInitialValueInEffect: true,
  });

  const { currentValue, setCurrentValue } = useSegmentedControl();
  const { filters } = useFilter();
  const { order, orderBy } = useTable({
    defaultOrderBy: "createdAt",
    // defaultDense: true,
    // defaultRowsPerPage: 10,
  });
  const filteredList = filterList({
    list: crudDocuments,
    filters,
    formFields: maintenancesTableData,
    comparator: getComparator(order, orderBy),
  });
  return (
    <Stack>
      <DashboardTopCenteredHeader
        header="Maintenances"
        otherComponent={<FeedTableSwitch localStorageKey={VIEW_KEY} />}
      />{" "}
      {(value === "posts" || !value) && (
        <FeedView>
          {filteredList.map((maintenance) => (
            <PostFeedCard key={maintenance._id} data={maintenance} />
          ))}
        </FeedView>
      )}
      {value === "table" && (
        <StackOverride>
          <StaticDataTable json={maintenancesTableData} data={filteredList} withFilter />
        </StackOverride>
      )}
    </Stack>
  );
};

export const SpaceMaintenanceSection = () => {
  return (
    <SegmentedControlContextProvider>
      <SectionContent />
    </SegmentedControlContextProvider>
  );
};
