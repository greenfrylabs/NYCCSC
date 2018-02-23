import axios from "axios";

const protocol = window.location.protocol;

export const fetchStationData = params => {
  return axios
    .post(`${protocol}//data.nrcc.rcc-acis.org/StnData`, params)
    .then(res => res)
    .catch(err => console.log("Failed to load station data", err));
};

export const fetchGridData = async queryArr => {
  const url = `${protocol}//grid2.rcc-acis.org/GridData`;

  // observed
  const observedP = axios.post(url, queryArr[0]);

  // rcp45
  const min45P = axios.post(url, queryArr[1]);
  const mean45P = axios.post(url, queryArr[2]);
  const max45P = axios.post(url, queryArr[3]);

  // rcp85
  const min85P = axios.post(url, queryArr[4]);
  const mean85P = axios.post(url, queryArr[5]);
  const max85P = axios.post(url, queryArr[6]);

  const [
    observed,
    min45,
    mean45,
    max45,
    min85,
    mean85,
    max85
  ] = await Promise.all([
    observedP,
    min45P,
    mean45P,
    max45P,
    min85P,
    mean85P,
    max85P
  ]);
  return {
    observed,
    min45,
    mean45,
    max45,
    min85,
    mean85,
    max85
  };
};
