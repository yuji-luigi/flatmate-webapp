import { Card } from '@mantine/core';
import { Point, ResponsiveLine } from '@nivo/line';

function StackedAreaChart() {
  const data = [
    {
      id: 'A',
      data: [
        { x: 'Feb 2', y: 300000, change: 0 },
        { x: 'Feb 15', y: 300000 - 500, change: -500 },
        { x: 'Feb 23', y: 300000 - 500, change: 0 },
        { x: 'Feb 28', y: 300000 - 1000, change: -500 },
        { x: 'Mar 5', y: 300000 + 500, change: 1500 },
        { x: 'Mar 18', y: 300000 + 250, change: -250 },
      ],
    },
    // {
    //   id: 'B',
    //   data: [
    //     { x: 'Jan', y: 5 },
    //     { x: 'Feb', y: 15 },
    //     { x: 'Mar', y: 20 },
    //   ],
    // },
  ];

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 70, right: 50, bottom: 50, left: 50 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      curve="natural"
      tooltip={({ point }) => {
        const _data = point.data as typeof point.data & { change: number };

        return (
          <div
            style={{
              padding: '6px 12px',
              backgroundColor: '#fff',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
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
      // axisTop={null}
      // axisRight={null}
      // axisBottom={{
      //   orient: 'bottom',
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: 'Month',
      //   legendOffset: 36,
      //   legendPosition: 'middle',
      // }}
      // axisLeft={{
      //   orient: 'left',
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: 'Value',
      //   legendOffset: -40,
      //   legendPosition: 'middle',
      // }}
      colors={{ scheme: 'nivo' }}
      enableArea
      areaBaselineValue="auto"
      areaOpacity={0.6}
      enableGridX={false}
      enableGridY={false}
      enablePoints
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh
      theme={{
        background: 'transparent',
        axis: {
          ticks: {
            text: {
              fill: '#555',
            },
          },
        },
        grid: {
          line: {
            stroke: '#ddd',
          },
        },
      }}
      layers={[
        'grid',
        'axes',
        'areas',
        'crosshair',
        'lines',
        'points',
        'slices',
        'mesh',
        //@ts-ignore
        CustomLayer,
      ]}
    />
  );
}

export default StackedAreaChart;
type CustomLayerProps = {
  points: PointCustom[];
  xScale: any;
  yScale: any;
};
type PointCustom = Point & {
  data: { change: number };
};
const CustomLayer = (props: CustomLayerProps) => {
  const { points, xScale, yScale } = props;
  return (
    <>
      {points.map((point) => (
        <g key={point.id} transform={`translate(${point.x}, ${point.y})`}>
          <rect x="-50" y="-45" width="100" height="40" fill="white" opacity="0.7" />
          {/* <text dy="-15" textAnchor="middle" fontSize="12" fill="black">
            {point.data.xFormatted}
          </text> */}
          <text dy="-15" textAnchor="middle" fontSize="12" fill="black">
            Total: {point.data.yFormatted}
          </text>
          <text dy="-30" textAnchor="middle" fontSize="12" fill="black">
            {point.data.change}
          </text>
        </g>
      ))}
    </>
  );
};
