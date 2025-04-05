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
import { toPng } from "html-to-image";

// Move these to separate file
function csvJSON(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
			if (currentline[j] == "N/A") {
				obj[headers[j]] = 0;
			} else {
				obj[headers[j]] = currentline[j];
			}
        }

        result.push(obj);

    }

    return result;
}

const aircraftCsv = `
registration,model,prefix,weight,_unused_arm,moment,frontSeatArm,rearSeatArm,bag1Arm,bag2Arm,fuelArm
YKF,C152,C-F,1150.69,30.47,35062.11,39,N/A,64,84,42
YAP,C152LR,C-G,1171.79,29.84,34966.11,39,N/A,64,84,39
GBN,C152LR,C-G,1178.69,30.1,35477.85,39,N/A,64,84,39
YHN,C152,C-G,1146.39,30.23,34652.07,39,N/A,64,84,42
TGH,C152,C-G,1142.29,29.67,33886.9,39,N/A,64,84,42
ZKT,C152,C-G,1151.64,29.93,34466.32,39,N/A,64,84,42
GJK,C152,C-F,1170.87,30.29,35463.23,39,N/A,64,84,42
GFR,A152,C-G,1183.37,31.12,36828.41,39,N/A,64,84,42
GFV,C172N,C-G,1447.05,39.04,56499.27,37,73,95,123,47.9
PEL,C172S,C-F,1668.8,39.75,66336.86,37,73,95,123,48
YEE,C172S,C-G,1708.6,41.17,70341.81,37,73,95,123,48
LXP,C172S,C-G,1704.49,41.48,70708.48,37,73,95,123,48
CBN,C172S,C-G,1676.2,39.65,66466.06,37,73,95,123,48
UBI,C172S,C-G,1674.7,40.16,67263.86,37,73,95,123,48
RFK,C172S,C-G,1686.6,39.77,67078.58,37,73,95,123,48
UZZ,C172S,C-G,1678.4,39.88,66935.47,37,73,95,123,48
PZV,C172S,C-G,1650,40.19,66309.92,37,73,95,123,48
OIQ,C172S,C-G,1652.45,40.09,66252.58,37,73,95,123,48
AKH,C172S,C-F,1665,38.67,64390.8,37,73,95,123,48
AAR,C172S,C-G,1668.2,40.07,66842.71,37,73,95,123,48
RAR,C172S,C-F,1704,40.97,69808.51,37,73,95,123,48
ATP,C172S,C-F,1718.27,41.41,71154.12,37,73,95,123,48
JMD,C172S,C-G,1736.84,41.6,72258.01,37,73,95,123,48
RZZ,C172S,C-F,1711.67,41.08,70316.68,37,73,95,123,48
AMO,DA40SR,C-F,1749.35,97.43,170433.53,90.6,128,143.7,170.1,103.5
IXL,DA40AP,C-G,1800.5,97.8,176097,90.6,128,143.7,170.1,103.5
JUM,DA40,C-F,1788,97.51,174347.88,90.6,128,143.7,170.1,103.5
FTU,P28A,C-F,1822.99,87.04,158669.68,80.5,118.1,142.8,N/A,95
IZI,P28A,C-G,1816.82,86.78,157655.58,80.5,118.1,142.8,N/A,95
GPY,P28A,C-G,1828.8,86.42,158047.7,80.5,118.1,142.8,N/A,95
OLP,PA44,C-G,2653,86.13,228515.1,80.5,118.1,142.8,N/A,95
MOP,PA44,C-G,2670.36,85.69,228822.74,80.5,118.1,142.8,N/A,95
KUL,PA44,C-F,2674.02,85.59,228857.19,80.5,118.1,142.8,N/A,95
`

