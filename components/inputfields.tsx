'use client';

import { Input } from '@/components/ui/input';
import { aircrafts } from '@/lib/constants';
import { lookupAircraft, lookupModel } from '@/lib/math';

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

  const model = lookupModel(lookupAircraft(formData.aircraftReg));
  const fuelRate = model?.fuelRate?.toString() ?? '0';

  const units: { [key in keyof FormData]?: string } = {
    frontLeft: 'lbs',
    frontRight: 'lbs',
    rearLeft: 'lbs',
    rearRight: 'lbs',
    bag1: 'lbs',
    bag2: 'lbs',
    flightDuration: 'hrs',
    startups: '#',
    fuelConsumption: 'gph',
    fuelLoaded: 'gal',
  };

  return (
    <form className="flex flex-col gap-2 p-6">
      {/* Step 1 */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-lg font-bold">Step 1</h3>
          <span className="text-sm">3-letter aircraft reg</span>
        </div>
        <AircraftRegDropdown
          value={formData.aircraftReg}
          onChange={(val) => {
            const aircraft = lookupAircraft(val);
            const m = lookupModel(aircraft);
            const updatedFuelRate = m?.fuelRate?.toString() ?? '0';
            setFormData({ ...formData, aircraftReg: val, fuelConsumption: updatedFuelRate });
          }}
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
          ].map(([label, key]) => (
            <div className="flex flex-col gap-1" key={key}>
              <label className="text-sm font-medium">{label}</label>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="0"
                  step="any"
                  placeholder={label}
                  className="w-full border border-gray-800 rounded-l p-2"
                  value={formData[key as keyof FormData]}
                  onChange={handleChange(key as keyof FormData)}
                />
                <div className="bg-gray-100 border border-l-0 border-gray-800 rounded-r px-3 py-2 text-sm text-gray-700">
                  {units[key as keyof FormData]}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-2">
          {[
            ['Bag 1', 'bag1'],
            ['Bag 2', 'bag2'],
          ].map(([label, key]) => (
            <div className="flex flex-col gap-1" key={key}>
              <label className="text-sm font-medium">{label}</label>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="0"
                  step="any"
                  placeholder={label}
                  className="w-full border border-gray-800 rounded-l p-2"
                  value={formData[key as keyof FormData]}
                  onChange={handleChange(key as keyof FormData)}
                />
                <div className="bg-gray-100 border border-l-0 border-gray-800 rounded-r px-3 py-2 text-sm text-gray-700">
                  {units[key as keyof FormData]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">Step 3</h3>
        <span className="text-sm">Flight parameters</span>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['Flight duration', 'flightDuration'],
            ['Number of startups', 'startups'],
            ['Fuel loaded (optional)', 'fuelLoaded'],
          ].map(([label, key]) => (
            <div className="flex flex-col gap-1" key={key}>
              <label className="text-sm font-medium">{label}</label>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="0"
                  step="any"
                  placeholder={label}
                  className="w-full border border-gray-800 rounded-l p-2"
                  value={formData[key as keyof FormData]}
                  onChange={handleChange(key as keyof FormData)}
                />
                <div className="bg-gray-100 border border-l-0 border-gray-800 rounded-r px-3 py-2 text-sm text-gray-700">
                  {units[key as keyof FormData]}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
            <label className="text-sm font-medium">Fuel consumption</label>
            <div className="flex items-center">
              <Input
                type="number"
                disabled
                className="w-full border border-gray-400 bg-gray-100 text-gray-600 rounded-l p-2"
                value={fuelRate}
              />
              <div className="bg-gray-200 border border-l-0 border-gray-400 rounded-r px-3 py-2 text-sm text-gray-700">
                {units.fuelConsumption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
