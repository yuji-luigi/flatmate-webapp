import React, { forwardRef, Fragment, ReactNode } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@alexandernanberg/react-pdf-renderer";
import { Box, Group, Loader, Skeleton } from "@mantine/core";
import { AddressInfo } from "../../../types/address-info";
import { UnitPdfFrontPage } from "./UnitPdfFrontPage";
import { UnitPdfBackPage } from "./UnitPdfBackPage";

type UnitsPdfProps = {
  sender: AddressInfo;
  destinations: AddressInfo[];
};

export const UnitsPdf = ({ sender, destinations }: UnitsPdfProps) => {
  return (
    <Document>
      {destinations.map((destination) => (
        <UnitPdfSingle sender={sender} destination={destination} />
      ))}
    </Document>
  );
};

/**
 *  NOTE: Must be wrapped in Document component provided by @alexandernanberg/react-pdf-renderer
 * */
export function UnitPdfSingle({ destination, sender }: UnitPdfPageProps) {
  return (
    <Fragment key={destination.name}>
      <UnitPdfFrontPage destination={destination} sender={sender} />
      <UnitPdfBackPage destination={destination} sender={sender} />
    </Fragment>
  );
}

type UnitPdfPageProps = {
  destination: AddressInfo;
  sender: AddressInfo;
};

// Create a component to render and download the PDF
export const DownloadUnitPdfLink = (props: {
  sender: AddressInfo;
  destinations: AddressInfo[];
  children?: ReactNode;
  loader?: ReactNode;
}) => {
  const { sender, destinations, children, loader } = props;
  return (
    <PDFDownloadLink
      style={{ width: "100%" }}
      document={<UnitsPdf {...props} />}
      fileName="letter_with_invoice.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <>
            {loader ? (
              loader
            ) : (
              <Group justify="center" style={{ width: "100%" }}>
                <Loader />
              </Group>
            )}
          </>
        ) : (
          children || "Download now!"
        )
      }
    </PDFDownloadLink>
  );
};

export default DownloadUnitPdfLink;
