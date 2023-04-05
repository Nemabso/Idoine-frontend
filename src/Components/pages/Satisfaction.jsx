import React, { useEffect, useState } from 'react';
import CircleP from '../CircleP';
import "./satisfaction.css";
import { GrUser } from "react-icons/gr";
import { MdPersonSearch, MdDone } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import axios from 'axios';

export default function Satisfaction() {
    const [employerRate, setEmployerRate] = useState(0);
    const [poleEmploiRate, setPoleEmploiRate] = useState(0);
    const [learnerRate, setLearnerRate] = useState(0);
    const mainColour = "#0b346c";

    function sortReviews(data) {
        const sortedReviews = {employer: [], poleEmploi: [], learner: []};
        data.forEach(review => {
            sortedReviews[review.type].push(review);
        });
        return sortedReviews;
    }

    useEffect(() => {
        axios.get("http://localhost:5000/api/review")
            .then((res) => {
                const sortedReviews = sortReviews(res.data);
                console.log(sortedReviews);
                setEmployerRate(Math.floor(sortedReviews.employer.reduce((sum, avis) => sum + avis.rate, 0) / sortedReviews.employer.length * 20));
                setPoleEmploiRate(Math.floor(sortedReviews.poleEmploi.reduce((sum, avis) => sum + avis.rate, 0) / sortedReviews.poleEmploi.length * 20));
                setLearnerRate(Math.floor(sortedReviews.learner.reduce((sum, avis) => sum + avis.rate, 0) / sortedReviews.learner.length * 20));
            })
            .catch((err) => {
                console.log(err);
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
                            <h3 className='avis-label'>Satisfaction<br />Pôle Emploi</h3>
                            <CircleP percentage={poleEmploiRate} colour={mainColour}/>
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
