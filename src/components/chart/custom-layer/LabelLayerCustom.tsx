import { Point } from "@nivo/line";
import React from "react";

type PointCustom = Point & {
  data: { change: number };
};
export const LabelLayerCustom = ({ point }: { point: PointCustom }) => {
  return (
    <g transform={`translate(${point.x}, ${point.y})`}>
      <rect x="-50" y="-45" width="100" height="40" fill="white" opacity="0.7" />

      <text dy="-15" textAnchor="middle" fontSize="12" fill="black">
        Total: {point.data.yFormatted}
      </text>
      <text dy="-30" textAnchor="middle" fontSize="12" fill="black">
        {point.data.change}
      </text>
    </g>
  );
};
