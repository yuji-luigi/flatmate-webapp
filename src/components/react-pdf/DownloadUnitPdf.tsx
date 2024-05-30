import React, { forwardRef, Fragment, ReactNode } from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { Box, Group, Loader, Skeleton } from "@mantine/core";

interface AddressInfo {
  name: string;
  address: string;
  state: string;
  postalCode: string;
  cityCode?: string;
  stateCode?: string;
}

type Props = {
  sender: AddressInfo;
  destinations: AddressInfo[];
  ref?: React.Ref<HTMLDivElement>;
};

export const DownloadUnitPdf = forwardRef<HTMLDivElement, Props>(
  ({ sender, destinations }, ref) => {
    return (
      <Document>
        {destinations.map((destination) => (
          <Fragment key={destination.name}>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.address}>
                  {sender.name}
                  {"\n"}
                  {sender.address}
                  {sender.cityCode && `(${sender.cityCode})`}
                  {"\n"}
                  {sender.state}, {sender.stateCode && `(${sender.stateCode})`} {sender.postalCode}
                </Text>
                <Text style={styles.address}>
                  {destination.name}
                  {"\n"}
                  {destination.address}
                  {destination.cityCode && `(${destination.cityCode})`}
                  {"\n"}
                  {destination.state}, {destination.stateCode && `(${destination.stateCode})`}{" "}
                  {destination.postalCode}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.content}>
                  Dear Mr. Roque,{"\n\n"}
                  [Your letter content goes here...]
                </Text>
              </View>
            </Page>

            {/* Back Side */}
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.invoice}>
                  Invoice #12345{"\n"}
                  Date: 2024-05-29
                </Text>
              </View>
              {Array.from({ length: 10 }).map((_, index) => (
                <View key={index} style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Description</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Quantity</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Price</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Total</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Item 1</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>1</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>$100.00</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>$100.00</Text>
                    </View>
                  </View>
                  {/* Add more rows as needed */}
                </View>
              ))}
            </Page>
          </Fragment>
        ))}
      </Document>
    );
  }
);

export const UnitPdf = forwardRef<HTMLDivElement, Props>(({ sender, destinations }, ref) => {
  return (
    <>
      {destinations.map((destination) => (
        <Document ref={ref}>
          <>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.address}>
                  {sender.name}
                  {"\n"}
                  {sender.address}
                  {sender.cityCode && `(${sender.cityCode})`}
                  {"\n"}
                  {sender.state}, {sender.stateCode && `(${sender.stateCode})`} {sender.postalCode}
                </Text>
                <Text style={styles.address}>
                  {destination.name}
                  {"\n"}
                  {destination.address}
                  {destination.cityCode && `(${destination.cityCode})`}
                  {"\n"}
                  {destination.state}, {destination.stateCode && `(${destination.stateCode})`}{" "}
                  {destination.postalCode}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.content}>
                  Dear Mr. Roque,{"\n\n"}
                  [Your letter content goes here...]
                </Text>
              </View>
            </Page>

            {/* Back Side */}
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.invoice}>
                  Invoice #12345{"\n"}
                  Date: 2024-05-29
                </Text>
              </View>
              {Array.from({ length: 10 }).map((_, index) => (
                <View key={index} style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Description</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Quantity</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Price</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Total</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Item 1</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>1</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>$100.00</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>$100.00</Text>
                    </View>
                  </View>
                  {/* Add more rows as needed */}
                </View>
              ))}
            </Page>
          </>
        </Document>
      ))}
    </>
  );
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  address: {
    fontSize: 12,
    marginBottom: 20,
  },
  recipient: {
    fontSize: 12,
  },
  content: {
    fontSize: 14,
  },
  invoice: {
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#bfbfbf",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

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
      document={<DownloadUnitPdf {...props} />}
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
