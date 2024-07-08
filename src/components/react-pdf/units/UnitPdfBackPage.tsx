import { Page, Text, View, StyleSheet } from "@alexandernanberg/react-pdf-renderer";
import { AddressInfo } from "../../../types/address-info";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  addressSection: {
    margin: 10,
    marginLeft: "auto",
    display: "flex",
    maxWidth: "6cm",
    padding: 10,
    // flexGrow: 1,
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

export function UnitPdfBackPage({
  destination,
  sender,
}: {
  sender: AddressInfo;
  destination: AddressInfo;
}) {
  return (
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
  );
}
