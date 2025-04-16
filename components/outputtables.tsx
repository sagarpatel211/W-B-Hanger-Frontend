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

  const sectionStyle = 'w-full border border-gray-300 rounded-lg overflow-hidden';
  const headerStyle = 'bg-gray-800 text-white text-sm font-semibold';
  const cellStyle = 'border border-gray-300 px-3 py-1.5 text-sm';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div>
        <table className={sectionStyle}>
          <thead className={headerStyle}>
            <tr>
              <th className={cellStyle}>Fuel</th>
              <th className={cellStyle}>Gal</th>
              <th className={cellStyle}>Lbs</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Fuel Loaded', graphData.extraInfo.fuelLoaded, graphData.extraInfo.fuelWeight],
              [
                'Start/Taxi',
                graphData.extraInfo.startTaxiFuel,
                graphData.extraInfo.startTaxiWeight,
              ],
              ['Trip Fuel', graphData.extraInfo.tripFuel, graphData.extraInfo.tripWeight],
              [
                'Fuel on Landing',
                graphData.extraInfo.landingFuel,
                graphData.extraInfo.landingFuelWeight,
              ],
            ].map(([label, gal, lbs]) => (
              <tr key={label as string}>
                <td className={cellStyle}>{label}</td>
                <td className={cellStyle}>{formatNum(gal)}</td>
                <td className={cellStyle}>{formatNum(lbs)}</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100">
              <td className={cellStyle}>Min Dep. Fuel</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.minDepFuel)} Gal</td>
              <td className={cellStyle}></td>
            </tr>
            <tr className="font-bold bg-gray-100">
              <td className={cellStyle}>Max Dep. Fuel</td>
              <td className={cellStyle}>
                {maxDepFuel != null ? `${formatNum(maxDepFuel)} Gal` : 'N/A'}{' '}
                {maxDepFuel != null && maxDepFuel >= model.fuelCap ? '(Full)' : ''}
              </td>
              <td className={cellStyle}></td>
            </tr>
            <tr className="font-bold bg-gray-100">
              <td className={cellStyle}>Endurance</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.endurance)} hrs</td>
              <td className={cellStyle}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className={sectionStyle}>
          <thead className={headerStyle}>
            <tr>
              <th className={cellStyle}>W&B</th>
              <th className={cellStyle}>Weight</th>
              <th className={cellStyle}>Arm</th>
              <th className={cellStyle}>Moment</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'BEW',
                graphData.extraInfo.aircraftWeight,
                graphData.extraInfo.aircraftArm,
                graphData.extraInfo.aircraftMoment,
              ],
              [
                'Front Seats',
                graphData.extraInfo.frontSeatWeight,
                graphData.extraInfo.frontSeatArm,
                graphData.extraInfo.frontSeatMoment,
              ],
              [
                'Rear Seats',
                graphData.extraInfo.rearSeatWeight,
                graphData.extraInfo.rearSeatArm,
                graphData.extraInfo.rearSeatMoment,
              ],
              [
                'Baggage 1',
                graphData.extraInfo.bag1Weight,
                graphData.extraInfo.bag1Arm,
                graphData.extraInfo.bag1Moment,
              ],
              [
                'Baggage 2',
                graphData.extraInfo.bag2Weight,
                graphData.extraInfo.bag2Arm,
                graphData.extraInfo.bag2Moment,
              ],
              [
                'Fuel',
                graphData.extraInfo.takeoffFuelWeight,
                graphData.extraInfo.fuelArm,
                graphData.extraInfo.takeoffFuelWeight * graphData.extraInfo.fuelArm,
              ],
            ].map(([label, weight, arm, moment]) => (
              <tr key={label as string}>
                <td className={cellStyle}>{label}</td>
                <td className={cellStyle}>{formatNum(weight)}</td>
                <td className={cellStyle}>{formatNum(arm)}</td>
                <td className={cellStyle}>{formatNum(moment)}</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100">
              <td className={cellStyle}>Takeoff Total</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.takeoffWeight)}</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.takeoffArm)}</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.takeoffMoment)}</td>
            </tr>
            <tr>
              <td className={cellStyle}>Fuel for Flight</td>
              <td className={cellStyle}>{formatNum(-graphData.extraInfo.tripWeight)}</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.fuelArm)}</td>
              <td className={cellStyle}>
                {formatNum(-graphData.extraInfo.tripWeight * graphData.extraInfo.fuelArm)}
              </td>
            </tr>
            <tr className="font-bold bg-red-700 text-white">
              <td className={cellStyle}>Landing Totals</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.landingWeight)}</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.landingArm)}</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.landingMoment)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <table className={sectionStyle}>
          <thead className={headerStyle}>
            <tr>
              <th className={cellStyle}></th>
              <th className={cellStyle}>Speed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={cellStyle}>Va</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.va)} KIAS</td>
            </tr>
            <tr>
              <td className={cellStyle}>Vref</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.vref)} KIAS</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <table className={sectionStyle}>
          <thead className={headerStyle}>
            <tr>
              <th className={cellStyle}></th>
              <th className={cellStyle}>Utility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={cellStyle}>Utility Max. Fuel</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.utilityMaxFuel)} Gal</td>
            </tr>
            <tr>
              <td className={cellStyle}>Flt. Time to Utility</td>
              <td className={cellStyle}>{formatNum(graphData.extraInfo.timeToUtility)} hrs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="md:col-span-2 mt-4 flex flex-wrap gap-3 text-sm font-semibold">
        {graphData.extraInfo.overMTOW && <span className="text-red-700">🚨 OVER MTOW</span>}
        {graphData.extraInfo.overMLW && <span className="text-red-700">🚨 OVER MLW</span>}
        {graphData.extraInfo.belowMinDepFuel && (
          <span className="text-red-700">⛽ BELOW MIN DEPARTURE FUEL</span>
        )}
        {graphData.extraInfo.maxFuelInsufficient && (
          <span className="text-red-700">⚠️ MAX FUEL INSUFFICIENT</span>
        )}
        {graphData.extraInfo.bag1Over && <span className="text-red-700">🧳 BAG 1 OVERWEIGHT</span>}
        {graphData.extraInfo.bag2Over && <span className="text-red-700">🧳 BAG 2 OVERWEIGHT</span>}
        {graphData.extraInfo.bagsOver && <span className="text-red-700">🧳 BAGS OVERWEIGHT</span>}
        {graphData.extraInfo.normalCat && <span className="text-blue-700">✅ NORMAL CATEGORY</span>}
        {graphData.extraInfo.utilityCat && (
          <span className="text-green-700">✅ UTILITY CATEGORY</span>
        )}
        {graphData.extraInfo.noSpin && <span className="text-red-700">❌ SPINS PROHIBITED</span>}
      </div>
    </div>
  );
}
