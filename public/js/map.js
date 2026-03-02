

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});
console.log(coordinates);

const marker = new mapboxgl.Marker({color: "black"})
        .setLngLat(coordinates) //listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        
        .setHTML(`<p>exact location will be provided after booking</p>`))
        .addTo(map);
