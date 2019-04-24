import axios from "axios";

const protocol = window.location.protocol;

export const fetchStationData = params => {
  return axios
    .post(`${protocol}//data.nrcc.rcc-acis.org/StnData`, params)
    .then(res => res)
    .catch(err => console.log("Failed to load station data", err));
};

export const fetchGridData = async params => {
  //https://repository.nescaum-ccsc-dataservices.com/umass/5yr/?variable_name=TX95F&area_type=county&season=Winter
  const url = "https://repository.nescaum-ccsc-dataservices.com/umass/5yr";
  /*
  const params = {
    area_type: '',
    variable_name: '',
    season: ''
  };
  */
  const req = axios.get(url, {params: params});

  console.error("Need to get observed data still....");

  const [
    resp
  ] = await Promise.all([
    req
  ]);
  return resp;
};
