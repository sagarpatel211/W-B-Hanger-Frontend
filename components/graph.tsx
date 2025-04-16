'use client';

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Scatter,
  TooltipProps,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { GraphData } from '@/lib/math';
import { savePage } from '@/lib/utils';

const NORMAL_COLOUR = 'blue';
const NORMAL_FILL_COLOUR = 'lightblue';
const UTILITY_COLOUR = 'green';
const UTILITY_FILL_COLOUR = 'lightgreen';
const TOW_COLOUR = '#FF0000';
const ELW_COLOUR = '#FFA500';

function roundTwoDecimals(num: number) {
  return Math.round(num * 100) / 100;
}

type GraphProps = {
  data: GraphData;
};

export function Graph({ data }: GraphProps) {
  const tow = data.points?.find((point) => point.name == 'TOW');
  const elw = data.points?.find((point) => point.name == 'ELW');

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, number>) => {
    if (active && payload && label) {
      return (
        <div className="border shadow-md bg-white margin-5 padding-10">
          <p>C.G: {roundTwoDecimals(label)}</p>
          <p style={{ color: NORMAL_COLOUR }}>Normal: {payload[0].value}</p>
          <p style={{ color: UTILITY_COLOUR }}>Utility: {payload[1].value}</p>
          {label == tow?.x && <p style={{ color: TOW_COLOUR }}>TOW: {tow?.y}</p>}
          {label == elw?.x && <p style={{ color: ELW_COLOUR }}>ELW: {elw?.y}</p>}
        </div>
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Line Graph</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            name="GC"
            type="number"
            dataKey="x"
            label={{
              value: 'C.G. (inches aft of datum)',
              position: 'insideBottom',
              offset: -5,
            }}
            domain={['auto', 'auto']}
          />
          <YAxis
            name="GC"
            type="number"
            dataKey="y"
            label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
          />
          <Area
            dataKey="y"
            data={data.normalEnvelope}
            type="linear"
            name="Normal Category"
            fill={NORMAL_FILL_COLOUR}
            fillOpacity={0.4}
            stroke={NORMAL_COLOUR}
          />
          <Area
            dataKey="y"
            data={data.utilityEnvelope}
            type="linear"
            name="Utility Category"
            fill={UTILITY_FILL_COLOUR}
            fillOpacity={0.4}
            stroke={UTILITY_COLOUR}
          />
          <Line
            dataKey="y"
            type="monotone"
            legendType="none"
            tooltipType="none"
            stroke="#000000"
            data={data.points}
          />
          {tow && <Scatter name="TOW" dataKey="y" data={[tow]} fill={TOW_COLOUR} />}
          {elw && <Scatter name="ELW" dataKey="elw" data={[elw]} fill={ELW_COLOUR} />}
        </ComposedChart>
      </ResponsiveContainer>
      <Button onClick={savePage}>Save Page</Button>
    </div>
  );
}
