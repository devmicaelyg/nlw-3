import React from 'react';

import mapMarkerImg from '../images/Map.svg';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import '../styles/pages/map.css';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const Mapper = () => {
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
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default Mapper;