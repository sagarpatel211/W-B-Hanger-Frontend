'use client';

import { useState } from 'react';
import { FormData, GraphData, calculateGraphData } from '@/lib/math';
import { Graph } from '@/components/graph';
import { OutputTables } from '@/components/outputtables';
import { InputFields } from '@/components/inputfields';

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    aircraftReg: '',
    frontLeft: '',
    frontRight: '',
    rearLeft: '',
    rearRight: '',
    bag1: '',
    bag2: '',
    flightDuration: '',
    startups: '',
    fuelConsumption: '',
    fuelLoaded: '',
  });

  const [data, setData] = useState<GraphData>(calculateGraphData(formData));

  const setAndUpdate = (data: FormData) => {
    setFormData(data)
    let graphData = calculateGraphData(formData)
    console.log(data)
    console.log(graphData)
    setData(calculateGraphData(formData))
  }

  return (
    <div className="min-h-screen flex flex-wrap gap-4 p-4">
      <div className="flex-1 grow-3 min-w-md h-min p-6 border rounded-2xl shadow-md">
        <InputFields formData={formData} setFormData={setAndUpdate} />
      </div>
      <div className="flex-1 grow-7 h-min min-w-md p-6 border rounded-2xl shadow-md">
        <Graph data={data} />
      </div>
      <div className="flex-1 grow-7 min-w-xl h-min p-6 border rounded-2xl shadow-md">
        <OutputTables graphData={data} formData={formData} />
      </div>
    </div>
  );
}
