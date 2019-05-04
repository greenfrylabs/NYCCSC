export const geoms = new Map([
  ["state", "State"],
  ["county", "County"],
  ["basin", "Basin"],
  //["stn", "Station"]
]);

export let seasons = new Map([
  [
    "ANN",
    {
      title: "Annual",
      interval: [1],
      duration: 1,
      maxmissing: 30
    }
  ],
  [
    "MAM",
    {
      title: "Spring",
      interval: [1, 0],
      duration: 3,
      maxmissing: 10,
      smonth: 5
    }
  ],
  [
    "JJA",
    {
      title: "Summer",
      interval: [1, 0],
      duration: 3,
      maxmissing: 10,
      smonth: 8
    }
  ],
  [
    "SON",
    {
      title: "Fall",
      interval: [1, 0],
      duration: 3,
      maxmissing: 10,
      smonth: 11
    }
  ],
  [
    "DJF",
    {
      title: "Winter",
      interval: [1, 0],
      duration: 3,
      maxmissing: 10,
      smonth: 2
    }
  ],
]);

export let elems = new Map([
  // StnPrcp
  [
    "PRCPTOT",
    {
      label: "Total Precipitation",
      yLabel: "Precipitation (Inch)",
      ttUnits: '"',
      obs_variable_name: "pcpn"
    }
  ],
  /*
  [
    "snow",
    {
      label: "Total Snowfall",
      yLabel: "Snowfall (Inch)",
      ttUnits: '"',
      maxmissingAnnual: 12,
      maxmissingSeasonal: 3,
      maxmissingMonthly: 1,
      acis: { vX: 10, vN: 0, reduce: "sum" }
    }
  ],
  [
    "snwd",
    {
      label: "Maximum Daily Snowdepth",
      yLabel: "Snowdepth (Inch)",
      ttUnits: '"',
      maxmissingAnnual: 12,
      maxmissingSeasonal: 3,
      maxmissingMonthly: 1,
      acis: { vX: 11, vN: 0, reduce: "max" }
    }
  ],
  */
  // StnTemp
  [
    "TX",
    {
      label: "Maximum Temperature",
      yLabel: "Temperature °F",
      ttUnits: "°F",
      obs_variable_name: "maxt"
    }
  ],
  [
    "TN",
    {
      label: "Minimum Temperature",
      yLabel: "Temperature °F",
      ttUnits: "°F",
      obs_variable_name: "mint"
    }
  ],
  [
    "TG",
    {
      label: "Average Temperature",
      yLabel: "Temperature °F",
      ttUnits: "°F",
      obs_variable_name: 'avgt',
    }
  ],
  [
    "GD",
    {
      label: "Growing Degree-Day Accumulation",
      yLabel: "Degree-Day °F",
      ttUnits: "°F",
      obs_variable_name: "gdd50"
    }
  ],
  [
    "HD",
    {
      label: "Heating Degree-Day Accumulation",
      yLabel: "Degree-Day °F",
      ttUnits: "°F",
      obs_variable_name: "hdd65"
    }
  ],
  [
    "CD",
    {
      label: "Cooling Degree-Day Accumulation",
      yLabel: "Degree-Day °F",
      ttUnits: "°F",
      obs_variable_name: "cdd65"
    }
  ],
  // StnTDays
  [
    "TX90F",
    {
      label: "Days with Maximum Temperature Above 90°F",
      yLabel: "Days",
      ttUnits: "",
      obs_variable_name: "tx90"
    }
  ],
  [
    "TX95F",
    {
      label: "Days with Maximum Temperature Above 95°F",
      yLabel: "Days",
      ttUnits: "",
      obs_variable_name: "tx95"
    }
  ],
  [
    "TX100F",
    {
      label: "Days with Maximum Temperature Above 100°F",
      yLabel: "Days",
      ttUnits: "",
      obs_variable_name: "tx100",
    }
  ],
  [
    "TN0F",
    {
      label: "Days with Minimum Temperature Below 0°F",
      yLabel: "Days",
      ttUnits: "",
      obs_variable_name: "tn0",
    }
  ],
  [
    "TN32F",
    {
      label: "Days with Minimum Temperature Below 32°F",
      yLabel: "Days",
      ttUnits: "",
      obs_variable_name: "tn32"
    }
  ],
  // StnPDays
  [
    "R1in",
    {
      label: 'Days with Precipitation > 1"',
      yLabel: "Days",
      ttUnits: "",
      obs_variable_name: "pcpn_1",
    }
  ],
  [
    "R2in",
    {
      label: 'Days with Precipitation > 2"',
      yLabel: "Days",
      ttUnits: "",
      obs_variable_name: "pcpn_2",
    }
  ],
  [
    "R4in",
    {
      label: 'Days with Precipitation > 4"',
      yLabel: "Days",
      ttUnits: "",
      obs_variable_name: "pcpn_4",
    }
  ]
]);

// "elems":[{"name":"maxt","interval":[1,0,0],"duration":"std","season_start":"07-30","reduce":"run_gt_40"}]}

export function buildQuery(params, meta) {
  const season = seasons.get(params.season);
  const elem = elems.get(params.element);

  return {
    'projected': {
      'area_type': (params.geom === 'state' ? 'county' : params.geom),
      'season': season.title,
      'variable_name': params.element,
    },
    'observed': {
      'area_type': (params.geom === 'state' ? 'county' : params.geom),
      'season': params.season,
      'variable_name': elem.obs_variable_name
    }
  };
}