const modelCsv = `
name,fuelRate,groundFuelRate,_fuel_cap,_fuel_cap2,mrw,mtow,mlw,utilityWeight,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,bag1Max,bag2Max,bagsMax,,,,,,,,,
C152,6,0.8,26,24.5,1674.8,1670,1670,1670,31,1100,31,1350,31,1350,31,1350,32.65,1670,32.65,1670,36.5,1670,31,1100,31,1350,31,1350,31,1350,32.65,1670,32.65,1670,36.5,1670,43,6.04E+01,1.59E-02,6.13E-06,120.00,40.00,120.00,31,1350,5.16E-03,2.40E+01,32.65,1670,5.16E-03,2.40E+01,36.5
C152LR,6,0.8,39,37.5,1674.8,1670,1670,1670,31,1100,31,1350,31,1350,31,1350,32.65,1670,32.65,1670,36.5,1670,31,1100,31,1350,31,1350,31,1350,32.65,1670,32.65,1670,36.5,1670,43,6.04E+01,1.59E-02,6.13E-06,120.00,40.00,120.00,31,1350,5.16E-03,2.40E+01,32.65,1670,5.16E-03,2.40E+01,36.5
A152,6,0.8,26,24.5,1674.8,1670,1670,1670,31,1100,31,1350,31,1350,31,1350,32.65,1670,32.65,1670,36.5,1670,31,1100,31,1350,31,1350,31,1350,32.65,1670,32.65,1670,36.5,1670,43,1.08E+02,0.00E+00,0.00E+00,120.00,40.00,120.00,31,1350,5.16E-03,2.40E+01,32.65,1670,5.16E-03,2.40E+01,36.5
C172N,10,1.4,54,50,2308,2300,2300,2000,35,1500,35,1950,35.5,2000,38.5,2300,40.5,2300,40.5,2300,47.3,2300,35,1500,35,1950,35.5,2000,38.5,2000,40.5,2000,40.5,0,47.3,0,50,2.61E+01,4.02E-02,-4.08E-06,120.00,50.00,120.00,35,1950,0.015714286,4.357142857,40.5,2300,0.015714286,4.357142857,40.5
C172S,10,1.4,56,53,2558,2550,2550,2200,35,1500,35,1950,37.5,2200,40.5,2500,40.5,2500,41,2550,47.3,2550,35,1500,35,1950,37.5,2200,40.5,2200,40.5,0,41,0,47.3,0,48,-3.54E+00,6.87E-02,-1.03E-05,120.00,50.00,120.00,35,1950,1.00E-02,15.5,41,2550,1.00E-02,15.5,40.5
DA40SR,10,1.5,41.2,40.2,2655,2646,2407,2161,94.5,1500,94.5,2161,97.6,2646,97.6,2646,97.6,2646,97.6,2646,102,2646,94.5,1500,94.5,2161,94.5,2161,94.5,2161,94.5,2161,94.5,2161,102,2161,55,,,,100.00,40.00,100.00,94.5,2161,0.006391753,80.68742268,97.6,2646,0,2161,94.5
DA40,10,1.5,51,50,2655,2646,2535,2161,94.5,1500,94.5,2161,97.6,2646,97.6,2646,97.6,2646,97.6,2646,100.4,2646,94.5,1500,94.5,2161,94.5,2161,94.5,2161,94.5,2161,94.5,2161,100.4,2161,55,,,,100.00,40.00,100.00,94.5,2161,0.006391753,80.68742268,97.6,2646,0,2161,94.5
DA40AP,10,1.5,51,50,2544,2535,2407,2161,94.5,1500,94.5,2161,96.9,2535,96.9,2535,96.9,2535,96.9,2535,100.4,2535,94.5,1500,94.5,2161,94.5,2161,94.5,2161,94.5,2161,94.5,2161,100.4,2161,55,,,,100.00,40.00,100.00,94.5,2161,0.006417112,80.63262032,96.9,2535,0,2161,94.5
P28A,12,1.4,77,72,2758,2750,2750,0,82,1500,82,2375,88.9,2750,88.9,2750,88.9,2750,88.9,2750,91.5,2750,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,4.96E+01,2.49E-02,0.00E+00,200.00,0.00,200.00,82,2375,0.0184,38.3,88.9,2750,0,0,0
PA44,22,2.7,110,108,3816,3800,3800,0,84,2000,84,2800,85,3400,85,3400,85,3400,89,3800,93,3800,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,5.55E+01,2.09E-02,0.00E+00,200.00,0.00,200.00,0,0,0,0,0,0,0,0,0
`

const aircrafts = csvJSON(aircraftCsv.trim());
for (var a of aircrafts) {
	a.weight = Number(a.weight);
	a.moment = Number(a.moment);
	a.frontSeatArm = Number(a.frontSeatArm);
	a.rearSeatArm = Number(a.rearSeatArm);
	a.bag1Arm = Number(a.bag1Arm);
	a.bag2Arm = Number(a.bag2Arm);
	a.fuelArm = Number(a.fuelArm);
}

const models = csvJSON(modelCsv.trim());
for (var m of models) {
	for (var i in m) {
		if (i != "name") {
			m[i] = Number(m[i]);
		} else {
			m.noSpin = m[i] == "P28A" || m[i] == "PA44" || m[i] == "DA40" || m[i] ==" DA40AP" || m[i] == "DA40SR";
		}
	}
}
// end move

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

function lookupAircraft(reg: string) {
	for (var a of aircrafts) {
		if (reg == a.registration) {
			return a;
		}
	}
	// exception
}

