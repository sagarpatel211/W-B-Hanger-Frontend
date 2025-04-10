'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { aircrafts } from '@/lib/constants';

export function AircraftRegDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const selected = aircrafts.find((a) => a.registration === value) || null;
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">{selected ? selected.prefix : 'Prefix'}</span>
      <select
        className="border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
      >
        <option value="">Select Reg</option>
        {aircrafts.map((a, idx) => (
          <option key={idx} value={a.registration}>
            {a.registration}
          </option>
        ))}
      </select>
      <span className="font-semibold">{selected ? selected.model : 'Model'}</span>
    </div>
  );
}

export type FormData = {
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

type InputFieldsProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function InputFields({ formData, setFormData, handleSubmit }: InputFieldsProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-6 border rounded-2xl shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-lg font-bold">Step 1</h3>
          <span className="text-sm">3-letter aircraft reg</span>
        </div>
        <AircraftRegDropdown
          value={formData.aircraftReg}
          onChange={(val) => setFormData({ ...formData, aircraftReg: val })}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-lg font-bold">Step 2</h3>
          <span className="text-sm">Enter loading parameters</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Front Left</label>
            <Input
              type="number"
              placeholder="Front Left"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.frontLeft}
              onChange={(e) => setFormData({ ...formData, frontLeft: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Front Right</label>
            <Input
              type="number"
              placeholder="Front Right"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.frontRight}
              onChange={(e) => setFormData({ ...formData, frontRight: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Rear Left</label>
            <Input
              type="number"
              placeholder="Rear Left"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.rearLeft}
              onChange={(e) => setFormData({ ...formData, rearLeft: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Rear Right</label>
            <Input
              type="number"
              placeholder="Rear Right"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.rearRight}
              onChange={(e) => setFormData({ ...formData, rearRight: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Bag 1</label>
            <Input
              type="number"
              placeholder="Bag 1"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.bag1}
              onChange={(e) => setFormData({ ...formData, bag1: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Bag 2</label>
            <Input
              type="number"
              placeholder="Bag 2"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.bag2}
              onChange={(e) => setFormData({ ...formData, bag2: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-lg font-bold">Step 3</h3>
          <span className="text-sm">Flight parameters</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Flight duration (hrs)</label>
            <Input
              type="number"
              placeholder="Flight duration (hrs)"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.flightDuration}
              onChange={(e) => setFormData({ ...formData, flightDuration: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Number of startups</label>
            <Input
              type="number"
              placeholder="Number of startups"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.startups}
              onChange={(e) => setFormData({ ...formData, startups: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Fuel consumption (gph)</label>
            <Input
              type="number"
              placeholder="Fuel consumption (gph)"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.fuelConsumption}
              onChange={(e) => setFormData({ ...formData, fuelConsumption: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Fuel loaded (optional)</label>
            <Input
              type="number"
              placeholder="Fuel loaded (optional)"
              className="w-full border border-gray-800 rounded p-2"
              value={formData.fuelLoaded}
              onChange={(e) => setFormData({ ...formData, fuelLoaded: e.target.value })}
            />
          </div>
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
}
