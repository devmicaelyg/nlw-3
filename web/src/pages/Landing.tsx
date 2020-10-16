import React from 'react';
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import LogoImg from '../images/Logo.svg';

const Landing = () => {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={LogoImg} alt="Happy" />

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite casas de repouso e mude o dia de muitos idosos.</p>
                </main>

                <div className="location">
                    <strong>Santa Teresa</strong>
                    <span> Espirito Santo</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    );
}

export default Landing;