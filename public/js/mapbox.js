/*eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoic3ViaGFzaDYxIiwiYSI6ImNraG0zczV4MDBib2Yyd3Q0Y3YwcXpoZWEifQ.Jf7d1bbsm4NP-EGBe35j_Q ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/subhash61/ckhm55i7w0nvm1apaz12xstav',
  scrollZoom: false,
  // center: [-118.202377, 34.112523],
  // zoom: 10,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  //Create a marker
  const el = document.createElement('div');
  el.className = 'marker';

  //Add a marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //Add a popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p> Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  //Extend map bounds to include current Location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
