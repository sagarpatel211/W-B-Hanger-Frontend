'use client';

import { useState } from 'react';
import { FormData, GraphData, calculateGraphData } from '@/lib/math';
import { Graph } from '@/components/graph';
import { OutputTables } from '@/components/outputtables';
import { downloadGraph } from '@/components/graph';
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

  const [data, setData] = useState<GraphData[]>([]);
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setData([calculateGraphData(formData)]);
      setShowGraph(true);
      setLoading(false);
    }, 500);
  };

  const handleDownloadGraph = () => {
    downloadGraph();
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div>
        <InputFields formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
      </div>
      <div className="flex flex-col gap-8">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {showGraph && !loading && (
          <>
            <Graph data={data} handleDownloadGraph={handleDownloadGraph} />
            <OutputTables graphData={data[0]} formData={formData} />
          </>
        )}
      </div>
    </div>
  );
}
