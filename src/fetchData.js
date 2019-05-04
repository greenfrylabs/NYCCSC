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
  const observed_url = "https://repository.staging.nescaum-ccsc-dataservices.com/data/ma/datagrapher/observed_" + params.observed.variable_name + "_" + params.observed.season;

  return await Promise.all([
    axios.get(url, {params: params.projected}), // Projected
    axios.get(observed_url) // Observed
  ]);
};
