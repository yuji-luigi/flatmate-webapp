import React from "react";
import { Card, Text } from "@mantine/core";
import Image from "next/image";
import { useCrudSelectors } from "../../redux/features/crud/crudSlice";
import { useLocale } from "../../../hooks/useLocale";
import { UserByUserType } from "../../types/models/user-by-user-type";

export const SystemTop = () => {
  const { crudDocuments: maintainers } = useCrudSelectors<UserByUserType>("maintainers");
  const { crudDocuments: propertyManagers } = useCrudSelectors<UserByUserType>("property_managers");
  const { crudDocuments: inhabitants } = useCrudSelectors<UserByUserType>("inhabitants");
  const { t } = useLocale();
  return (
    <div className="column-flex">
      <Text component="h1" className="page-title" size="xl">
        {t("System settings top")}
      </Text>
      <Text component="h3" className="page-subtitle" size="md">
        {t("Setup your condominium. Here is the summary of your system settings.")}
      </Text>
      <Text>
        {t("Property managers")}: {propertyManagers?.length}
      </Text>
      <Text>
        {t("Inhabitants")}: {inhabitants?.length}
      </Text>
      <Text>
        {t("Miantainers")}: {maintainers?.length}
      </Text>
      <Card>
        <Text className="section-title">{t("Property managers")}</Text>

        {propertyManagers.length ? (
          propertyManagers.map((pm) => (
            <div key={pm._id}>
              <Text>{pm.name}</Text>
              <Text>{pm.email}</Text>
            </div>
          ))
        ) : (
          <Text>Please </Text>
        )}
      </Card>
    </div>
  );
};
