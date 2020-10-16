import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/Map.svg';

import '../styles/pages/map.css';
import happyMapIcon from '../utils/mapIcons';
import api from '../services/api';

interface Casarepouso {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const Mapper = () => {
  const [casasrepouso, setCasasrepouso] = useState<Casarepouso[]>([]);

  useEffect(() => {
    api.get('casasrepouso').then(response => {
      setCasasrepouso(response.data)
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha uma casa de repouso no mapa</h2>
          <p>Muitos idosos estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Santa Teresa</strong>
          <span> Espirito Santo</span>
        </footer>
      </aside>

      <Map
        center={[-19.7401693, -40.6618112]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

      {casasrepouso.map(casarepouso => {
        return(
          <Marker
          icon={happyMapIcon}
          position={[casarepouso.latitude, casarepouso.longitude]}
          key={casarepouso.id}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            {casarepouso.name}
                    <Link to={`/orphanages/${casarepouso.id}`}>
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      )})}
      </Map>

      <Link to="/create" className="create-casaDeRepouso">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default Mapper;
