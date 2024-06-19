import { Box, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { _PATH_FRONTEND } from "../../path/path-frontend";
import { HiddenAuthTokenInterface } from "../../types/models/auth-token-model";
import { useLocale } from "../../../hooks/useLocale";
import { CopyDivWithToolTip } from "../copy-div/CopyDivWithTooltip";

export const QrCodeView = ({ authToken }: { authToken: HiddenAuthTokenInterface }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CopyDivWithToolTip textToCopy={_PATH_FRONTEND.authTokens.invitationWithoutEmail(authToken)}>
        <QRCode
          style={{ padding: "10px" }}
          value={_PATH_FRONTEND.authTokens.invitationWithoutEmail(authToken)}
        />
      </CopyDivWithToolTip>
    </div>
  );
};
