import { aircrafts, models } from './constants';

export function updateModel(m: {
  name: any;
  normalCg?: { x: number; y: number }[];
  utilityCg?: { x: number; y: number }[];
  va?: (weight: number) => number;
  va1?: number;
  va2?: number;
  va3?: number;
}) {
  switch (m.name) {
    case 'C152':
    case 'A152':
    case 'C152LR':
      m.normalCg = [
        { x: 31, y: 1350 },
        { x: 32.65, y: 1670 },
        { x: 36.5, y: 1670 },
      ];
      m.utilityCg = m.normalCg;
      break;
    case 'C172N':
      m.normalCg = [
        { x: 35, y: 1950 },
        { x: 38.5, y: 2300 },
        { x: 47.3, y: 2300 },
      ];
      m.utilityCg = [
        { x: 35, y: 1950 },
        { x: 35.5, y: 2000 },
        { x: 40.5, y: 2000 },
      ];
      break;
    case 'C172S':
      m.normalCg = [
        { x: 35, y: 1950 },
        { x: 41, y: 2550 },
        { x: 47.3, y: 2550 },
      ];
      m.utilityCg = [
        { x: 35, y: 1950 },
        { x: 37.5, y: 2200 },
        { x: 40.5, y: 2200 },
      ];
      break;
    case 'DA40SR':
      m.normalCg = [
        { x: 94.5, y: 2161 },
        { x: 97.6, y: 2646 },
        { x: 102, y: 2646 },
      ];
      m.utilityCg = [
        { x: 94.5, y: 2161 },
        { x: 102, y: 2161 },
      ];
      break;
    case 'DA40':
      m.normalCg = [
        { x: 94.5, y: 2161 },
        { x: 97.6, y: 2646 },
        { x: 100.4, y: 2646 },
      ];
      m.utilityCg = [
        { x: 94.5, y: 2161 },
        { x: 100.4, y: 2161 },
      ];
      break;
    case 'DA40AP':
      m.normalCg = [
        { x: 94.5, y: 2161 },
        { x: 96.9, y: 2535 },
        { x: 100.4, y: 2535 },
      ];
      m.utilityCg = [
        { x: 94.5, y: 2161 },
        { x: 100.4, y: 2161 },
      ];
      break;
    case 'P28A':
      m.normalCg = [
        { x: 82, y: 2375 },
        { x: 88.9, y: 2750 },
        { x: 91.5, y: 2750 },
      ];
      m.utilityCg = [{ x: 0, y: 0 }];
      break;
    case 'PA44':
      m.normalCg = [
        { x: 84, y: 2800 },
        { x: 85, y: 3400 },
        { x: 89, y: 3800 },
        { x: 93, y: 3800 },
      ];
      m.utilityCg = [{ x: 0, y: 0 }];
      break;
  }

  switch (m.name) {
    case 'DA40SR':
    case 'DA40':
      m.va = (weight: number): number => {
        if (weight > 2284 && weight < 2646) {
          return 111;
        } else if (weight > 1720 && weight <= 2284) {
          return 94;
        } else {
          return 0;
        }
      };
      break;
    case 'DA40AP':
      m.va = (weight: number): number => {
        if (weight > 2161 && weight < 2535) {
          return 108;
        } else if (weight > 1720 && weight <= 2161) {
          return 94;
        } else {
          return 0;
        }
      };
      break;
    default:
      m.va = (weight: number): number => {
        return (m.va1 as number) + (m.va2 as number) * weight + (m.va3 as number) * weight * weight;
      };
      break;
  }
}

export function lookupAircraft(reg: string) {
  for (const a of aircrafts) {
    if (reg == a.registration) {
      return a;
    }
  }
  // exception
  return {
    registration: reg,
    model: 'C152',
    weight: 1150,
    moment: 35062.11,
    frontSeatArm: 39,
    rearSeatArm: 64,
    bag1Arm: 84,
    bag2Arm: 42,
    fuelArm: 42,
  };
}

export function lookupModel(aircraft: any) {
  for (const m of models) {
    if (aircraft.model === m.name) {
      return m;
    }
  }
  // exception
  return null;
}

