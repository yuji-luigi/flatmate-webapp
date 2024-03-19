import React from "react";
import { CardArticleSmall } from "../../../components/card/CardArticleSmall";
import { CARD_LINK_PATH } from "../../../path/path-frontend";
import { MaintenanceModel } from "../../../types/models/maintenance-model";

const MaintenanceList = ({ maintenance }: { maintenance: MaintenanceModel }) => {
  console.log(maintenance);
  return (
    <>
      <CardArticleSmall
        key={maintenance.title}
        data={maintenance}
        author={maintenance.createdBy}
        category={maintenance.tags?.toString() || "tech"}
        date={maintenance.createdAt}
        image={maintenance.images[0]?.url}
        title={maintenance.title}
        hrefRoot={CARD_LINK_PATH.maintenances}
      />
    </>
  );
};

export default MaintenanceList;
