import React, { useEffect, useState } from 'react';
import CircleP from '../CircleP';
import "./satisfaction.css";
import { GrUser } from "react-icons/gr";
import { MdPersonSearch, MdDone } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import axios from 'axios';


export default function Satisfaction() {
    const [noteEmployeur, setNoteEmployeur] = useState(0);
    const [notePoleEmploi, setNotePoleEmploi] = useState(0);
    const [noteApprenant, setNoteApprenant] = useState(0);
    const mainColour = "#0b346c";

    useEffect(() => {
        axios.get("http://localhost:5000/api/review")
            .then((res) => {
                console.log(res.data);
                setNoteEmployeur(res.data.reduce((sum, avis) => sum + avis.rate, 0) / res.data.length * 20);
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
                            <CircleP className="avis-circle" percentage={noteEmployeur} colour={mainColour} />
                        </div>
                        <div className='avis-cards'>
                            <div>
                                <MdDone fill='#0B346C' size={25} />
                                <MdPersonSearch fill='#0B346C' size={50} />
                            </div>
                            <h3 className='avis-label'>Satisfaction<br />Pôle Emploi</h3>
                            <CircleP percentage={0} colour={mainColour}/>
                        </div>
                        <div className='avis-cards'>
                            <FaThumbsUp fill='#0B346C' size={50} />
                            <h3 className='avis-label'>Satisfaction<br />des apprenants</h3>
                            <CircleP percentage={0} colour={mainColour} />
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
