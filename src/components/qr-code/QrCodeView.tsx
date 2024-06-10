import { Box } from "@mantine/core";
import React from "react";
import QRCode from "react-qr-code";
import { _PATH_FRONTEND } from "../../path/path-frontend";
import { HiddenAuthTokenInterface } from "../../types/models/auth-token-model";

export const QrCodeView = ({ authToken }: { authToken: HiddenAuthTokenInterface }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ background: "white", display: "flex", justifyContent: "center" }}>
        <QRCode
          style={{ padding: "10px" }}
          value={_PATH_FRONTEND.authTokens.qrCode({ entity: "users", authToken })}
        />
      </div>
    </div>
  );
};
