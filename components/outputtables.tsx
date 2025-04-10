'use client';

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

type OutputTablesProps = {
  graphData: {
    extraInfo: any;
  };
  formData: FormData;
};

function formatNum(value: number | undefined | null, digits = 2) {
  return value != null
    ? value.toLocaleString('en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      })
    : '—';
}

export function OutputTables({ graphData, formData }: OutputTablesProps) {
  const {
    model,
    takeoffWeight,
    landingWeight,
    va,
    vref,
    endurance,
    minDepFuel,
    maxDepFuel,
    utilityMaxFuel,
    timeToUtility,
    normalCat,
    noSpin,
    takeoffArm,
    landingArm,
    takeoffMoment,
  } = graphData.extraInfo;

  // Compute additional weight components from formData
  const frontSeatWeight = Number(formData.frontLeft) + Number(formData.frontRight);
  const rearSeatWeight = Number(formData.rearLeft) + Number(formData.rearRight);
  const baggage1 = Number(formData.bag1);
  const baggage2 = Number(formData.bag2);

  const density = 6;
  const fuelLoaded = Number(formData.fuelLoaded);
  const startups = Number(formData.startups);
  const flightTime = Number(formData.flightDuration);
  const startTaxi = startups * model.groundFuelRate;
  const tripFuel = flightTime * model.fuelRate;
  const fuelOnLanding = fuelLoaded - startTaxi - tripFuel;

  // Weights
  const fuelWeight = fuelLoaded * density;
  const startTaxiWeight = startTaxi * density;
  const tripFuelWeight = tripFuel * density;
  const landingFuelWeight = fuelOnLanding * density;

  const fuelForFlight = -tripFuelWeight;
  const landingMoment = landingArm * landingWeight;
  const overMLW = landingWeight > model.mlw;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-sm">
      <div>
        <table className="w-full border border-black border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Fuel</th>
              <th className="border px-2 py-1">Gal</th>
              <th className="border px-2 py-1">Lbs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Fuel Loaded</td>
              <td className="border px-2 py-1">{formatNum(fuelLoaded)}</td>
              <td className="border px-2 py-1">{formatNum(fuelWeight)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Start/Taxi</td>
              <td className="border px-2 py-1">{formatNum(startTaxi)}</td>
              <td className="border px-2 py-1">{formatNum(startTaxiWeight)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Trip Fuel</td>
              <td className="border px-2 py-1">{formatNum(tripFuel)}</td>
              <td className="border px-2 py-1">{formatNum(tripFuelWeight)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Fuel on Landing</td>
              <td className="border px-2 py-1">{formatNum(fuelOnLanding)}</td>
              <td className="border px-2 py-1">{formatNum(landingFuelWeight)}</td>
            </tr>
            <tr className="font-bold">
              <td className="border px-2 py-1">Min Dep. Fuel</td>
              <td className="border px-2 py-1">{formatNum(minDepFuel)} Gal</td>
              <td className="border px-2 py-1"></td>
            </tr>
            <tr className="font-bold">
              <td className="border px-2 py-1">Max Dep. Fuel</td>
              <td className="border px-2 py-1">
                {maxDepFuel != null ? `${formatNum(maxDepFuel)} Gal` : 'N/A'}{' '}
                {maxDepFuel != null && maxDepFuel >= model.fuelCap ? '(Full)' : ''}
              </td>
              <td className="border px-2 py-1"></td>
            </tr>
            <tr className="font-bold">
              <td className="border px-2 py-1">Endurance</td>
              <td className="border px-2 py-1">{formatNum(endurance)} hrs</td>
              <td className="border px-2 py-1"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="w-full border border-black border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">W&B</th>
              <th className="border px-2 py-1">Weight</th>
              <th className="border px-2 py-1">Arm</th>
              <th className="border px-2 py-1">Moment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">BEW</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.aircraftWeight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.aircraftArm)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.aircraftMoment)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Front Seats</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.frontSeatWeight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.frontSeatArm)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.frontSeatMoment)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Rear Seats</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.rearSeatWeight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.rearSeatArm)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.rearSeatMoment)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Baggage 1</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.bag1Weight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.bag1Arm)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.bag1Moment)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Baggage 2</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.bag2Weight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.bag2Arm)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.bag2Moment)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Fuel</td>
              <td className="border px-2 py-1">{formatNum(fuelWeight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.fuelArm)}</td>
              <td className="border px-2 py-1">
                {formatNum(fuelWeight * graphData.extraInfo.fuelArm)}
              </td>
            </tr>
            <tr className="font-bold bg-gray-100">
              <td className="border px-2 py-1">Takeoff Total</td>
              <td className="border px-2 py-1">{formatNum(takeoffWeight)}</td>
              <td className="border px-2 py-1">{formatNum(takeoffArm)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.takeoffMoment)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Fuel for Flight</td>
              <td className="border px-2 py-1">{formatNum(fuelForFlight)}</td>
              <td className="border px-2 py-1">
                {formatNum(graphData.extraInfo.fuelForFlightArm)}
              </td>
              <td className="border px-2 py-1">
                {formatNum(fuelForFlight * graphData.extraInfo.fuelForFlightArm)}
              </td>
            </tr>
            <tr className="font-bold bg-red-100">
              <td className="border px-2 py-1">Landing Totals</td>
              <td className="border px-2 py-1">{formatNum(landingWeight)}</td>
              <td className="border px-2 py-1">{formatNum(landingArm)}</td>
              <td className="border px-2 py-1">{formatNum(landingMoment)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="w-full border border-black border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Speed</th>
              <th className="border px-2 py-1">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 font-medium">Va</td>
              <td className="border px-2 py-1">{formatNum(va)} KIAS</td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-medium">Vref</td>
              <td className="border px-2 py-1">{formatNum(vref)} KIAS</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="w-full border border-black border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Utility Info</th>
              <th className="border px-2 py-1">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 font-medium">Utility Max. Fuel</td>
              <td className="border px-2 py-1">{formatNum(utilityMaxFuel)} Gal</td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-medium">Flt. Time to Utility</td>
              <td className="border px-2 py-1">{formatNum(timeToUtility)} hrs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="md:col-span-2 mt-4 flex gap-4 justify-start items-center text-sm font-semibold">
        {overMLW && <span className="text-red-600">OVER MLW</span>}
        {normalCat && <span className="text-blue-600">NORMAL CATEGORY</span>}
        {noSpin && <span className="text-red-600">SPINS PROHIBITED</span>}
      </div>
    </div>
  );
}
