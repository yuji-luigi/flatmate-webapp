import React from "react";
import { ICON_SIZES, Icons } from "../../../data/icons/icons";
import TextWithIcon from "../../text/TextWithIcon";
import CardWithTitle from "./CardWithTitle";

interface Props {
  title?: string;
  aboutData: AboutData;
  children?: React.ReactNode;
}

export interface AboutData {
  company?: string;
  tel?: string;
  email?: string;
  address?: string;
}
const ICON_SIZE = ICON_SIZES.textTile;
const AboutCard = ({ aboutData, title, children }: Props) => {
  return (
    <>
      <CardWithTitle>
        {aboutData.company && (
          <TextWithIcon icon={<Icons.buildings size={ICON_SIZE} />} text={aboutData.company} />
        )}
        {aboutData.address && (
          <TextWithIcon icon={<Icons.mapPin size={ICON_SIZE} />} text={aboutData.address} />
        )}
        {aboutData.tel && (
          <TextWithIcon icon={<Icons.phoneCall size={ICON_SIZE} />} text={aboutData.tel} />
        )}
        {aboutData.email && (
          <TextWithIcon icon={<Icons.mail size={ICON_SIZE} />} text={aboutData.email} />
        )}
        {children && children}
      </CardWithTitle>
    </>
  );
};

export default AboutCard;
