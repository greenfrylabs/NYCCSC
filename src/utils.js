let turf = require('@turf/turf');

export const isEquivalent = (a, b) => {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
};

export const transformToGeoJSON = res => {
  const out = { type: "FeatureCollection" };
  out.features = res.meta.map(f => {
    let bbox = [];
    let geometry = {};
    if (f.geojson.geometry) {
        bbox = turf.bbox(f.geojson.geometry); //f.bbox
        geometry = f.geojson.geometry;
    } else {
        bbox = turf.bbox(f.geojson); //f.bbox
        geometry = f.geojson
    }

    return {
      type: "Feature",
      id: f.id,
      properties: {
        name: f.name,
        id: f.id,
        bbox: bbox
      },
      geometry: geometry
    };
  });
  return out;
};

export const foldm = (r, j) =>
  r.reduce((a, b, i, g) => (!(i % j) ? a.concat([g.slice(i, i + j)]) : a), []);

export const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
