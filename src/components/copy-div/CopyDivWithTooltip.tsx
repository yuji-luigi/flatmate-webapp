import { Box, Tooltip } from "@mantine/core";
import React, { ReactNode, useState } from "react";
import QRCode from "react-qr-code";
import { _PATH_FRONTEND } from "../../path/path-frontend";
import { HiddenAuthTokenInterface } from "../../types/models/auth-token-model";
import { useLocale } from "../../../hooks/useLocale";

export const CopyDivWithToolTip = ({
  children,
  textToCopy,
}: {
  children: ReactNode;
  textToCopy: string;
}) => {
  const { t } = useLocale();
  const [tooltipText, setTooltipText] = useState(t("copy"));
  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setTooltipText(t("Copied"));
          setTimeout(() => setTooltipText(t("copy url")), 2000); // Reset tooltip text after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      // Fallback method for copying text
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed"; // Avoid scrolling to bottom
      textArea.style.opacity = "0"; // Make it invisible
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setTooltipText(t("Copied"));
        setTimeout(() => setTooltipText(t("copy url")), 2000); // Reset tooltip text after 2 seconds
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Tooltip label={tooltipText}>
        <div
          style={{
            background: "white",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleCopy}
        >
          {children}
        </div>
      </Tooltip>
    </div>
  );
};
