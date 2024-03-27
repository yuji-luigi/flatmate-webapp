import { Point } from "@nivo/line";
import { useCustomMQuery } from "../../../../hooks/useCustomMQuery";
import { LabelLayerCustom } from "./LabelLayerCustom";
import { LabelLayerCustomMini } from "./LabelLayerCustomMini";

type CustomLayerProps = {
  points: PointCustom[];
  xScale: any;
  yScale: any;
};
type PointCustom = Point & {
  data: { change: number; y: number; x: any };
};

export const LabelLayer = (props: CustomLayerProps) => {
  const { points, xScale, yScale } = props;
  const { isMobile } = useCustomMQuery();
  // const LabelComponent = isMobile ? LabelLayerCustomMini : LabelLayerCustom;
  const LabelComponent = LabelLayerCustomMini;
  // return null;
  return (
    <>
      {points.map((point) => (
        <LabelComponent key={point.id} point={point} />
      ))}
    </>
  );
};
