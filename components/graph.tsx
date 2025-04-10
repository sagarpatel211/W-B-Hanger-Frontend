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
  DotProps,
} from 'recharts';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas-pro';

export const SquareDot = (props: DotProps) => {
  const { cx, cy, stroke, strokeWidth } = props;
  return (
    <rect
      x={(cx ?? 0) - 4}
      y={(cy ?? 0) - 4}
      width={8}
      height={8}
      fill={stroke}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

type GraphProps = {
  data: any;
  handleDownloadGraph: () => void;
};

export function Graph({ data, handleDownloadGraph }: GraphProps) {
  return (
    <div className="p-6 border rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Line Graph</h2>
      <div id="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
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
              type="number"
              dataKey="y"
              label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }}
              domain={['auto', 'auto']}
            />
            <Tooltip />
            <Legend />
            <Area
              dataKey="y"
              data={data[0].normalEnvelope}
              type="linear"
              name="Normal Category"
              fill="lightblue"
              fillOpacity={0.4}
              stroke="blue"
            />
            <Area
              dataKey="y"
              data={data[0].utilityEnvelope}
              type="linear"
              name="Utility Category"
              fill="lightgreen"
              fillOpacity={0.4}
              stroke="green"
            />
            {data[0].points.map((pt: any) => (
              <Line
                key={pt.name}
                data={[pt]}
                dataKey="y"
                name={pt.name}
                type="linear"
                stroke={pt.name === 'TOW' ? '#FF0000' : '#FFA500'}
                strokeDasharray="5 5"
                dot={{ r: 6 }}
                isAnimationActive={false}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <Button onClick={handleDownloadGraph} className="mt-4">
        Download Graph
      </Button>
    </div>
  );
}

export const downloadGraph = async () => {
  const originalScrollX = window.scrollX;
  const originalScrollY = window.scrollY;

  try {
    window.scrollTo(0, 0);

    const canvas = await html2canvas(document.documentElement, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      backgroundColor: '#ffffff',
      useCORS: true,
      onclone: (clonedDoc) => {
        const elements = clonedDoc.querySelectorAll('input, select, textarea');
        elements.forEach((elem) => {
          const el = elem as HTMLElement;
          const computedStyle = window.getComputedStyle(el);
          const currentHeight = parseFloat(computedStyle.height);
          const extraPixels = 20;
          const newHeight = currentHeight + extraPixels;

          el.style.height = `${newHeight}px`;
          el.style.minHeight = `${newHeight}px`;
          el.style.lineHeight = `${newHeight}px`;
          el.style.boxSizing = 'border-box';
          el.style.paddingTop = computedStyle.paddingTop;
          el.style.paddingBottom = computedStyle.paddingBottom;
          el.style.transform = 'none';
        });
      },
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'full-page-screenshot.png';
    link.click();
    window.scrollTo(originalScrollX, originalScrollY);
  } catch (error) {
    console.error('Error capturing full-page screenshot:', error);
  }
};
