import React, { ReactNode } from "react";

export const SimpleOneSectionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100dvh",
      }}
    >
      {children}
    </div>
  );
};
