import React from "react";
import { useLocale } from "../../../../../../hooks/useLocale";
import { StaticTableRow } from "../../../../../components/datatable/table-rows/StaticTableRow";
import { StaticDataTable } from "../../../../../components/datatable/StaticDataTable";
import { latestIssuesTableJson } from "../../json/dashboardTableJson";
import { Text } from "@mantine/core";
import { CardTransparent } from "../../../../../components/paper/CardTransparent";
import { PropertyGridMd } from "../../../../../components/grid/property-grid/PropertyGridMd";

export const PropertyManagerDashboard = () => {
  const i = useLocale("property-manager/top");
  console.log(i);
  const { t } = i;
  return (
    <div className="flex-column" style={{ gap: "2rem" }}>
      <h2>{t("PropertyManagerDashboardSectionHeader")}</h2>
      <section>
        <h3>{t("Properties stats")}</h3>
        <h4>{t("Summary")}</h4>
        <div>
          <Text>Total issues unresolved: 15</Text>
          <Text>Of which Maintenances reported unresolved: 15</Text>
          <Text>Maintenances due payments total: $89,770.00</Text>
        </div>
      </section>
      <section>
        <h4>{t("Properties")}</h4>
        <PropertyGridMd>
          <CardTransparent>
            <h3>Contardo ferrini</h3>
            <Text>{t("Issues")}: 3</Text>
            <Text>{t("Maintenances")}: 6</Text>
            <Text>{t("Not paid")}: 3</Text>
          </CardTransparent>
          <CardTransparent>
            <h3>Contardo ferrini</h3>
            <Text>{t("Issues")}: 3</Text>
            <Text>{t("Maintenances")}: 6</Text>
            <Text>{t("Not paid")}: 3</Text>
          </CardTransparent>
          <CardTransparent>
            <h3>Contardo ferrini</h3>
            <Text>{t("Issues")}: 3</Text>
            <Text>{t("Maintenances")}: 6</Text>
            <Text>{t("Not paid")}: 3</Text>
          </CardTransparent>
          <CardTransparent>
            <h3>Contardo ferrini</h3>
            <Text>{t("Issues")}: 3</Text>
            <Text>{t("Maintenances")}: 6</Text>
            <Text>{t("Not paid")}: 3</Text>
          </CardTransparent>
        </PropertyGridMd>
      </section>
      <div>
        <h3>{t("Latest issues")}</h3>
        <StaticDataTable data={[]} json={latestIssuesTableJson} />
      </div>
    </div>
  );
};
