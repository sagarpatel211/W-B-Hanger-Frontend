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
  const model = graphData.extraInfo.model;
  const maxDepFuel = graphData.extraInfo.maxDepFuel;

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
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.fuelLoaded)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.fuelWeight)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Start/Taxi</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.startTaxiFuel)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.startTaxiWeight)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Trip Fuel</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.tripFuel)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.tripWeight)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Fuel on Landing</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.landingFuel)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.landingFuelWeight)}</td>
            </tr>
            <tr className="font-bold">
              <td className="border px-2 py-1">Min Dep. Fuel</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.minDepFuel)} Gal</td>
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
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.endurance)} hrs</td>
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
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.takeoffFuelWeight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.fuelArm)}</td>
              <td className="border px-2 py-1">
                {formatNum(graphData.extraInfo.takeoffFuelWeight * graphData.extraInfo.fuelArm)}
              </td>
            </tr>
            <tr className="font-bold bg-gray-100">
              <td className="border px-2 py-1">Takeoff Total</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.takeoffWeight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.takeoffArm)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.takeoffMoment)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Fuel for Flight</td>
              <td className="border px-2 py-1">{formatNum(-graphData.extraInfo.tripWeight)}</td>
              <td className="border px-2 py-1">
                {formatNum(graphData.extraInfo.fuelArm)}
              </td>
              <td className="border px-2 py-1">
                {formatNum(-graphData.extraInfo.tripWeight * graphData.extraInfo.fuelArm)}
              </td>
            </tr>
            <tr className="font-bold bg-red-100">
              <td className="border px-2 py-1">Landing Totals</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.landingWeight)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.landingArm)}</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.landingMoment)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="w-full border border-black border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1"></th>
              <th className="border px-2 py-1">Speed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 font-medium">Va</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.va)} KIAS</td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-medium">Vref</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.vref)} KIAS</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="w-full border border-black border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1"></th>
              <th className="border px-2 py-1">Utility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 font-medium">Utility Max. Fuel</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.utilityMaxFuel)} Gal</td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-medium">Flt. Time to Utility</td>
              <td className="border px-2 py-1">{formatNum(graphData.extraInfo.timeToUtility)} hrs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="md:col-span-2 mt-4 flex gap-4 justify-start items-center text-sm font-semibold">
        {graphData.extraInfo.overMTOW && <span className="text-red-600">OVER MTOW</span>}
        {graphData.extraInfo.overMLW && <span className="text-red-600">OVER MLW</span>}
        {graphData.extraInfo.belowMinDepFuel && <span className="text-red-600">BELOW MIN DEPARTURE FUEL</span>}
        {graphData.extraInfo.maxFuelInsufficient && <span className="text-red-600">MAX FUEL INSUFFICIENT</span>}
        {graphData.extraInfo.bag1Over && <span className="text-red-600">BAG 1 OVERWEIGHT</span>}
        {graphData.extraInfo.bag2Over && <span className="text-red-600">BAG 2 OVERWEIGHT</span>}
        {graphData.extraInfo.bagsOver && <span className="text-red-600">BAGS OVERWEIGHT</span>}
        {graphData.extraInfo.normalCat && <span className="text-blue-600">NORMAL CATEGORY</span>}
        {graphData.extraInfo.utilityCat && <span className="text-green-600">UTILITY CATEGORY</span>}
        {graphData.extraInfo.noSpin && <span className="text-red-600">SPINS PROHIBITED</span>}
      </div>
    </div>
  );
}
