export const geoms = new Map([
  ["state", "State"],
  ["county", "County"],
  ["basin", "Basin"],
  ["stn", "Station"]
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
  [
    "Jan",
    {
      title: "January",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 1
    }
  ],
  [
    "Feb",
    {
      title: "February",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 2
    }
  ],
  [
    "Mar",
    {
      title: "March",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 3
    }
  ],
  [
    "Apr",
    {
      title: "April",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 4
    }
  ],
  [
    "May",
    {
      title: "May",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 5
    }
  ],
  [
    "Jun",
    {
      title: "June",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 6
    }
  ],
  [
    "Jul",
    {
      title: "July",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 7
    }
  ],
  [
    "Aug",
    {
      title: "August",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 8
    }
  ],
  [
    "Sep",
    {
      title: "September",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 9
    }
  ],
  [
    "Oct",
    {
      title: "October",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 10
    }
  ],
  [
    "Nov",
    {
      title: "November",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 11
    }
  ],
  [
    "Dec",
    {
      title: "December",
      interval: [1, 0],
      duration: 1,
      maxmissing: 3,
      smonth: 12
    }
  ]
]);

export let elems = new Map([
  // StnPrcp
  [
    "pcpn",
    {
      label: "Total Precipitation",
      yLabel: "Precipitation (Inch)",
      ttUnits: '"',
      maxmissingAnnual: 12,
      maxmissingSeasonal: 3,
      maxmissingMonthly: 1,
      acis: { vX: 4, vN: 0, reduce: "sum" },
      gYr: [1895, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 4, reduce: "sum", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
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
  // StnTemp
  [
    "maxt",
    {
      label: "Maximum Temperature",
      yLabel: "Temperature °F",
      ttUnits: "°F",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 1, vN: 0, reduce: "mean" },
      gYr: [1895, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 1, reduce: "mean", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "mean"
      }
    }
  ],
  [
    "mint",
    {
      label: "Minimum Temperature",
      yLabel: "Temperature °F",
      ttUnits: "°F",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 2, vN: 0, reduce: "mean" },
      gYr: [1895, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 2, reduce: "mean", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "mean"
      }
    }
  ],
  [
    "avgt",
    {
      label: "Average Temperature",
      yLabel: "Temperature °F",
      ttUnits: "°F",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 43, vN: 0, reduce: "mean" },
      gYr: [1895, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 43, reduce: "mean", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "mean"
      }
    }
  ],
  [
    "gdd50",
    {
      label: "Growing Degree-Day Accumulation",
      yLabel: "Degree-Day °F",
      ttUnits: "°F",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 44, vN: 0, base: 50, reduce: "sum" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 44, base: 50, reduce: "sum", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "hdd65",
    {
      label: "Heating Degree-Day Accumulation",
      yLabel: "Degree-Day °F",
      ttUnits: "°F",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 45, vN: 0, base: 65, reduce: "sum" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 45, base: 65, reduce: "sum", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "cdd65",
    {
      label: "Cooling Degree-Day Accumulation",
      yLabel: "Degree-Day °F",
      ttUnits: "°F",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 44, vN: 0, base: 65, reduce: "sum" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 44, base: 65, reduce: "sum", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  // StnTDays
  [
    "tx90",
    {
      label: "Days with Maximum Temperature Above 90°F",
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 1, vN: 0, reduce: "cnt_gt_90" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 1, reduce: "cnt_gt_90", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "tx95",
    {
      label: "Days with Maximum Temperature Above 95°F",
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 1, vN: 0, reduce: "cnt_gt_95" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 1, reduce: "cnt_gt_95", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "tx100",
    {
      label: "Days with Maximum Temperature Above 100°F",
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 1, vN: 0, reduce: "cnt_gt_100" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 1, reduce: "cnt_gt_100", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "tn0",
    {
      label: "Days with Minimum Temperature Below 0°F",
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 2, vN: 0, reduce: "cnt_lt_0" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 2, reduce: "cnt_lt_0", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "tn32",
    {
      label: "Days with Minimum Temperature Below 32°F",
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 6,
      maxmissingMonthly: 3,
      acis: { vX: 2, vN: 0, reduce: "cnt_lt_32" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 2, reduce: "cnt_lt_32", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  // StnPDays
  [
    "pcpn_1",
    {
      label: 'Days with Precipitation > 1"',
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 3,
      maxmissingMonthly: 1,
      acis: { vX: 4, vN: 0, reduce: "cnt_gt_1" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 4, reduce: "cnt_gt_1", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "pcpn_2",
    {
      label: 'Days with Precipitation > 2"',
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 3,
      maxmissingMonthly: 1,
      acis: { vX: 4, vN: 0, reduce: "cnt_gt_2" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 4, reduce: "cnt_gt_2", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "pcpn_4",
    {
      label: 'Days with Precipitation > 4"',
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 3,
      maxmissingMonthly: 1,
      acis: { vX: 4, vN: 0, reduce: "cnt_gt_4" },
      gYr: [1981, 2016],
      locaYr: [1950, 2099],
      season: {
        elem: { vX: 4, reduce: "cnt_gt_4", interval: [0, 1] },
        interval: [1, 0],
        duration: 3,
        reduce: "sum"
      }
    }
  ],
  [
    "snwd_1",
    {
      label: 'Days with Snow Depth > 1"',
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 3,
      maxmissingMonthly: 1,
      acis: { vX: 11, vN: 0, reduce: "cnt_gt_1" }
    }
  ],
  // StnFrost
  [
    "grow_32",
    {
      label: "Growing Season Length (above 32°F)",
      yLabel: "Days",
      ttUnits: "",
      maxmissingAnnual: 12,
      maxmissingSeasonal: 3,
      maxmissingMonthly: 1,
      acis: { vX: 2, vN: 0, reduce: { reduce: "run_gt_32", n: 1 } }
    }
  ]
]);

// "elems":[{"name":"maxt","interval":[1,0,0],"duration":"std","season_start":"07-30","reduce":"run_gt_40"}]}

export function buildQuery(params, meta) {
  // console.log(params, meta);
  const s = seasons.get(params.season);
  const e = elems.get(params.element);
  let p = {};
  let elem;
  if (s === "DJF" || s === "MAM" || s === "JJA" || s === "SON") {
    elem = e.season;
  } else {
    elem = { ...e.acis };
    elem.interval = s.interval;
  }

  if (params.geom === "stn") {
    p.edate = "por";
    p.sid = meta.properties.ghcn;
    p.sdate = s.smonth ? ["por", s.smonth] : ["por"];
    elem = { ...elem, ...e.acis };
  } else {
    switch (params.geom) {
      case "state":
        p.state = "pa,nj,nh,ma";
        // p.state = "ny";
        break;
      case "basin":
        p.state = "oh,nj,me";
        // p.state = "ny";
        break;
      default:
        p.state = "ny";
    }
    p.grid = `livneh`;
    p.sdate = s.smonth ? [e.locaYr[0], s.smonth] : [e.locaYr[0]];
    p.edate = s.smonth ? [e.locaYr[1], s.smonth] : [e.locaYr[1]];
    if (params.season === "DJF") p.sdate[0]++; // winter will start before POR
    elem.area_reduce = params.geom + "_mean";
  }

  p.elems = [elem];
  // console.log(p);
  return p;
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

const defaultSids = {
  stn: "USH00300042",
  state: "NY",
  county: "36001",
  basin: "02020006"
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

export const chartDefs = new Map([
  [
    "Temp",
    {
      title: "Temp",
      elems: [
        "maxt",
        "mint",
        "avgt",
        "gdd50",
        "hdd65",
        "cdd65",
        "tx90",
        "tx95",
        "tx100",
        "tn0",
        "tn32",
        "grow_32",
        "pcpn",
        "snow",
        "snwd",
        "pcpn_1",
        "pcpn_2",
        "pcpn_4",
        "snwd_1"
      ],
      seasons: allSeasons
    }
  ],
  [
    "Prcp",
    {
      title: "Prcp",
      elems: [
        "maxt",
        "mint",
        "avgt",
        "gdd50",
        "hdd65",
        "cdd65",
        "tx90",
        "tx95",
        "tx100",
        "tn0",
        "tn32",
        "grow_32",
        "pcpn",
        "snow",
        "snwd",
        "pcpn_1",
        "pcpn_2",
        "pcpn_4",
        "snwd_1"
      ],
      seasons: allSeasons
    }
  ]
]);

chartDefs.forEach((def, chart) => {
  def.gElems = def.elems.filter(e => typeof elems.get(e).gYr !== "undefined");
  def.toString = p => {
    return [p.chart, p.geom, p.element, p.season, p.sid, p.bbox].join("/");
  };
});
