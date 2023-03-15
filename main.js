import './style.css';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {Map, View} from 'ol';
import {Icon, Style} from 'ol/style.js';
import {fromLonLat} from 'ol/proj.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import Draw from 'ol/interaction/Draw.js';

const dirPath = './images/';
const mapPoints = [
  {
    point: fromLonLat([-85.3800, 38.7359]),
    image: 'Location Marker - OK State (Northwest).svg'
  },
  {
    point: fromLonLat([-85.391341, 38.787342]),
    image: 'Location Marker - Fault State (Northeast).svg'
  },
  {
    point: fromLonLat([-85.303049, 38.734335]),
    image: 'Location Cluster_OKState.svg'
  },
  {
    point: fromLonLat([-85.469336, 38.780919]),
    image: 'Location Marker - Fault State (North).svg'
  }
];

const source = new VectorSource({});

for(let idx = 0; idx < mapPoints.length; idx++) {
  const iconFeature = new Feature({
    geometry: new Point(mapPoints[idx].point),
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: dirPath + mapPoints[idx].image,
    }),
  });
  iconFeature.setStyle(iconStyle);
  source.addFeature(iconFeature);
}

const raster = new TileLayer({
  source: new OSM(),
});


const vector = new VectorLayer({
  source: source,
});


const map = new Map({
  target: 'map',
  layers: [
    raster,
    vector,
  ],
  view: new View({
    center: mapPoints[0].point,
    zoom: 12
  })
});

