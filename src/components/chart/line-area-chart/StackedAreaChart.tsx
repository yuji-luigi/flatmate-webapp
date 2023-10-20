import { Box, Card } from '@mantine/core';
import { Point, ResponsiveLine } from '@nivo/line';
import { useCustomMQuery } from '../../../../hooks/useCustomMQuery';
import { LabelLayerCustom } from './LabelLayerCustom';
import { LabelLayerCustomMini } from './LabelLayerCustomMini';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import { intlCurrencyFormat, intlDateFormat } from '../../../utils/helpers/date-formatters';

function StackedAreaChart() {
  const { isMobile } = useCustomMQuery();
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');
  const mData = maintenances.map((m) => {
    return {
      x: intlDateFormat(m.createdAt),
      y: m.cost,
      change: m.cost,
    };
  });

  const formatedMData = 0;

  const mx = isMobile ? 30 : 50;
  const data = [
    // {
    //   id: 'A',
    //   // data: [
    //   //   { x: 1, y: 300000, change: 0 },
    //   //   { x: 2, y: 300000 - 500, change: -500 },
    //   //   { x: 3, y: 300000 - 500, change: 0 },
    //   //   { x: 4, y: 300000 - 1000, change: -500 },
    //   //   { x: 5, y: 300000 + 500, change: 1500 },
    //   //   { x: 6, y: 300000 + 250, change: -250 },
    //   // ],
    //   data: [
    //     { x: 'Feb 2', y: 900, change: 0 },
    //     { x: 'Feb 15', y: 500, change: -400 },
    //     { x: 'Feb 23', y: 500, change: 0 },
    //     { x: 'Feb 28', y: 1000, change: 500 },
    //     { x: 'Mar 5', y: 500, change: -500 },
    //     { x: 'Mar 18', y: 250, change: -250 },
    //   ],
    // },
    {
      id: 'B',
      // data: [
      //   { x: 1, y: 300000, change: 0 },
      //   { x: 2, y: 300000 - 500, change: -500 },
      //   { x: 3, y: 300000 - 500, change: 0 },
      //   { x: 4, y: 300000 - 1000, change: -500 },
      //   { x: 5, y: 300000 + 500, change: 1500 },
      //   { x: 6, y: 300000 + 250, change: -250 },
      // ],
      data: mData,
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
    //@ts-ignore
    <Box style={{ height: 400, width: '100%', overflow: 'visible' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 70, right: mx, bottom: 50, left: mx }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        curve="monotoneX"
        tooltip={({ point }) => {
          const _data = point.data as typeof point.data & { change: number };

          return (
            <div
              style={{
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
        colors={{ scheme: 'nivo' }}
        enableArea
        areaBaselineValue={0}
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
      >
        {null}
      </ResponsiveLine>
    </Box>
  );
}

export default StackedAreaChart;
type CustomLayerProps = {
  points: PointCustom[];
  xScale: any;
  yScale: any;
};
type PointCustom = Point & {
  data: { change: number; y: number; x: any };
};
const CustomLayer = (props: CustomLayerProps) => {
  const { points, xScale, yScale } = props;
  const { isMobile } = useCustomMQuery();
  const LabelComponent = isMobile ? LabelLayerCustomMini : LabelLayerCustom;

  return (
    <>
      {points.map((point) => (
        <LabelComponent key={point.id} point={point} />
      ))}
    </>
  );
};