export function parseURL(pStr) {
  let pFields = pStr.split("/");
  return {
    chart: pFields[0].split("=")[1],
    geom: pFields[1],
    element: pFields[2],
    season: pFields[3],
    sid: pFields[4],
    bbox: pFields[5]
  };
}

export function correctParam(param) {
  return param;
  /*
  let { chart, geom, element, season, sid, bbox } = param;

  let sane = true;
  if (["stn", "state", "county", "basin"].indexOf(geom) === -1) {
    geom = "state";
    sane = false;
  }
  if (!chartDefs.has(chart)) {
    chart = "Temp";
    sane = false;
  }
  let def = chartDefs.get(chart);

  if (geom === "stn") {
    if (def.elems.indexOf(element) === -1) {
      element = def.elems[0];
      sane = false;
    }
    if (element === "grow_32") {
      if (season !== "ANN") {
        season = "ANN";
        sane = false;
      }
    }
  } else {
    if (def.gElems.length === 0) {
      chart = "Temp";
      def = chartDefs.get(chart);
      sane = false;
    }
    if (def.gElems.indexOf(element) === -1) {
      element = def.gElems[0];
      sane = false;
    }
  }
  if (def.seasons.indexOf(season) === -1) {
    season = def.seasons[0];
    sane = false;
  }
  if (sane) return param;
  return { chart, geom, element, season, sid, bbox };
  */
}

export function updateSid(param, prevParam, geoms) {
  let { sid, geom } = param;
  const nGeom = geoms[geom];

  if (!prevParam) {
    if (nGeom && nGeom.ready)
      sid = nGeom.meta.has(sid) ? sid : defaultSids[geom];
    else sid = "";
  } else {
    const pGeom = geoms[prevParam.geom];
    if (pGeom && pGeom.ready && nGeom && nGeom.ready) {
      if (geom !== prevParam.geom)
        sid = nGeom.meta.has(sid) ? sid : defaultSids[geom];
    } else sid = "";
  }

  if (sid === param.sid) return param;
  return { ...param, sid };
}

export const defaultSids = {
  state: "MA",
  county: "Suffolk",
  basin: "Boston Harbor"
};

// export function haveSameResults(p1, p2) {
//   if (!p2) return false;
//   const { chart, geom, element, season, sid } = p1;
//   if (p2.chart !== chart) return false;
//   if (p2.geom !== geom) return false;
//   if (p2.element !== element) return false;
//   if (p2.season !== season) return false;
//   if (geom === "stn" && p2.sid !== sid) return false;
//   return true;
// }

const allSeasons = [...seasons.keys()];
/*
  TG - Average Temperature (Fahrenheit)\
  TX - Maximum Temperature (Fahrenheit)\
  TN - Minimum Temperature (Fahrenheit)\

  Degree Day Accumulation
  HD - Heating Degree-Day Accumulation (Degree-Day Fahrenheit)\
  CD - Cooling Degree-Day Accumulation (Degree-Day Fahrenheit)\
  GD - Growing Degree-Day Accumulation (Degree-Day Fahrenheit)\

  Days Above Temp
  TX90F   - Days with Maximum Temperature above 90F (Days)\
  TX95F   - Days with Maximum Temperature above 95F (Days)\
  TX100F - Days with Maximum Temperature above 100F (Days)\

  Days Below Temp
  TN0F     - Days with Minimum Temperature below 0F (Days)\
  TN32F   - Days with Minimum Temperature below 32F (Days)\

  Total Precip (Projected / Observed)
  PRCPTOT - Total Precipitation (Inches)\
  NO SNOWFALL  NUMBERS

  Total Extreme Precip Events
  R1in - Days with Precipitation > 1\'94 (Days)\
  R2in - Days with Precipitation > 2\'94 (Days)\
  R4in - Days with Precipitation > 4\'94 (Days)\

  Snow Layer
  NO SNOWFALL  NUMBERS
*/

export const chartDefs = new Map([
  [
    "Temp",
    {
      title: "Temp",
      elems: [
        "TG", // Average Temp
        "TN", // Min Temp
        "TX", // Max Temp
        "HD", // - Heating Degree-Day Accumulation (Degree-Day Fahrenheit)\
        "CD", // - Cooling Degree-Day Accumulation (Degree-Day Fahrenheit)\
        "GD", // - Growing Degree-Day Accumulation (Degree-Day Fahrenheit)\
        "TX90F", //   - Days with Maximum Temperature above 90F (Days)\
        "TX95F", //   - Days with Maximum Temperature above 95F (Days)\
        "TX100F", // - Days with Maximum Temperature above 100F (Days)\
        "TN0F", //     - Days with Minimum Temperature below 0F (Days)\
        "TN32F", //   - Days with Minimum Temperature below 32F (Days)\
        "PRCPTOT", // - Total Precipitation (Inches)\
        "R1in", // - Days with Precipitation > 1\'94 (Days)\
        "R2in", // - Days with Precipitation > 2\'94 (Days)\
        "R4in", // - Days with Precipitation > 4\'94 (Days)\
      ],
      seasons: allSeasons
    }
  ]
]);

chartDefs.forEach((def, chart) => {
  // Look in Block.js (line 113)
  //def.gElems = def.elems.filter(e => elems.get(e).typeof elems.get(e).gYr !== "undefined");
  def.toString = p => {
    return [p.chart, p.geom, p.element, p.season, p.sid, p.bbox].join("/");
  };
});
