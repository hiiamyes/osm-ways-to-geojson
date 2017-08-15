var axios = require("axios");
var querystring = require("querystring");
var osmtogeojson = require("osmtogeojson");
var ways = require("./ways");

const query = `
[out:json];
  way(343699265);
(._;>;);
out;
`;

async function transform() {
//   const { data } = await axios.post(
//     "http://overpass-api.de/api/interpreter",
//     querystring.stringify({ data: query })
//   );

let result= [];
ways.forEach(w => {
    const { data } = await axios.post(
        "http://overpass-api.de/api/interpreter",
        querystring.stringify({ data: query })
      );
      const startIndex = data.elements.findIndex(n => n.id === w.start);
      const endIndex = data.elements.findIndex(n => n.id === w.end);
      result.concat(data.elements
      .slice(startIndex, endIndex + 1)
      .map(n => [n.lon, n.lat]))
})

//   const start = 3504999313;
//   const end = 3504999316;
//   const startIndex = data.elements.findIndex(n => n.id === start);
//   const endIndex = data.elements.findIndex(n => n.id === end);

//   console.log(
//     JSON.stringify({
//       type: "LineString",
//       coordinates: data.elements
//         .slice(startIndex, endIndex + 1)
//         .map(n => [n.lon, n.lat])
//     })
//   );

console.log(
    JSON.stringify({
      type: "LineString",
      coordinates: result
    })
  );
}

transform();
