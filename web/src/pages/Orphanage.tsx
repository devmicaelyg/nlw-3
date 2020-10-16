import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import api from "../services/api";
import '../styles/pages/orphanage.css';

import happyMapIcon from "../utils/mapIcons";


interface Casarepouso {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>
}

interface CasarepousoParams {
  id: string;
}


export default function Orphanage() {
  const params = useParams<CasarepousoParams>();
  const [casarepouso, setCasarepouso] = useState<Casarepouso>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`casasrepouso/${params.id}`).then(response => {
      setCasarepouso(response.data)
    })
  }, [params.id]);


  if (!casarepouso) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar></Sidebar>
      <main>
        <div className="orphanage-details">
          <img src={casarepouso.images[activeImageIndex].url} alt={casarepouso.name} />

          <div className="images">
            {casarepouso.images.map((image, index) => {
              return (
                <button key={image.id} className={activeImageIndex == index ? 'active' : ' '} type="button" onClick={() => { setActiveImageIndex(index) }}>
                <img src={image.url} alt={casarepouso.name} />
              </button>
              )
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{casarepouso.name}</h1>
            <p>{casarepouso.about}</p>

            <div className="map-container">
              <Map
                center={[casarepouso.latitude, casarepouso.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[casarepouso.latitude, casarepouso.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${casarepouso.latitude}, ${casarepouso.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{casarepouso.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {casarepouso.opening_hours}
              </div>
              {casarepouso.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>
              ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#ff669d" />
                Não atendemos <br />
                fim de semana
                  </div>
                )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
