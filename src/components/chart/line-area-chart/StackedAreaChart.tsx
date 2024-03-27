import { Box } from "@mantine/core";
import { CustomLayer, ResponsiveLine } from "@nivo/line";
import { useCustomMQuery } from "../../../../hooks/useCustomMQuery";

type StackedAreaChartProps = {
  customLayer: CustomLayer;
  noData: boolean;
  statistics: {
    data: {
      x: string;
      y: number;
      change: number;
    }[];
    id: string;
  }[];
};

function StackedAreaChart(props: StackedAreaChartProps) {
  const { isMobile } = useCustomMQuery();
  const { statistics, customLayer, noData } = props;

  const mx = isMobile ? 30 : 50;
  if (noData) return <div>nodata!!</div>;
  return (
    <Box style={{ height: 400, width: "100%", overflow: "visible" }}>
      <ResponsiveLine
        data={statistics}
        margin={{ top: 70, right: mx, bottom: 50, left: mx }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        curve="monotoneX"
        tooltip={({ point }) => {
          const _data = point.data as typeof point.data & { change: number };

          return (
            <div
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>{point.serieId}</strong>
              <br />
              Date: {point.data.xFormatted}
              <br />
              Value: {point.data.yFormatted}
              <br />
              Change: {_data.change}
            </div>
          );
        }}
        colors={{ scheme: "nivo" }}
        enableArea
        areaBaselineValue={0}
        areaOpacity={0.6}
        enableGridX={false}
        enableGridY={false}
        enablePoints
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh
        theme={{
          background: "transparent",
          axis: {
            ticks: {
              text: {
                fill: "#555",
              },
            },
          },
          grid: {
            line: {
              stroke: "#ddd",
            },
          },
        }}
        layers={[
          "grid",
          "axes",
          "areas",
          "crosshair",
          "lines",
          "points",
          "slices",
          "mesh",
          customLayer,
        ]}
      />
    </Box>
  );
}

export default StackedAreaChart;
