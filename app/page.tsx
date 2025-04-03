"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
} from "recharts";

const SquareDot = (props: any) => {
  const { cx, cy, stroke, strokeWidth } = props;
  return (
    <rect
      x={cx - 4}
      y={cy - 4}
      width={8}
      height={8}
      fill={stroke}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

type FormData = {
  aircraftReg: string;
  frontLeft: string;
  frontRight: string;
  rearLeft: string;
  rearRight: string;
  bag1: string;
  bag2: string;
  flightDuration: string;
  startups: string;
  fuelConsumption: string;
  fuelLoaded: string;
};

type GraphData = {
  cg: number;
  landingWt: number;
  currentAc: number;
  normalMin: number;
  normalMax: number;
  utilityMin: number;
  utilityMax: number;
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    aircraftReg: "",
    frontLeft: "",
    frontRight: "",
    rearLeft: "",
    rearRight: "",
    bag1: "",
    bag2: "",
    flightDuration: "",
    startups: "",
    fuelConsumption: "",
    fuelLoaded: "",
  });
  const [data, setData] = useState<GraphData[]>([]);
  const [showGraph, setShowGraph] = useState<boolean>(false);

  // ============== EQUATIONS SECTION ==============
  const calculateGraphData = (formData: FormData): GraphData => ({
    cg: Number(formData.frontLeft) || 15,
    landingWt: Number(formData.flightDuration)
      ? 1000 + Number(formData.flightDuration) * 10
      : 1000,
    currentAc: Number(formData.flightDuration)
      ? 1100 - Number(formData.flightDuration) * 5
      : 1100,
    normalMin: 1050,
    normalMax: 1150,
    utilityMin: 950,
    utilityMax: 1000,
  });
  // ================================================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData([calculateGraphData(formData)]);
    setShowGraph(true);
    setFormData({
      aircraftReg: "",
      frontLeft: "",
      frontRight: "",
      rearLeft: "",
      rearRight: "",
      bag1: "",
      bag2: "",
      flightDuration: "",
      startups: "",
      fuelConsumption: "",
      fuelLoaded: "",
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-6 border rounded-2xl shadow-md">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Step 1</h3>
          <label htmlFor="aircraftReg" className="text-sm">3-letter aircraft reg</label>
          <Input
            id="aircraftReg"
            placeholder="e.g. ABC"
            maxLength={3}
            className="border border-gray-800 rounded p-2"
            value={formData.aircraftReg}
            onChange={(e) => setFormData({ ...formData, aircraftReg: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Step 2</h3>
          <label className="text-sm">Enter loading parameters</label>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Front Left" className="border border-gray-800 rounded p-2" value={formData.frontLeft} onChange={(e) => setFormData({ ...formData, frontLeft: e.target.value })} />
            <Input type="number" placeholder="Front Right" className="border border-gray-800 rounded p-2" value={formData.frontRight} onChange={(e) => setFormData({ ...formData, frontRight: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Rear Left" className="border border-gray-800 rounded p-2" value={formData.rearLeft} onChange={(e) => setFormData({ ...formData, rearLeft: e.target.value })} />
            <Input type="number" placeholder="Rear Right" className="border border-gray-800 rounded p-2" value={formData.rearRight} onChange={(e) => setFormData({ ...formData, rearRight: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Bag 1" className="border border-gray-800 rounded p-2" value={formData.bag1} onChange={(e) => setFormData({ ...formData, bag1: e.target.value })} />
            <Input type="number" placeholder="Bag 2" className="border border-gray-800 rounded p-2" value={formData.bag2} onChange={(e) => setFormData({ ...formData, bag2: e.target.value })} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Step 3</h3>
          <label className="text-sm">Flight parameters</label>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Flight duration (hrs)" className="border border-gray-800 rounded p-2" value={formData.flightDuration} onChange={(e) => setFormData({ ...formData, flightDuration: e.target.value })} />
            <Input type="number" placeholder="Number of startups" className="border border-gray-800 rounded p-2" value={formData.startups} onChange={(e) => setFormData({ ...formData, startups: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Fuel consumption (gph)" className="border border-gray-800 rounded p-2" value={formData.fuelConsumption} onChange={(e) => setFormData({ ...formData, fuelConsumption: e.target.value })} />
            <Input type="number" placeholder="Fuel loaded (optional)" className="border border-gray-800 rounded p-2" value={formData.fuelLoaded} onChange={(e) => setFormData({ ...formData, fuelLoaded: e.target.value })} />
          </div>
        </div>
        <Button type="submit" className="mt-4">Submit</Button>
      </form>
      {showGraph && (
        <div className="p-6 border rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Line Graph</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cg" label={{ value: "C.G. (inches aft of datum)", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Weight (lbs)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="normalMax" stroke="none" fill="lightblue" fillOpacity={0.3} stackId="normal" />
              <Area type="monotone" dataKey="normalMin" stroke="none" fill="white" fillOpacity={1} stackId="normal" />
              <Area type="monotone" dataKey="utilityMax" stroke="none" fill="lightgreen" fillOpacity={0.3} stackId="utility" />
              <Area type="monotone" dataKey="utilityMin" stroke="none" fill="white" fillOpacity={1} stackId="utility" />
              <Line type="monotone" dataKey="landingWt" stroke="#FFA500" strokeDasharray="5 5" strokeLinecap="square" dot={<SquareDot />} name="Landing Wt" />
              <Line type="monotone" dataKey="currentAc" stroke="#FF0000" strokeDasharray="5 5" strokeLinecap="square" dot={<SquareDot />} name="Current a/c" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
