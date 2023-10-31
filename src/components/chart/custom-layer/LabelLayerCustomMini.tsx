import { Point } from '@nivo/line';
import React from 'react';

type PointCustom = Point & {
  data: { change: number; y: number; x: any };
};
export const LabelLayerCustomMini = ({ point }: { point: PointCustom }) => {
  // const prefix = point.data.change > 0 ? '+' : '';
  return (
    <g transform={`translate(${point.x}, ${point.y})`}>
      <rect x="-25" y="-45" width="50" height="20" fill="white" opacity="0.7" />
      <text dy="-30" textAnchor="middle" fontSize="12" fill="black">
        {/* {prefix} */}
        {point.data.y}
      </text>
    </g>
  );
};
