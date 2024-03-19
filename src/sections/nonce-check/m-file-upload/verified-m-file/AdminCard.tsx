import React from "react";
import { Avatar, MantineStyleProp } from "@mantine/core";
import TextWithIcon from "../../../../components/text/TextWithIcon";
import CardWithTitle from "../../../../components/profile/side/CardWithTitle";
import { UserModel } from "../../../../types/models/space-model";

type Props = {
  admins: string[] | UserModel[];
  style?: MantineStyleProp;
};

// TODO: admin card to show all admins/system admins
export const AdminCard = (props: Props) => {
  const { admins, style } = props;
  // return <div>adminCard</div>;
  return (
    <CardWithTitle title="Contacts" style={{ background: "transparent" }}>
      {admins.map((admin, index) => {
        if (typeof admin === "string") {
          throw new Error("not populated");
        }
        return (
          <TextWithIcon
            key={admin._id}
            icon={<Avatar src={admin.avatar?.url} size={24} radius="lg" />}
            text={`${admin.name} ${admin.surname} - ${admin.email}`}
          />
        );
      })}
    </CardWithTitle>
  );
};
