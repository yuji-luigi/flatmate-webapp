import { View, Image, StyleSheet, Text } from "@react-pdf/renderer";
import QRCode from "qrcode";
import React from "react";
import { AuthTokenModel } from "../../types/models/auth-token-model";
import { _PATH_FRONTEND } from "../../path/path-frontend";

const styles = StyleSheet.create({
  qrCodeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.2cm",
  },
  qrCodeImage: {
    // width: 100,
    height: "100%",
    objectFit: "contain",
  },
});

interface QrCodeViewProps {
  authToken: AuthTokenModel; // Adjust type as needed
  qrcodeUrl: string;
}

export const QrCodeViewForPdf: React.FC<QrCodeViewProps> = ({ authToken, qrcodeUrl }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const generateQrCode = async () => {
      const qrCodeUrl = await QRCode.toDataURL(qrcodeUrl);
      setQrCodeDataUrl(qrCodeUrl);
    };
    generateQrCode();
  }, [qrcodeUrl]);

  if (!qrCodeDataUrl) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.qrCodeContainer}>
      <Image style={styles.qrCodeImage} src={qrCodeDataUrl} />
      <Text>{authToken.nonce}</Text>
    </View>
  );
};
