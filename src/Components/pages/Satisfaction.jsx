import React, { useEffect, useState } from 'react';
import CircleP from '../CircleP';
import "./satisfaction.css";
import { GrUser } from "react-icons/gr";
import { MdPersonSearch, MdDone } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import axios from 'axios';
import config from '../../config';

export default function Satisfaction() {
    const [employerRate, setEmployerRate] = useState(0);
    const [fundingRate, setFundingRate] = useState(0);
    const [learnerRate, setLearnerRate] = useState(0);
    const mainColour = "#0b346c";

    useEffect(() => {
        axios.get(`${config.apiBaseUrl}/review/getStats`)
            .then((res) => {
                const {learnerStats, employerStats, fundingStats} = {...res.data};
                setEmployerRate(typeof(employerStats) === 'number' ? Math.round(employerStats) : 0);
                setLearnerRate(typeof(learnerStats) === 'number' ? Math.round(learnerStats) : 0);
                setFundingRate(typeof(fundingStats) === 'number' ? Math.round(fundingStats) : 0);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className='avis-background-img'>
                <div className='avis-wrapper'>
                    <h1>STATISTIQUES DE SATISFACTION</h1>
                    <section className='avis-pannel'>
                        <div className='avis-cards'>
                            <GrUser fill='#0B346C' size={50} />
                            <h3 className='avis-label'>Satisfaction<br />des employeurs</h3>
                            <CircleP className="avis-circle" percentage={employerRate} colour={mainColour} />
                        </div>
                        <div className='avis-cards'>
                            <div>
                                <MdDone fill='#0B346C' size={25} />
                                <MdPersonSearch fill='#0B346C' size={50} />
                            </div>
                            <h3 className='avis-label'>Satisfaction<br />des partenaires</h3>
                            <CircleP percentage={fundingRate} colour={mainColour}/>
                        </div>
                        <div className='avis-cards'>
                            <FaThumbsUp fill='#0B346C' size={50} />
                            <h3 className='avis-label'>Satisfaction<br />des apprenants</h3>
                            <CircleP percentage={learnerRate} colour={mainColour} />
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
