'use client';

import { useEffect, useState } from 'react';
import { FormData, GraphData, calculateGraphData } from '@/lib/math';
import { Graph } from '@/components/graph';
import { OutputTables } from '@/components/outputtables';
import { InputFields } from '@/components/inputfields';
import { aircrafts } from '@/lib/constants';

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    aircraftReg: aircrafts[0]?.registration || '',
    frontLeft: '0',
    frontRight: '0',
    rearLeft: '0',
    rearRight: '0',
    bag1: '0',
    bag2: '0',
    flightDuration: '0',
    startups: '0',
    fuelConsumption: '0',
    fuelLoaded: '0',
  });

  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    const allValid = Object.entries(formData).every(([key, val]) => {
      if (key === 'aircraftReg') return val.trim() !== '';
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    });

    if (allValid) {
      const graphData = calculateGraphData(formData);
      setData(graphData);
    } else {
      setData(null);
    }
  }, [formData]);

  return (
    <div className="min-h-screen flex flex-wrap gap-4 p-4">
      <div className="flex-1 grow-3 min-w-md h-min p-6 border rounded-2xl shadow-md">
        <InputFields formData={formData} setFormData={setFormData} />
      </div>
      <div
        className="flex-1 grow-7 h-min min-w-md p-6 border rounded-2xl shadow-md transition-opacity duration-300"
        style={{ opacity: data ? 1 : 0.25 }}
      >
        {data ? (
          <Graph data={data} />
        ) : (
          <div className="text-gray-400 text-sm">Graph will appear once data is valid</div>
        )}
      </div>
      <div
        className="flex-1 grow-7 min-w-xl h-min p-6 border rounded-2xl shadow-md transition-opacity duration-300"
        style={{ opacity: data ? 1 : 0.25 }}
      >
        {data ? (
          <OutputTables graphData={data} formData={formData} />
        ) : (
          <div className="text-gray-400 text-sm">Tables will appear once data is valid</div>
        )}
      </div>
    </div>
  );
}