function lookupModel(aircraft) {
	for (var m of models) {
		if (aircraft.model == m.name) {
			return m;
		}
	}
	// exception
}

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
  const calculateGraphData = (formData: FormData): GraphData => {
    const aircraft = lookupAircraft(formData.aircraftReg);
    const model = lookupModel(aircraft);
	
	const fuelLoaded = Number(formData.fuelLoaded);
	const density = 6;
	const fuelWeight = fuelLoaded * density;
	const startTaxiFuel = Number(formData.startups) * model.groundFuelRate;
	const tripFuel = Number(formData.flightDuration) * model.fuelRate;
	const landingFuel = fuelLoaded - startTaxiFuel - tripFuel;
	const reserveTime = 1;
	const reserveFuel = reserveTime * model.fuelRate;
	const minDepFuel = reserveFuel + startTaxiFuel + tripFuel;
	const maxDepFuel = 1000; // TODO
	const endurance = (fuelLoaded - startTaxiFuel) / model.fuelRate;
	
	// const va = ;
	// const vref = ;
	
	const utilityMaxFuel = 1000; // TODO
	// const timeToUtility = ;
	
	// WB
	const weight = [
		Number(formData.frontLeft) + Number(formData.frontRight),
		Number(formData.rearLeft) + Number(formData.rearRight),
		Number(formData.bag1),
		Number(formData.bag2),
		(fuelLoaded - startTaxiFuel) * density,
	];
	const arm = [
		aircraft.frontSeatArm,
		aircraft.rearSeatArm,
		aircraft.bag1Arm,
		aircraft.bag2Arm,
		aircraft.fuelArm
	];
	let takeoffWeight = aircraft.weight;
	for (var w of weight) {
		takeoffWeight += w;
	}
	
	let takeoffMoment = aircraft.moment;
	for (let i = 0; i < weight.length; i++) {
		takeoffMoment += weight[i] * arm[i];
	}
	
	const takeoffArm = takeoffMoment / takeoffWeight;
	const landingWeight = takeoffWeight - tripFuel * density;
	const landingMoment = takeoffMoment - tripFuel * density * aircraft.fuelArm;
	const landingArm = landingMoment / landingWeight;
	
	// flags
	// const overMTOW
	// const overMLW
	const belowMinDepFuel = fuelLoaded < minDepFuel;
	const bag1Over = formData.bag1 > model.bag1Max;
	const bag2Over = formData.bag2 > model.bag2Max;
	const bagsOver = formData.bag1 + formData.bag2 > model.bagsMax;
	const maxFuelInsufficient = maxDepFuel < minDepFuel;
	
	//const normalCat = /*BJ20*/ > takeoffWeight && fuelLoaded > utilityMaxFuel && fuelLoaded <= maxDepFuel;
	const utilityCat = takeoffWeight <= model.utilityWeight && fuelLoaded <= utilityMaxFuel;
	const hasPassenger = weight[1] > 0 || weight[2] > 0 || weight[3] > 0; // todo name indices
	const noSpin = model.noSpin || utilityMaxFuel < reserveFuel || hasPassenger;
	
	return {
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
	}
  };
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

  const handleDownloadGraph = async () => {
    const chart = document.getElementById("chart-container");
    if (chart) {
      toPng(chart, { backgroundColor: "white" })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "graph.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        });
    }
  };  

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-6 border rounded-2xl shadow-md">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Step 1</h3>
          <label htmlFor="aircraftReg" className="text-sm">
            3-letter aircraft reg
          </label>
          <Input
            id="aircraftReg"
            placeholder="e.g. ABC"
            maxLength={3}
            className="border border-gray-800 rounded p-2"
            value={formData.aircraftReg}
            onChange={(e) =>
              setFormData({ ...formData, aircraftReg: e.target.value.toUpperCase() })
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Step 2</h3>
          <label className="text-sm">Enter loading parameters</label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Front Left"
              className="border border-gray-800 rounded p-2"
              value={formData.frontLeft}
              onChange={(e) => setFormData({ ...formData, frontLeft: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Front Right"
              className="border border-gray-800 rounded p-2"
              value={formData.frontRight}
              onChange={(e) => setFormData({ ...formData, frontRight: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Rear Left"
              className="border border-gray-800 rounded p-2"
              value={formData.rearLeft}
              onChange={(e) => setFormData({ ...formData, rearLeft: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Rear Right"
              className="border border-gray-800 rounded p-2"
              value={formData.rearRight}
              onChange={(e) => setFormData({ ...formData, rearRight: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Bag 1"
              className="border border-gray-800 rounded p-2"
              value={formData.bag1}
              onChange={(e) => setFormData({ ...formData, bag1: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Bag 2"
              className="border border-gray-800 rounded p-2"
              value={formData.bag2}
              onChange={(e) => setFormData({ ...formData, bag2: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Step 3</h3>
          <label className="text-sm">Flight parameters</label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Flight duration (hrs)"
              className="border border-gray-800 rounded p-2"
              value={formData.flightDuration}
              onChange={(e) => setFormData({ ...formData, flightDuration: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Number of startups"
              className="border border-gray-800 rounded p-2"
              value={formData.startups}
              onChange={(e) => setFormData({ ...formData, startups: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Fuel consumption (gph)"
              className="border border-gray-800 rounded p-2"
              value={formData.fuelConsumption}
              onChange={(e) => setFormData({ ...formData, fuelConsumption: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Fuel loaded (optional)"
              className="border border-gray-800 rounded p-2"
              value={formData.fuelLoaded}
              onChange={(e) => setFormData({ ...formData, fuelLoaded: e.target.value })}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
      {showGraph && (
        <div className="p-6 border rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Line Graph</h2>
          <div id="chart-container">
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
          <Button onClick={handleDownloadGraph} className="mt-4">
            Download Graph
          </Button>
        </div>
      )}
    </div>
  );
}
