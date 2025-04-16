'use client';

import { Input } from '@/components/ui/input';
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
};

export function InputFields({ formData, setFormData }: InputFieldsProps) {
  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <form className="flex flex-col gap-2 p-6">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-lg font-bold">Step 1</h3>
          <span className="text-sm">3-letter aircraft reg</span>
        </div>
        <AircraftRegDropdown
          value={formData.aircraftReg}
          onChange={(val) => setFormData({ ...formData, aircraftReg: val })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">Step 2</h3>
        <span className="text-sm">Enter loading parameters</span>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['Front Left', 'frontLeft'],
            ['Front Right', 'frontRight'],
            ['Rear Left', 'rearLeft'],
            ['Rear Right', 'rearRight'],
            ['Bag 1', 'bag1'],
            ['Bag 2', 'bag2'],
          ].map(([label, key]) => (
            <div className="flex flex-col gap-1" key={key}>
              <label className="text-sm font-medium">{label}</label>
              <Input
                type="number"
                min="0"
                step="any"
                placeholder={label}
                className="w-full border border-gray-800 rounded p-2"
                value={formData[key as keyof FormData]}
                onChange={handleChange(key as keyof FormData)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">Step 3</h3>
        <span className="text-sm">Flight parameters</span>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['Flight duration (hrs)', 'flightDuration'],
            ['Number of startups', 'startups'],
            ['Fuel consumption (gph)', 'fuelConsumption'],
            ['Fuel loaded (optional)', 'fuelLoaded'],
          ].map(([label, key]) => (
            <div className="flex flex-col gap-1" key={key}>
              <label className="text-sm font-medium">{label}</label>
              <Input
                type="number"
                min="0"
                step="any"
                placeholder={label}
                className="w-full border border-gray-800 rounded p-2"
                value={formData[key as keyof FormData]}
                onChange={handleChange(key as keyof FormData)}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
