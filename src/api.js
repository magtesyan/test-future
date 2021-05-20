import {
  BIG_DATA_COUNT,
  BIG_DATA_LOADING_DELAY,
  DATA_TYPES,
  DATA_URL,
  SMALL_DATA_COUNT,
} from './const.js';

const addParamsToUrl = (dataType) => {
  let sendingUrl = DATA_URL;
  switch (dataType) {
    case DATA_TYPES[1]:
      sendingUrl += `&rows=${BIG_DATA_COUNT}&delay=${BIG_DATA_LOADING_DELAY}`
      break;
    default:
      sendingUrl += `&rows=${SMALL_DATA_COUNT}`
  }
  return sendingUrl;
}

const getData = async (dataType) => {
  const url = addParamsToUrl(dataType);
  const res = await fetch(url);
  return res.ok ? await res.json() : `Error ${res.status}`;
};

export { getData }