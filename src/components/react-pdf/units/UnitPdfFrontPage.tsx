import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { AddressInfo } from "../../../types/address-info";
import { useLocale } from "../../../../hooks/useLocale";
import { QrCodeViewForPdf } from "../../qr-code/QRCodeForPdf";
import { _PATH_FRONTEND } from "../../../path/path-frontend";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "transparent",
    padding: "1.5cm",
  },
  mainSection: {
    flexDirection: "column",
    // flexDirection: "row",
    marginTop: "auto",
    // justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
  qrcodeSection: {
    justifyContent: "center",
    margin: "auto",
    display: "flex",
    paddingBottom: "1.5cm",

    width: "100%",
  },
  addressSection: {
    display: "flex",
    // maxWidth: "6cm",
    marginTop: "auto",
    marginLeft: "auto",
    paddingBottom: "1.5cm",
    width: "50%",
  },
  textLg: {
    fontSize: 24,
  },
  textMd: {
    fontSize: 16,
  },
  textSm: {
    fontSize: 12,
  },
  textCenter: {
    textAlign: "center",
    margin: "auto",
    width: "100%",
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
  bottomSection: {
    margin: 10,
    padding: 10,
    height: "70%",
  },
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
      <View style={styles.mainSection}>
        {destination.authToken && destination.qrcodeUrl && (
          <View style={styles.qrcodeSection}>
            <Text style={{ ...styles.textMd, ...styles.textCenter, marginBottom: "0.2cm" }}>
              {t("Scan the code and register Flatmate")}
            </Text>
            <Text style={{ ...styles.textCenter, ...styles.textSm }}>
              {t("Get notified to know where our spending goes!")}
            </Text>
            <QrCodeViewForPdf authToken={destination.authToken} qrcodeUrl={destination.qrcodeUrl} />
            <Text style={{ fontSize: 6, textAlign: "center" }}>{destination.qrcodeUrl}</Text>
          </View>
        )}
        <View style={styles.addressSection}>
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
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.content}>
          {t("Dear ")}. {destination.name},{"\n\n"}
          [Your letter content goes here...]
        </Text>
      </View>
    </Page>
  );
}
