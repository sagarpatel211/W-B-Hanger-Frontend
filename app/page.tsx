'use client';

import { useEffect, useState } from 'react';
import { FormData, GraphData, calculateGraphData, lookupAircraft, lookupModel } from '@/lib/math';
import { Graph } from '@/components/graph';
import { OutputTables } from '@/components/outputtables';
import { InputFields } from '@/components/inputfields';
import { aircrafts } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { savePage } from '@/lib/utils';

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
    startups: '1',
    fuelConsumption: '0',
    fuelLoaded: '0',
  });

  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    const model = lookupModel(lookupAircraft(formData.aircraftReg));
    const fuelRate = model?.fuelRate?.toString() ?? '0';
    const calculationData = { ...formData, fuelConsumption: fuelRate };
    const allValid = Object.values(calculationData).every((val, idx) => {
      if (idx === 0) {
        return (val as string).trim() !== '';
      }
      const num = parseFloat(val as string);
      return !isNaN(num) && num >= 0;
    });

    if (allValid) {
      setData(calculateGraphData(calculationData));
    } else {
      setData(null);
    }
  }, [formData]);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weight & Balance Tool</h1>
        <Button onClick={savePage} className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Screenshot
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <section className="flex-1 bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          <InputFields formData={formData} setFormData={setFormData} />
        </section>

        <section
          className={`flex-1 bg-white rounded-2xl shadow-2xl p-6 transition-opacity duration-300 ${
            data ? '' : 'opacity-30'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">C.G. Graph</h2>
          {data ? (
            <div style={{ height: 300 }}>
              <Graph data={data} />
            </div>
          ) : (
            <p className="text-sm text-gray-400">Graph will appear once data is valid</p>
          )}
        </section>

        {/* Output */}
        <section
          className={`flex-[1.5] bg-white rounded-2xl shadow-2xl p-6 transition-opacity duration-300 ${
            data ? '' : 'opacity-30'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Calculated Outputs</h2>
          {data ? (
            <OutputTables graphData={data} formData={formData} />
          ) : (
            <p className="text-sm text-gray-400">Tables will appear once data is valid</p>
          )}
        </section>
      </div>

      <footer className="mt-8 bg-white rounded-xl border text-sm p-6 shadow-sm text-center space-y-2">
        <p className="text-gray-600">
          🚧 This tool is a work-in-progress. Bugs may be present.{' '}
          <span className="font-semibold text-red-500">Always cross-check!</span>
        </p>
        <p className="text-red-500 font-medium">
          This tool does not replace proper flight planning procedures.
        </p>
        <p className="text-green-600 font-semibold">
          This tool is not affiliated with or endorsed by WWFC or any other training institution.
        </p>
        <p className="text-xs">
          Based on original work from{' '}
          <a
            href="https://docs.google.com/spreadsheets/u/0/d/1H5t4ZY9ZmNQ8l6OVIGmDrwYWhlRZmS6gmAuTLhzRoeU/htmlview"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-400"
          >
            this spreadsheet
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
