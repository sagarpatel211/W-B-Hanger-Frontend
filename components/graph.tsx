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
  ReferenceLine,
} from 'recharts';
import { GraphData } from '@/lib/math';
import { useMemo } from 'react';

const NORMAL_COLOUR = 'blue';
const NORMAL_FILL_COLOUR = 'lightblue';
const UTILITY_COLOUR = 'green';
const UTILITY_FILL_COLOUR = 'lightgreen';
const TOW_COLOUR = '#00BB00';
const ELW_COLOUR = '#CC0000';

function roundTwoDecimals(num: number) {
  return Math.round(num * 100) / 100;
}

type GraphProps = {
  data: GraphData;
};

export function Graph({ data }: GraphProps) {
  const tow = useMemo(() => data.points?.find((p) => p.name === 'TOW'), [data.points]);
  const elw = useMemo(() => data.points?.find((p) => p.name === 'ELW'), [data.points]);

  const normalStartX = useMemo(() => data.normalEnvelope[0]?.x, [data.normalEnvelope]);
  const normalEndX = useMemo(
    () => data.normalEnvelope[data.normalEnvelope.length - 1]?.x,
    [data.normalEnvelope]
  );
  const utilStartX = useMemo(() => data.utilityEnvelope[0]?.x, [data.utilityEnvelope]);
  const utilEndX = useMemo(
    () => data.utilityEnvelope[data.utilityEnvelope.length - 1]?.x,
    [data.utilityEnvelope]
  );

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Line Graph</h2>
      <div className="w-full max-w-full">
        <div id="graph-container" className="overflow-x-auto lg:overflow-visible">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data.points} margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                type="number"
                name="C.G."
                domain={[(dataMin: number) => dataMin, (dataMax: number) => dataMax]}
                label={{
                  value: 'C.G. (inches aft of datum)',
                  position: 'insideBottom',
                  offset: -5,
                }}
              />
              <YAxis
                dataKey="y"
                type="number"
                name="Weight"
                label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }}
                domain={['auto', 'auto']}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />

              {normalStartX != null && (
                <ReferenceLine x={normalStartX} stroke={NORMAL_COLOUR} strokeDasharray="3 3" />
              )}
              {normalEndX != null && (
                <ReferenceLine x={normalEndX} stroke={NORMAL_COLOUR} strokeDasharray="3 3" />
              )}
              {utilStartX != null && (
                <ReferenceLine x={utilStartX} stroke={UTILITY_COLOUR} strokeDasharray="3 3" />
              )}
              {utilEndX != null && (
                <ReferenceLine x={utilEndX} stroke={UTILITY_COLOUR} strokeDasharray="3 3" />
              )}

              <Area
                dataKey="y"
                data={data.normalEnvelope}
                type="linear"
                name="Normal Category"
                stroke={NORMAL_COLOUR}
                fill={NORMAL_FILL_COLOUR}
                fillOpacity={0.4}
                isAnimationActive={false}
              />
              <Area
                dataKey="y"
                data={data.utilityEnvelope}
                type="linear"
                name="Utility Category"
                stroke={UTILITY_COLOUR}
                fill={UTILITY_FILL_COLOUR}
                fillOpacity={0.4}
                isAnimationActive={false}
              />
              <Line
                dataKey="y"
                data={data.points}
                type="monotone"
                stroke="#000"
                legendType="none"
                tooltipType="none"
                isAnimationActive={false}
              />
              {tow && (
                <Scatter
                  name="TOW"
                  data={[tow]}
                  dataKey="y"
                  fill={TOW_COLOUR}
                  isAnimationActive={false}
                />
              )}
              {elw && (
                <Scatter
                  name="ELW"
                  data={[elw]}
                  dataKey="y"
                  fill={ELW_COLOUR}
                  isAnimationActive={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
