import React, { useEffect } from "react";
import { Group, Stack, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useCrudSelectors } from "../../../redux/features/crud/crudSlice";

import PostFeedCard from "../../../components/posts/feed/PostFeedCard";
import { StaticDataTable } from "../../../components/datatable/StaticDataTable";
import { maintenancesTableData } from "../../../../json/dataTable/formfields/maintenancesTableData";
import { Icons } from "../../../data/icons/icons";
import { DashboardTopHeader } from "../../../sections/dashboard/dashboard_top/components/DashboardTopHeader";
import { FeedTableSwitch } from "./compontents/FeedTableSwitch";
import { useSegmentedControl } from "../../../components/tab/useSegmentedControl";
import { filterList } from "../../../components/datatable/filter/logic/applyFilter";
import { useFilter } from "../../../../hooks/useFilter";
import useTable, { getComparator } from "../../../../hooks/useTable";
import { MaintenanceModel } from "../../../types/models/maintenance-check-type";
import { FeedView } from "../../../components/posts/FeedView";
import { StackOverride } from "../../../components/overrides/stack/StackOverride";
import { DashboardTopCenteredHeader } from "../../../sections/dashboard/dashboard_top/components/DashboardTopCenteredHeader";

const VIEW_KEY = "feed-maintenance-view";

export const SpaceMaintenanceSection = () => {
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
  useEffect(() => {
    setCurrentValue(value || "table");
  }, [value]);
  return (
    <>
      {value === "posts" && (
        <FeedView>
          <DashboardTopCenteredHeader
            header="Maintenances"
            otherComponent={<FeedTableSwitch localStorageKey={VIEW_KEY} />}
          />
          {filteredList.map((maintenance) => (
            <PostFeedCard key={maintenance._id} data={maintenance} />
          ))}
        </FeedView>
      )}
      {value === "table" && (
        <StackOverride>
          <DashboardTopCenteredHeader
            header="Maintenances"
            otherComponent={<FeedTableSwitch localStorageKey={VIEW_KEY} />}
          />
          {/* <DashboardTopHeader
            // header="Maintenances"
            rightSection={<FeedTableSwitch localStorageKey={VIEW_KEY} />}
          /> */}
          <StaticDataTable json={maintenancesTableData} data={filteredList} withFilter />
        </StackOverride>
      )}
    </>
  );
};
