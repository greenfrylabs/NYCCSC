import axios from "axios";

const protocol = window.location.protocol;

export const fetchStationData = params => {
  return axios
    .post(`${protocol}//data.nrcc.rcc-acis.org/StnData`, params)
    .then(res => res)
    .catch(err => console.log("Failed to load station data", err));
};

export const fetchGridData = () => {
  return;
};
