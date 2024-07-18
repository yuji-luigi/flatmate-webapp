import React from "react";
import { Document, PDFViewer, Page, usePDF } from "@alexandernanberg/react-pdf-renderer";
import ErrorBoundary from "../../util-components/ErrorBoundary";

export function PDFPreview(props: { file: any }) {
  const { file } = props;
  const MyDoc = (
    <Document>
      <Page>
        <PDFViewer
          style={{
            width: "100%",
          }}
          height="300"
          showToolbar // @ts-ignore
          src={`${file.url}#zoom=50`}
        />
      </Page>
    </Document>
  );
  const [instance, update] = usePDF({ document: MyDoc });

  if (instance.error) return "error";
  return (
    <ErrorBoundary>
      <PDFViewer
        style={{
          width: "100%",
        }}
        height="300"
        showToolbar // @ts-ignore
        src={`${file.url}`}
      />
    </ErrorBoundary>
  );
}
