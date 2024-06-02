import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { AddressInfo } from "../../../types/address-info";
import { useLocale } from "../../../../hooks/useLocale";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  addressSection: {
    margin: 10,
    marginTop: "5cm",
    marginLeft: "auto",
    display: "flex",
    maxWidth: "6cm",
    padding: 10,
    // flexGrow: 1,
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
  // table: {
  //   display: "table",
  //   width: "auto",
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   borderColor: "#bfbfbf",
  //   borderRightWidth: 0,
  //   borderBottomWidth: 0,
  // },
  // tableRow: {
  //   margin: "auto",
  //   flexDirection: "row",
  // },
  // tableCol: {
  //   width: "25%",
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   borderLeftWidth: 0,
  //   borderTopWidth: 0,
  //   borderColor: "#bfbfbf",
  // },
  // tableCell: {
  //   margin: "auto",
  //   marginTop: 5,
  //   fontSize: 10,
  // },
});

export function UnitPdfFrontPage({
  sender,
  destination,
}: {
  sender: AddressInfo;
  destination: AddressInfo;
}) {
  const { t } = useLocale();
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.addressSection}>
        {/* <Text style={styles.address}>
          {sender.name}
          {"\n"}
          {sender.address}
          {sender.cityCode && `(${sender.cityCode})`}
          {"\n"}
          {sender.state}, {sender.stateCode && `(${sender.stateCode})`} {sender.postalCode}
        </Text> */}
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
          {t("Dear ")}. {destination.name},{"\n\n"}
          [Your letter content goes here...]
        </Text>
      </View>
    </Page>
  );
}
