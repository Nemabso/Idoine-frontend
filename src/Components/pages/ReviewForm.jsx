import axios from 'axios';
import React, { useState } from 'react';
import StarRating from '../StarRating';
import Modal from "react-modal";
import { Col, Row } from 'react-bootstrap';

export default function ReviewForm() {
    const [review, setReview] = useState({ name: "", companyName: "", position: "", email: "", comment: "", rate: 0 });

    const handleChanges = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReview({ ...review, [name]: value })
    }

    const setRate = ({ currentTarget }) => {
        setReview({ ...review, rate: currentTarget.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(review);
        axios.post('http://localhost:5000/api/review/create', review)
        .then((res) => {
            console.log(res)
        })
        .catch(({ response }) => {

        })
        // e.target.reset();
    }

    return (
        <>
            <h1 className='p-3 text-center'>Laissez nos votre avis !</h1>
            <Row className='d-flex justify-content-center'>
                <Col className='p-3'>
                    <form onSubmit={handleSubmit} className='container p-3 rounded bg-light'>
                        <div className='p-4'>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nom</label>
                                <input type="text" className="form-control" name='name' id="name" required onChange={handleChanges} value={review.name} placeholder="votre nom ...*" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="companyName" className="form-label">Societé</label>
                                <input type="text" className="form-control" name='companyName' id="companyName" required onChange={handleChanges} value={review.companyName} placeholder="Societé ...*" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postion" className="form-label">Fonction</label>
                                <input type="text" className="form-control" name='position' id="position" required onChange={handleChanges} placeholder="Fonction ...*" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Adresse email</label>
                                <input type="email" className="form-control" name='email' id="email" required onChange={handleChanges} placeholder="votre email ...*" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="comment" className="form-label">Donner votre avis</label>
                                <textarea className="form-control" spellCheck="true" name='comment' id="comment" placeholder='votre avis...*' required onChange={handleChanges} rows="3" />
                            </div>
                            <div className='d-flex flex-wrap justify-content-between align-items-center'>
                                <div><StarRating rating={review.rate} setRating={setRate} /></div>
                                <div className='p-3'><button className="btn btn-primary" type="submit">Envoyer</button></div>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>

            {/* <div>
                <Modal className="modal-signup rounded-pill bg-light col-5"
                    ariaHideApp={false} isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                    <h1>{massege}</h1>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>fermer</button>
                </Modal>
            </div> */}

        </>
    )
}
