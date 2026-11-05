// Demo dataset for presentation - Godhra slice
// All dates are computed dynamically at module load time relative to new Date().

import { Ward, Route, Van, Complaint, CitizenCollectionFeedback } from '../types';

export const DEMO_DEVICE_ID = 'DEV-DEMO-0007';
export const DEMO_WARD_ID = 'W03';

function getDateStr(dayOffset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getYmdCompact(dayOffset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

function getIsoIST(dayOffset: number, hours: number, minutes: number, seconds = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(hours).padStart(2, '0');
  const min = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}+05:30`;
}

export const DEMO_CITIZEN = {
  "deviceId": "DEV-DEMO-0007",
  "wardId": "W03",
  "wardName": "Bhadrapura",
  "address": "Near Panchmahal District Collectorate, Seva Sadan, Godhra 389001",
  "location": {
    "lat": 22.7645,
    "lng": 73.6015
  },
  "phone": "9825043241",
  "phoneMasked": "98XXXXXX41",
  "vanId": "VAN-01",
  "routeId": "RT-GDR-01"
};

export const DEMO_WARDS: Ward[] = [
  {
    "id": "W01",
    "num": 1,
    "code": "GD-W01",
    "name": "Vohrawad",
    "nameGu": "વોહરાવાડ",
    "type": "urban",
    "center": {
      "lat": 22.785,
      "lng": 73.61
    },
    "radiusM": 520,
    "routeId": "RT-GDR-01",
    "inspectorId": "STF-INS-01",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.85,
    "polygon": [
      [
        22.785541,
        73.614919
      ],
      [
        22.78908,
        73.613157
      ],
      [
        22.789247,
        73.606866
      ],
      [
        22.785227,
        73.605265
      ],
      [
        22.7803,
        73.607248
      ],
      [
        22.781167,
        73.612382
      ]
    ]
  },
  {
    "id": "W02",
    "num": 2,
    "code": "GD-W02",
    "name": "Raipur",
    "nameGu": "રાયપુર",
    "type": "urban",
    "center": {
      "lat": 22.782,
      "lng": 73.617
    },
    "radiusM": 480,
    "routeId": "RT-GDR-01",
    "inspectorId": "STF-INS-01",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.72,
    "polygon": [
      [
        22.782824,
        73.621941
      ],
      [
        22.785231,
        73.61992
      ],
      [
        22.785804,
        73.613622
      ],
      [
        22.782594,
        73.612819
      ],
      [
        22.77754,
        73.61504
      ],
      [
        22.777831,
        73.618927
      ]
    ]
  },
  {
    "id": "W03",
    "num": 3,
    "code": "GD-W03",
    "name": "Bhadrapura",
    "nameGu": "ભદ્રાપુરા",
    "type": "urban",
    "center": {
      "lat": 22.779,
      "lng": 73.623
    },
    "radiusM": 460,
    "routeId": "RT-GDR-01",
    "inspectorId": "STF-INS-01",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.66,
    "polygon": [
      [
        22.779703,
        73.628006
      ],
      [
        22.781405,
        73.625877
      ],
      [
        22.783312,
        73.621049
      ],
      [
        22.781472,
        73.61931
      ],
      [
        22.776467,
        73.619237
      ],
      [
        22.774736,
        73.621036
      ],
      [
        22.776549,
        73.625995
      ]
    ]
  },
  {
    "id": "W04",
    "num": 4,
    "code": "GD-W04",
    "name": "Sigra",
    "nameGu": "સિગરા",
    "type": "urban",
    "center": {
      "lat": 22.776,
      "lng": 73.611
    },
    "radiusM": 540,
    "routeId": "RT-GDR-01",
    "inspectorId": "STF-INS-01",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.92,
    "polygon": [
      [
        22.77627,
        73.616971
      ],
      [
        22.779957,
        73.613902
      ],
      [
        22.780232,
        73.607744
      ],
      [
        22.776619,
        73.605254
      ],
      [
        22.771806,
        73.60914
      ],
      [
        22.770833,
        73.61319
      ]
    ]
  },
  {
    "id": "W05",
    "num": 5,
    "code": "GD-W05",
    "name": "Navi Pole",
    "nameGu": "નવી પોળ",
    "type": "urban",
    "center": {
      "lat": 22.774,
      "lng": 73.618
    },
    "radiusM": 430,
    "routeId": "RT-GDR-02",
    "inspectorId": "STF-INS-01",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.58,
    "polygon": [
      [
        22.773674,
        73.622559
      ],
      [
        22.777722,
        73.620044
      ],
      [
        22.777305,
        73.616072
      ],
      [
        22.773986,
        73.613231
      ],
      [
        22.770908,
        73.616169
      ],
      [
        22.770174,
        73.620133
      ]
    ]
  },
  {
    "id": "W06",
    "num": 6,
    "code": "GD-W06",
    "name": "Rampura",
    "nameGu": "રામપુરા",
    "type": "urban",
    "center": {
      "lat": 22.771,
      "lng": 73.625
    },
    "radiusM": 500,
    "routeId": "RT-GDR-02",
    "inspectorId": "STF-INS-01",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.79,
    "polygon": [
      [
        22.770257,
        73.629824
      ],
      [
        22.776034,
        73.625883
      ],
      [
        22.773721,
        73.621948
      ],
      [
        22.767545,
        73.620984
      ],
      [
        22.766503,
        73.626054
      ]
    ]
  },
  {
    "id": "W07",
    "num": 7,
    "code": "GD-W07",
    "name": "Lakhana",
    "nameGu": "લખાણા",
    "type": "urban",
    "center": {
      "lat": 22.768,
      "lng": 73.612
    },
    "radiusM": 470,
    "routeId": "RT-GDR-02",
    "inspectorId": "STF-INS-01",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.69,
    "polygon": [
      [
        22.767356,
        73.616014
      ],
      [
        22.772527,
        73.613763
      ],
      [
        22.771937,
        73.610478
      ],
      [
        22.767199,
        73.607207
      ],
      [
        22.76442,
        73.608759
      ],
      [
        22.76497,
        73.614697
      ]
    ]
  },
  {
    "id": "W08",
    "num": 8,
    "code": "GD-W08",
    "name": "Bhuravav",
    "nameGu": "ભુરાવાવ",
    "type": "urban",
    "center": {
      "lat": 22.765,
      "lng": 73.62
    },
    "radiusM": 450,
    "routeId": "RT-GDR-03",
    "inspectorId": "STF-INS-01",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.64,
    "polygon": [
      [
        22.764639,
        73.624147
      ],
      [
        22.769053,
        73.621898
      ],
      [
        22.769052,
        73.618198
      ],
      [
        22.76442,
        73.61582
      ],
      [
        22.761422,
        73.61684
      ],
      [
        22.76215,
        73.622566
      ]
    ]
  },
  {
    "id": "W09",
    "num": 9,
    "code": "GD-W09",
    "name": "Prabhu Nagar",
    "nameGu": "પ્રભુ નગર",
    "type": "urban",
    "center": {
      "lat": 22.782,
      "lng": 73.63
    },
    "radiusM": 490,
    "routeId": "RT-GDR-03",
    "inspectorId": "STF-INS-02",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.75,
    "polygon": [
      [
        22.78214,
        73.635025
      ],
      [
        22.78544,
        73.632993
      ],
      [
        22.7869,
        73.628906
      ],
      [
        22.783516,
        73.626158
      ],
      [
        22.780163,
        73.625015
      ],
      [
        22.777512,
        73.629357
      ],
      [
        22.778142,
        73.632613
      ]
    ]
  },
  {
    "id": "W10",
    "num": 10,
    "code": "GD-W10",
    "name": "Kankunaka",
    "nameGu": "કાંકુનાકા",
    "type": "urban",
    "center": {
      "lat": 22.778,
      "lng": 73.636
    },
    "radiusM": 410,
    "routeId": "RT-GDR-03",
    "inspectorId": "STF-INS-02",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.53,
    "polygon": [
      [
        22.778575,
        73.640432
      ],
      [
        22.780613,
        73.638126
      ],
      [
        22.7814,
        73.633347
      ],
      [
        22.778293,
        73.632054
      ],
      [
        22.774501,
        73.634093
      ],
      [
        22.774401,
        73.638084
      ]
    ]
  },
  {
    "id": "W11",
    "num": 11,
    "code": "GD-W11",
    "name": "Godhra GIDC",
    "nameGu": "ગોધરા જીઆઈડીસી",
    "type": "urban",
    "center": {
      "lat": 22.772,
      "lng": 73.642
    },
    "radiusM": 700,
    "routeId": "RT-GDR-04",
    "inspectorId": "STF-INS-02",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 1.54,
    "polygon": [
      [
        22.773287,
        73.649646
      ],
      [
        22.775435,
        73.64735
      ],
      [
        22.77875,
        73.640716
      ],
      [
        22.777566,
        73.637714
      ],
      [
        22.771066,
        73.635535
      ],
      [
        22.767676,
        73.635792
      ],
      [
        22.766243,
        73.642769
      ],
      [
        22.766583,
        73.646755
      ]
    ]
  },
  {
    "id": "W12",
    "num": 12,
    "code": "GD-W12",
    "name": "Station Road",
    "nameGu": "સ્ટેશન રોડ",
    "type": "urban",
    "center": {
      "lat": 22.77,
      "lng": 73.63
    },
    "radiusM": 380,
    "routeId": "RT-GDR-04",
    "inspectorId": "STF-INS-02",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.45,
    "polygon": [
      [
        22.770499,
        73.634062
      ],
      [
        22.772835,
        73.632434
      ],
      [
        22.772642,
        73.62767
      ],
      [
        22.77066,
        73.625865
      ],
      [
        22.767165,
        73.628894
      ],
      [
        22.76638,
        73.6314
      ]
    ]
  },
  {
    "id": "W13",
    "num": 13,
    "code": "GD-W13",
    "name": "Dahod Road",
    "nameGu": "દાહોદ રોડ",
    "type": "urban",
    "center": {
      "lat": 22.76,
      "lng": 73.628
    },
    "radiusM": 560,
    "routeId": "RT-GDR-04",
    "inspectorId": "STF-INS-02",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 0.99,
    "polygon": [
      [
        22.760099,
        73.633611
      ],
      [
        22.764778,
        73.631292
      ],
      [
        22.763687,
        73.625322
      ],
      [
        22.760521,
        73.621842
      ],
      [
        22.755393,
        73.625828
      ],
      [
        22.75507,
        73.630206
      ]
    ]
  },
  {
    "id": "W14",
    "num": 14,
    "code": "GD-W14",
    "name": "Shehra Road",
    "nameGu": "શેરા રોડ",
    "type": "rural",
    "center": {
      "lat": 22.79,
      "lng": 73.618
    },
    "radiusM": 640,
    "routeId": "RT-GDR-05",
    "inspectorId": "STF-INS-02",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 1.29,
    "polygon": [
      [
        22.789454,
        73.6237
      ],
      [
        22.795942,
        73.62104
      ],
      [
        22.794947,
        73.615314
      ],
      [
        22.789792,
        73.611252
      ],
      [
        22.784599,
        73.614568
      ],
      [
        22.785181,
        73.620886
      ]
    ]
  },
  {
    "id": "W15",
    "num": 15,
    "code": "GD-W15",
    "name": "Halol Road",
    "nameGu": "હાલોલ રોડ",
    "type": "rural",
    "center": {
      "lat": 22.766,
      "lng": 73.605
    },
    "radiusM": 610,
    "routeId": "RT-GDR-05",
    "inspectorId": "STF-INS-02",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 1.17,
    "polygon": [
      [
        22.765119,
        73.610393
      ],
      [
        22.771313,
        73.608184
      ],
      [
        22.771818,
        73.604567
      ],
      [
        22.76765,
        73.599387
      ],
      [
        22.76401,
        73.59861
      ],
      [
        22.761168,
        73.604371
      ],
      [
        22.76088,
        73.608707
      ]
    ]
  },
  {
    "id": "W16",
    "num": 16,
    "code": "GD-W16",
    "name": "Kalol Road",
    "nameGu": "કાલોલ રોડ",
    "type": "rural",
    "center": {
      "lat": 22.788,
      "lng": 73.63
    },
    "radiusM": 590,
    "routeId": "RT-GDR-06",
    "inspectorId": "STF-INS-02",
    "escalationTo": "STF-CO-01",
    "talukaId": "PMH-GDR",
    "areaKm2": 1.09,
    "polygon": [
      [
        22.787125,
        73.635848
      ],
      [
        22.793114,
        73.632038
      ],
      [
        22.793623,
        73.627804
      ],
      [
        22.787168,
        73.625052
      ],
      [
        22.783403,
        73.625793
      ],
      [
        22.783928,
        73.633696
      ]
    ]
  }
] as unknown as Ward[];

export const DEMO_ROUTES: Route[] = [
  {
    "id": "RT-GDR-01",
    "name": "Morning North",
    "wardIds": [
      "W01",
      "W02",
      "W03",
      "W04"
    ],
    "scheduledStartTime": "07:00",
    "vanId": "VAN-01",
    "vanPlate": "GJ-17-GV-2401",
    "totalDistanceKm": 2.8,
    "estimatedDuration": "0 h 59 min"
  },
  {
    "id": "RT-GDR-02",
    "name": "Morning Central",
    "wardIds": [
      "W05",
      "W06",
      "W07"
    ],
    "scheduledStartTime": "07:30",
    "vanId": "VAN-01",
    "vanPlate": "GJ-17-GV-2401",
    "totalDistanceKm": 2.2,
    "estimatedDuration": "0 h 45 min"
  },
  {
    "id": "RT-GDR-03",
    "name": "Morning East",
    "wardIds": [
      "W08",
      "W09",
      "W10"
    ],
    "scheduledStartTime": "08:00",
    "vanId": "VAN-01",
    "vanPlate": "GJ-17-GV-2401",
    "totalDistanceKm": 2.9,
    "estimatedDuration": "0 h 48 min"
  },
  {
    "id": "RT-GDR-04",
    "name": "Morning South",
    "wardIds": [
      "W11",
      "W12",
      "W13"
    ],
    "scheduledStartTime": "08:30",
    "vanId": "VAN-01",
    "vanPlate": "GJ-17-GV-2401",
    "totalDistanceKm": 2.4,
    "estimatedDuration": "0 h 46 min"
  },
  {
    "id": "RT-GDR-05",
    "name": "Outer North",
    "wardIds": [
      "W14",
      "W15"
    ],
    "scheduledStartTime": "09:00",
    "vanId": "VAN-01",
    "vanPlate": "GJ-17-GV-2401",
    "totalDistanceKm": 3,
    "estimatedDuration": "0 h 36 min"
  },
  {
    "id": "RT-GDR-06",
    "name": "Outer East",
    "wardIds": [
      "W16"
    ],
    "scheduledStartTime": "09:30",
    "vanId": "VAN-01",
    "vanPlate": "GJ-17-GV-2401",
    "totalDistanceKm": 0,
    "estimatedDuration": "0 h 12 min"
  }
] as unknown as Route[];

export const DEMO_VANS: Van[] = [
  {
    id: 'VAN-01',
    plateNo: 'GJ-17-GV-2401',
    routeId: 'RT-GDR-01',
    status: 'on_shift',
    lastLocation: {
      lat: 22.7772,
      lng: 73.6135,
      speedKmph: 18,
      updatedAt: getIsoIST(0, 10, 19, 0),
    },
    currentTripId: `TRIP-${getYmdCompact(0)}-01`,
    batteryPct: 78,
    driverName: 'Rameshbhai B. Solanki',
    driverPhone: '+91 98251 10001',
  },
];

export const DEMO_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-0001',
    ticketId: `PMH-${getYmdCompact(0)}-0001`,
    deviceId: DEMO_DEVICE_ID,
    category: 'garbage_dump',
    photoUrl: 'complaints/CMP-0001/photo.jpg',
    phone: '9825043241',
    location: { lat: 22.7582, lng: 73.6095 },
    wardId: 'W06',
    address: 'Near Railway Junction North Gate, Station Road, Godhra, Panchmahal 389001',
    createdAt: getIsoIST(0, 8, 20, 0),
    status: 'received',
    assignedTo: '',
    assignedName: '',
    assignedPhone: '',
    escalationLevel: 0,
    resolvedPhotoUrl: undefined,
    resolvedAt: undefined,
    autoResolveDeadline: undefined,
    citizenVerifiedAt: undefined,
    citizenVerifiedStatus: undefined,
    citizenRejectReason: undefined,
    citizenRejectPhotoUrl: undefined,
    reopenedAt: undefined,
    reopenReason: undefined,
    reopenPhotoUrl: undefined,
    mergedInto: undefined,
    note: 'Garbage pile behind the Bhadrapura bus stand.',
    syncStatus: 'synced',
  },
  {
    id: 'CMP-0009',
    ticketId: `PMH-${getYmdCompact(-1)}-0009`,
    deviceId: DEMO_DEVICE_ID,
    category: 'missed_collection',
    photoUrl: 'complaints/CMP-0009/photo.jpg',
    phone: '9825043241',
    location: { lat: 22.7684, lng: 73.5975 },
    wardId: 'W08',
    address: 'Near Vavdi Toll Road, Vavdi Ward, Godhra, Panchmahal 389001',
    createdAt: getIsoIST(-1, 18, 5, 0),
    status: 'assigned',
    assignedTo: 'STF-INS-01',
    assignedName: 'Shri A. B. Chauhan',
    assignedPhone: '+91 98795 12373',
    assignedAt: getIsoIST(-1, 18, 30, 0),
    escalationLevel: 0,
    resolvedPhotoUrl: undefined,
    resolvedAt: undefined,
    autoResolveDeadline: undefined,
    citizenVerifiedAt: undefined,
    citizenVerifiedStatus: undefined,
    citizenRejectReason: undefined,
    citizenRejectPhotoUrl: undefined,
    reopenedAt: undefined,
    reopenReason: undefined,
    reopenPhotoUrl: undefined,
    mergedInto: undefined,
    note: 'Van skipped Bhadrapura Main Road on the second round.',
    syncStatus: 'synced',
  } as unknown as Complaint,
  {
    id: 'CMP-0012',
    ticketId: `PMH-${getYmdCompact(-7)}-0012`,
    deviceId: DEMO_DEVICE_ID,
    category: 'other',
    photoUrl: 'complaints/CMP-0012/photo.jpg',
    phone: '9825043241',
    location: { lat: 22.7842, lng: 73.6075 },
    wardId: 'W01',
    address: 'Near Gandhi Chowk & Municipal School, Vohrawad, Godhra, Panchmahal 389001',
    createdAt: getIsoIST(-7, 9, 25, 0),
    status: 'reopened',
    assignedTo: 'STF-INS-01',
    assignedName: 'Shri A. B. Chauhan',
    assignedPhone: '+91 98795 12373',
    assignedAt: getIsoIST(-7, 10, 0, 0),
    escalationLevel: 0,
    resolvedPhotoUrl: 'complaints/CMP-0012/resolved.jpg',
    resolvedAt: getIsoIST(-6, 14, 0, 0),
    autoResolveDeadline: getIsoIST(-5, 14, 0, 0),
    citizenVerifiedAt: getIsoIST(-5, 9, 0, 0),
    citizenVerifiedStatus: 'rejected',
    citizenRejectReason: 'The same dump is still there. Only the top layer was removed.',
    citizenRejectPhotoUrl: 'complaints/CMP-0012/reject.jpg',
    reopenedAt: getIsoIST(-5, 9, 0, 0),
    reopenReason: 'The same dump is still there.',
    reopenPhotoUrl: 'complaints/CMP-0012/reopen.jpg',
    mergedInto: undefined,
    note: 'Sweeping was not done on the lane behind the school.',
    syncStatus: 'synced',
  } as unknown as Complaint,
  {
    id: 'CMP-0017',
    ticketId: `PMH-${getYmdCompact(-1)}-0017`,
    deviceId: DEMO_DEVICE_ID,
    category: 'open_gutter',
    photoUrl: 'complaints/CMP-0017/photo.jpg',
    phone: '9825043241',
    location: { lat: 22.7525, lng: 73.6180 },
    wardId: 'W07',
    address: 'Near APMC Market Yard, Bhamaiya, Godhra, Panchmahal 389001',
    createdAt: getIsoIST(-1, 9, 30, 0),
    status: 'pending_verification',
    assignedTo: 'STF-INS-01',
    assignedName: 'Shri A. B. Chauhan',
    assignedPhone: '+91 98795 12373',
    assignedAt: getIsoIST(-1, 10, 0, 0),
    escalationLevel: 0,
    resolvedPhotoUrl: 'complaints/CMP-0017/resolved.jpg',
    resolvedAt: getIsoIST(0, 8, 5, 0),
    autoResolveDeadline: getIsoIST(1, 8, 5, 0),
    citizenVerifiedAt: undefined,
    citizenVerifiedStatus: undefined,
    citizenRejectReason: undefined,
    citizenRejectPhotoUrl: undefined,
    reopenedAt: undefined,
    reopenReason: undefined,
    reopenPhotoUrl: undefined,
    mergedInto: undefined,
    note: 'Gutter covered and disinfected.',
    syncStatus: 'synced',
  } as unknown as Complaint,
  {
    id: 'CMP-0018',
    ticketId: `PMH-${getYmdCompact(-6)}-0018`,
    deviceId: DEMO_DEVICE_ID,
    category: 'garbage_dump',
    photoUrl: 'complaints/CMP-0018/photo.jpg',
    phone: '9825043241',
    location: { lat: 22.7610, lng: 73.6295 },
    wardId: 'W10',
    address: 'Near Chhabanpur Main Gate, Godhra, Panchmahal 389001',
    createdAt: getIsoIST(-6, 11, 15, 0),
    status: 'resolved',
    assignedTo: 'STF-INS-01',
    assignedName: 'Shri A. B. Chauhan',
    assignedPhone: '+91 98795 12373',
    assignedAt: getIsoIST(-6, 11, 40, 0),
    escalationLevel: 0,
    resolvedPhotoUrl: 'complaints/CMP-0018/resolved.jpg',
    resolvedAt: getIsoIST(-6, 17, 40, 0),
    autoResolveDeadline: getIsoIST(-5, 17, 40, 0),
    citizenVerifiedAt: undefined,
    citizenVerifiedStatus: undefined,
    citizenRejectReason: undefined,
    citizenRejectPhotoUrl: undefined,
    reopenedAt: undefined,
    reopenReason: undefined,
    reopenPhotoUrl: undefined,
    mergedInto: undefined,
    note: 'Cleared and the spot was swept.',
    syncStatus: 'synced',
  } as unknown as Complaint,
];

export const DEMO_NOTICES = [
  {
    id: 'NTC-0001',
    title: 'Shift timing',
    targetType: 'all',
    targetId: null,
    message: 'Collection starts at 07:00 today. Please reach your first ward on time.',
    createdAt: getIsoIST(0, 6, 30, 0),
    createdBy: 'STF-CO-01',
    language: 'gu',
    attachmentUrl: null,
  },
  {
    id: 'NTC-0002',
    title: 'Festival day timing',
    targetType: 'ward',
    targetId: 'W05',
    message: 'Festival at Rampura today. Complete ward 5 before 09:00.',
    createdAt: getIsoIST(0, 7, 10, 0),
    createdBy: 'STF-CO-01',
    language: 'gu',
    attachmentUrl: null,
  },
  {
    id: 'NTC-0003',
    title: 'PUC renewal',
    targetType: 'van',
    targetId: 'VAN-01',
    message: 'PUC expires on 13 Nov. Get it renewed this week.',
    createdAt: getIsoIST(0, 8, 0, 0),
    createdBy: 'STF-CO-01',
    language: 'en',
    attachmentUrl: null,
  },
  {
    id: 'NTC-0004',
    title: 'Weather advisory',
    targetType: 'all',
    targetId: null,
    message: 'Heavy rain expected after 17:00. Finish routes early and report any blocked lane.',
    createdAt: getIsoIST(0, 9, 15, 0),
    createdBy: 'STF-CO-01',
    language: 'gu',
    attachmentUrl: null,
  },
  {
    id: 'NTC-0005',
    title: 'Gate closure',
    targetType: 'ward',
    targetId: 'W11',
    message: 'GIDC gate 3 is closed for repair. Use gate 5.',
    createdAt: getIsoIST(0, 9, 40, 0),
    createdBy: 'STF-INS-02',
    language: 'gu',
    attachmentUrl: null,
  },
  {
    id: 'NTC-0006',
    title: 'Holiday roster',
    targetType: 'all',
    targetId: null,
    message: 'Diwali holiday roster is on the notice board. Check your duty date.',
    createdAt: getIsoIST(-2, 18, 0, 0),
    createdBy: 'STF-CO-01',
    language: 'gu',
    attachmentUrl: null,
  },
];

const RAW_RATINGS = [
  {
    "id": "RAT-0001",
    "wardId": "W01",
    "stars": 5,
    "deviceId": "DEV-DEMO-2000"
  },
  {
    "id": "RAT-0002",
    "wardId": "W02",
    "stars": 4,
    "deviceId": "DEV-DEMO-2001"
  },
  {
    "id": "RAT-0003",
    "wardId": "W03",
    "stars": 5,
    "deviceId": "DEV-DEMO-2002"
  },
  {
    "id": "RAT-0004",
    "wardId": "W04",
    "stars": 4,
    "deviceId": "DEV-DEMO-2003"
  },
  {
    "id": "RAT-0005",
    "wardId": "W05",
    "stars": 3,
    "deviceId": "DEV-DEMO-2004"
  },
  {
    "id": "RAT-0006",
    "wardId": "W06",
    "stars": 5,
    "deviceId": "DEV-DEMO-2005"
  },
  {
    "id": "RAT-0007",
    "wardId": "W07",
    "stars": 4,
    "deviceId": "DEV-DEMO-2006"
  },
  {
    "id": "RAT-0008",
    "wardId": "W08",
    "stars": 4,
    "deviceId": "DEV-DEMO-2007"
  },
  {
    "id": "RAT-0009",
    "wardId": "W09",
    "stars": 5,
    "deviceId": "DEV-DEMO-2008"
  },
  {
    "id": "RAT-0010",
    "wardId": "W10",
    "stars": 2,
    "deviceId": "DEV-DEMO-2009"
  },
  {
    "id": "RAT-0011",
    "wardId": "W11",
    "stars": 4,
    "deviceId": "DEV-DEMO-2010"
  },
  {
    "id": "RAT-0012",
    "wardId": "W12",
    "stars": 5,
    "deviceId": "DEV-DEMO-2011"
  },
  {
    "id": "RAT-0013",
    "wardId": "W13",
    "stars": 3,
    "deviceId": "DEV-DEMO-2012"
  },
  {
    "id": "RAT-0014",
    "wardId": "W14",
    "stars": 4,
    "deviceId": "DEV-DEMO-2013"
  },
  {
    "id": "RAT-0015",
    "wardId": "W15",
    "stars": 5,
    "deviceId": "DEV-DEMO-2014"
  },
  {
    "id": "RAT-0016",
    "wardId": "W16",
    "stars": 4,
    "deviceId": "DEV-DEMO-2015"
  },
  {
    "id": "RAT-0017",
    "wardId": "W01",
    "stars": 4,
    "deviceId": "DEV-DEMO-2016"
  },
  {
    "id": "RAT-0018",
    "wardId": "W06",
    "stars": 5,
    "deviceId": "DEV-DEMO-2017"
  }
];
export const DEMO_RATINGS = RAW_RATINGS.map(r => ({
  ...r,
  date: getIsoIST(0, 0, 0, 0),
}));

export const DEMO_FEEDBACK: CitizenCollectionFeedback[] = [
  {
    id: `${getDateStr(-1)}_W03_0007`,
    wardId: 'W03',
    date: getDateStr(-1),
    deviceId: DEMO_DEVICE_ID,
    hadGarbage: true,
    collectionStatus: 'collected',
    reason: '',
    note: 'On time.',
    timestamp: getIsoIST(-1, 8, 40, 0),
    syncStatus: 'synced',
  },
  {
    id: `${getDateStr(-2)}_W03_0007`,
    wardId: 'W03',
    date: getDateStr(-2),
    deviceId: DEMO_DEVICE_ID,
    hadGarbage: false,
    collectionStatus: 'no_garbage_today',
    reason: '',
    note: '',
    timestamp: getIsoIST(-2, 8, 30, 0),
    syncStatus: 'synced',
  },
  {
    id: `${getDateStr(-3)}_W03_0007`,
    wardId: 'W03',
    date: getDateStr(-3),
    deviceId: DEMO_DEVICE_ID,
    hadGarbage: true,
    collectionStatus: 'missed_by_van',
    reason: 'The van did not arrive before 09:00.',
    note: '',
    timestamp: getIsoIST(-3, 9, 10, 0),
    syncStatus: 'synced',
  },
];

export const DEMO_WARD_DUTY = [
  {
    id: `${getDateStr(0)}_W03`,
    wardId: 'W03',
    date: getDateStr(0),
    status: 'in_progress',
    isDutyOver: false,
    vanId: 'VAN-01',
    tripId: `TRIP-${getYmdCompact(0)}-01`,
    updatedAt: getIsoIST(0, 7, 0, 0),
  },
];
