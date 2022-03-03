import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GrossDomesticProduct from './gross_domestic_product';
import Unemployment from './unemployment';
import Inflation from './inflation';

export default function EconomicPlatform() {

    const [state, setState] = useState(false); //we begin with a false state so the button renders 

    let history = useHistory();

    const returnHome = () => {
        history.push("/")
    }

    return (
        <div className='platform-container'>
            <div className='about-me'>
                <a href="https://www.linkedin.com/in/jacky-chen6825/" target="_blank"><i className="fab fa-linkedin fa-2x"></i></a>
                <a href="https://github.com/jackychen6825" target="_blank"><i className="fab fa-github-alt fa-2x"></i></a>
                <a href="https://angel.co/u/jacky-chen-33" target="_blank"><i className="fab fa-angellist fa-2x"></i></a>
            </div>
            <div className='warning'>
                Hello, due to API  restrictions, users must wait one minute between searchs and races. Thanks!
            </div>

            <div className="economic-btn-container">
                <button onClick={returnHome} className='return-home-btn-econ'>Return Home</button>
            </div>

            <div className='show-economics-btn-container'>
                {state ? "" : <button 
                    className='show-economics-btn'
                    onClick={() => setState(state => !state)}
                >Show Economic Data</button>}
            </div>

            <div className='economic-charts-container'>
                {state ? <GrossDomesticProduct /> : ""}
                {state ? <Unemployment /> : ""}
                {state ? <Inflation /> : ""}
            </div>
        </div>
    )
}