import React from "react";
import { useLocale } from "../../../../../hooks/useLocale";
import { StaticTableRow } from "../../../../components/datatable/table-rows/StaticTableRow";
import { StaticDataTable } from "../../../../components/datatable/StaticDataTable";
import { latestIssuesTableJson } from "./json/dashboardTableJson";
import { Text } from "@mantine/core";
import { CardTransparent } from "../../../../components/paper/CardTransparent";

export const PropertyManagerDashboard = () => {
  const { t } = useLocale();
  return (
    <div className="flex-column">
      <h2>{t("PropertyManagerDashboardSectionHeader ")}</h2>
      <div>
        <h3>{t("Properties stats")}</h3>
        <div className="grid-auto-fill">
          <CardTransparent>
            <h3>Contardo ferrini</h3>
            <Text>{t("Issues")}: 3</Text>
            <Text>{t("Maintenances")}: 6</Text>
            <Text>{t("Not paid")}: 3</Text>
          </CardTransparent>
        </div>
      </div>
      <div>
        <h3>{t("Latest issues")}</h3>
        <StaticDataTable data={[]} json={latestIssuesTableJson} />
      </div>
    </div>
  );
};
