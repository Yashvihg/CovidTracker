const fetch = require("node-fetch");

async function getData() {
  const apidata = await (
    await fetch("http://api.covid19api.com/summary")
  ).json();
  return {
    deaths: apidata.Global.TotalDeaths,
    confirmed: apidata.Global.TotalConfirmed,
    recover: apidata.Global.TotalRecovered,
    active: apidata.Global.NewConfirmed,
  };
}
async function getTable() {
  const apidata = await (
    await fetch("https://api.covid19india.org/state_district_wise.json")
  ).json();
  return { ...apidata };
}
module.exports = {
  getData: getData,
  getTable: getTable,
};
