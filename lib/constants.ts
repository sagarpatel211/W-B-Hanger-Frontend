'use client';

export function csvJSON(csv: string) {
  const lines = csv.split('\n');
  const result: any[] = [];
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i].split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] === 'N/A' ? 0 : currentline[j];
    }
    result.push(obj);
  }
  return result;
}

export const aircraftCsv = `
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
`;

export const modelCsv = `
name,fuelRate,groundFuelRate,fuelCap,mtow,mlw,utilityWeight,vso,va1,va2,va3,bag1Max,bag2Max,bagsMax
C152,6,0.8,26,1670,1670,1670,43,6.04E+01,1.59E-02,6.13E-06,120,40,120
C152LR,6,0.8,39,1670,1670,1670,43,6.04E+01,1.59E-02,6.13E-06,120,40,120
A152,6,0.8,26,1670,1670,1670,43,1.08E+02,0.00E+00,0.00E+00,120,40,120
C172N,10,1.4,54,2300,2300,2000,50,2.61E+01,4.02E-02,-4.08E-06,120,50,120
C172S,10,1.4,56,2550,2550,2200,48,-3.54E+00,6.87E-02,-1.03E-05,120,50,120
DA40SR,10,1.5,41.2,2646,2407,2161,55,,,,100,40,100
DA40,10,1.5,51,2646,2535,2161,55,,,,100,40,100
DA40AP,10,1.5,51,2535,2407,2161,55,,,,100,40,100
P28A,12,1.4,77,2750,2750,0,56,4.96E+01,2.49E-02,0.00E+00,200,0,200
PA44,22,2.7,110,3800,3800,0,56,5.55E+01,2.09E-02,0.00E+00,200,0,200
`;

export const aircrafts = csvJSON(aircraftCsv.trim());
for (const a of aircrafts) {
  a.weight = Number(a.weight);
  a.moment = Number(a.moment);
  a.frontSeatArm = Number(a.frontSeatArm);
  a.rearSeatArm = Number(a.rearSeatArm);
  a.bag1Arm = Number(a.bag1Arm);
  a.bag2Arm = Number(a.bag2Arm);
  a.fuelArm = Number(a.fuelArm);
}

import { updateModel } from './math';

export const models = csvJSON(modelCsv.trim());
for (const m of models) {
  for (const i in m) {
    if (i != 'name') {
      m[i] = Number(m[i]);
    } else {
      m.noSpin =
        m[i] == 'P28A' || m[i] == 'PA44' || m[i] == 'DA40' || m[i] == ' DA40AP' || m[i] == 'DA40SR';
    }
  }
  updateModel(m);
}