export function linearConstraints(
  points: { x: number; y: number }[],
  x: number,
  y: number
): boolean {
  if (x < points[0].x || x > points[points.length - 1].x) {
    return false;
  }

  for (let i = 0; i < points.length - 1; i++) {
    if (x >= points[i].x && x <= points[i + 1].x) {
      const slope = (points[i + 1].y - points[i].y) / (points[i + 1].x - points[i].x);
      const intercept = points[i].y - points[i].x * slope;
      return y <= slope * x + intercept;
    }
  }
  // can't get here
  return false;
}

export type ObjectiveFunction = (x: number) => [number, number];
export type ConstraintFunction = (y0: number, y1: number) => boolean;

export function constrainedOptimization(
  objective: ObjectiveFunction,
  constraint: ConstraintFunction,
  max: number
): { x: number; y0: number; y1: number } | null {
  let bestX: number | null = null;
  let bestY0: number | null = null;
  let bestY1: number | null = null;
  let min = 0;

  // Binary search for the optimal x
  while (min <= max) {
    const mid = (min + max) / 2;
    const [y0, y1] = objective(mid);

    if (constraint(y0, y1)) {
      // Update best found values
      if (bestY0 === null || y0 > bestY0) {
        bestY0 = y0;
        bestY1 = y1;
        bestX = mid;
      }
      // Since the function is monotonically increasing, search in the right half
      min = mid + 0.01; // Move to the right
    } else {
      // Search in the left half
      max = mid - 0.01; // Move to the left
    }
  }

  if (bestX !== null && bestY0 !== null && bestY1 !== null) {
    return { x: bestX, y0: bestY0, y1: bestY1 };
  }

  return null; // No valid solution found
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

export type GraphData = {
  points: { name: string; x: number; y: number }[];
  normalEnvelope: { x: number; y: number }[];
  utilityEnvelope: { x: number; y: number }[];
  extraInfo: any;
};

export function calculateGraphData(formData: FormData): GraphData {
  const aircraft = lookupAircraft(formData.aircraftReg);
  const model = lookupModel(aircraft);
  const fuelLoaded = Number(formData.fuelLoaded);
  const density = 6;
  const fuelWeight = fuelLoaded * density;
  const startTaxiFuel = Number(formData.startups) * model.groundFuelRate;
  const startTaxiWeight = startTaxiFuel * density;
  const takeoffFuel = fuelLoaded - startTaxiFuel;
  const takeoffFuelWeight = takeoffFuel * density;
  const tripFuel = Number(formData.flightDuration) * model.fuelRate; // fuelRate = fuelConsumption
  const tripWeight = tripFuel * density;
  const landingFuel = fuelLoaded - startTaxiFuel - tripFuel;
  const landingFuelWeight = fuelLoaded - startTaxiFuel - tripFuel;
  const reserveTime = 1;
  const reserveFuel = reserveTime * model.fuelRate;
  const minDepFuel = reserveFuel + startTaxiFuel + tripFuel;
  const endurance = (fuelLoaded - startTaxiFuel) / model.fuelRate;

  // WB
  const FRONT = 0;
  const REAR = 1;
  const BAG_1 = 2;
  const BAG_2 = 3;
  const FUEL = 4;
  const weight = [
    Number(formData.frontLeft) + Number(formData.frontRight),
    Number(formData.rearLeft) + Number(formData.rearRight),
    Number(formData.bag1),
    Number(formData.bag2),
    takeoffFuelWeight,
  ];
  const arm = [
    aircraft.frontSeatArm,
    aircraft.rearSeatArm,
    aircraft.bag1Arm,
    aircraft.bag2Arm,
    aircraft.fuelArm,
  ];
  let takeoffWeight = aircraft.weight;
  for (const w of weight) {
    takeoffWeight += w; // THIS IS y for POINT TOW, green for takeoff
  }

  let takeoffMoment = aircraft.moment;
  for (let i = 0; i < weight.length; i++) {
    takeoffMoment += weight[i] * arm[i];
  }

  const takeoffArm = takeoffMoment / takeoffWeight;
  const landingWeight = takeoffWeight - tripFuel * density; // x for POINT TOW, this landing so red
  const landingMoment = takeoffMoment - tripFuel * density * aircraft.fuelArm;
  const landingArm = landingMoment / landingWeight;

  const va = model.va(takeoffWeight);
  const vref = 1.3 * model.vso * Math.sqrt(landingWeight / model.mtow);

  let opt = constrainedOptimization(
    (fuel: number) => {
      const weight = fuel * density + takeoffWeight - fuelWeight;
      const moment = takeoffMoment + (fuel * density - fuelWeight) * aircraft.fuelArm;
      const arm = moment / weight;
      return [arm, weight];
    },
    (arm: number, weight: number) => {
      return linearConstraints(model.normalCg, arm, weight);
    },
    model.fuelCap
  );
  const maxDepFuel = opt == null ? null : opt.x;
  const maxArm = opt == null ? null : opt.y0;
  const maxWeight = opt == null ? null : opt.y1;

  opt = constrainedOptimization(
    (fuel: number) => {
      const weight = fuel * density + takeoffWeight - fuelWeight;
      const moment = takeoffMoment + (fuel * density - fuelWeight) * aircraft.fuelArm;
      const arm = moment / weight;
      return [arm, weight];
    },
    (arm: number, weight: number) => {
      return linearConstraints(model.utilityCg, arm, weight);
    },
    model.fuelCap
  );
  const utilityMaxFuel = opt == null ? null : opt.x;
  const utilityMaxArm = opt == null ? null : opt.y0;
  const utilityMaxWeight = opt == null ? null : opt.y1;
  const timeToUtility =
    opt == null || utilityMaxFuel == null
      ? null
      : Math.max((fuelLoaded - utilityMaxFuel) / model.fuelRate, 0);

  // flags
  const belowMinDepFuel = fuelLoaded < minDepFuel;
  const bag1Over = Number(formData.bag1) > model.bag1Max;
  const bag2Over = Number(formData.bag2) > model.bag2Max;
  const bagsOver = Number(formData.bag1) + Number(formData.bag2) > model.bagsMax;
  const maxFuelInsufficient = maxDepFuel == null ? true : maxDepFuel < minDepFuel;

  const utilityCat = linearConstraints(model.utilityCg, takeoffArm, takeoffWeight);
  const normalCat = !utilityCat && linearConstraints(model.normalCg, takeoffArm, takeoffWeight);

  const overMTOW = !normalCat && !utilityCat && takeoffWeight > model.mtow;
  const overMLW = landingWeight > model.mlw;

  const hasPassenger = weight[REAR] > 0 || weight[BAG_1] > 0 || weight[BAG_2] > 0;
  const noSpin =
    utilityMaxFuel == null ? true : model.noSpin || utilityMaxFuel < reserveFuel || hasPassenger;

  return {
    points: [
      { name: 'TOW', x: takeoffArm, y: takeoffWeight },
      { name: 'ELW', x: landingArm, y: landingWeight },
    ],
    normalEnvelope: model.normalCg,
    utilityEnvelope: model.utilityCg,
    extraInfo: {
      model,
      fuelLoaded,
      fuelWeight,
      startTaxiFuel,
      startTaxiWeight,
      takeoffFuel,
      takeoffFuelWeight,
      tripFuel,
      tripWeight,
      landingFuel,
      landingFuelWeight,
      takeoffWeight,
      landingWeight,
      takeoffArm,
      landingArm,
      takeoffMoment,
      landingMoment,
      endurance,

      va,
      vref,

      minDepFuel,
      maxDepFuel,
      maxArm,
      maxWeight,
      utilityMaxFuel,
      utilityMaxArm,
      utilityMaxWeight,
      timeToUtility,

      aircraftWeight: aircraft.weight,
      aircraftMoment: aircraft.moment,
      aircraftArm: aircraft.moment / aircraft.weight,

      frontSeatWeight: weight[FRONT],
      rearSeatWeight: weight[REAR],
      bag1Weight: weight[BAG_1],
      bag2Weight: weight[BAG_2],

      frontSeatMoment: weight[FRONT] * arm[FRONT],
      rearSeatMoment: weight[REAR] * arm[REAR],
      bag1Moment: weight[BAG_1] * arm[BAG_1],
      bag2Moment: weight[BAG_2] * arm[BAG_2],

      frontSeatArm: aircraft.frontSeatArm,
      rearSeatArm: aircraft.rearSeatArm,
      bag1Arm: aircraft.bag1Arm,
      bag2Arm: aircraft.bag2Arm,
      fuelArm: aircraft.fuelArm,

      belowMinDepFuel,
      bag1Over,
      bag2Over,
      bagsOver,
      maxFuelInsufficient,
      utilityCat,
      normalCat,
      overMTOW,
      overMLW,
      noSpin,
    },
  };
}
