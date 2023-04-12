import axios from 'axios';
import React, { useState } from 'react';
import StarRating from '../StarRating';
import { Col, Row } from 'react-bootstrap';
import "./ReviewForm.css";
import { useNavigate } from 'react-router-dom';

export default function ReviewForm({throwMessages}) {
    const reviewInitialState = { name: "", companyName: "", position: "", email: "", comment: "", rate: 3 };
    const [review, setReview] = useState(reviewInitialState);
    const [errorList, setErrorList] = useState([]);
    const navigate = useNavigate();

    const handleChanges = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReview({ ...review, [name]: value })
    }

    const setRate = ({ currentTarget }) => {
        setReview({ ...review, rate: currentTarget.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorList([]);
        axios.post('http://localhost:5000/api/review/submit', {review: review})
            .then((res) => {
                saveReview(prompt("Veuillez entrer le mot de passe fourni par Idoine Formation"))
            })
            .catch((err) => {
                displayErrors(err.response.data.errors);
            })
    }

    const saveReview = (password) => {
        setErrorList([]);
        axios.post('http://localhost:5000/api/review/create', {review: review, password: password})
            .then((res) => {
                console.log(res);
                setReview(reviewInitialState);
                throwMessages(["Formulaire envoyé avec succès. Merci pour votre avis !"]);
                navigate("/");
            })
            .catch((err) => {
                displayErrors(err.response.data.errors);
            })
    }

    const displayErrors = (errors) => {
        setErrorList([...Object.keys(errors).map((key) => errors[key].message)]);
    }

    return (
        <>
            <h1 className='p-3 text-center'>Laissez nos votre avis !</h1>
            <Row className='d-flex justify-content-center'>
                <Col className='p-3'>
                    <form onSubmit={handleSubmit} className='container p-3 rounded bg-light'>
                        {errorList.length !== 0 && errorList.map(error => <p className='form-error' key={error}>{error}</p>)}
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
                                <label htmlFor="comment" className="form-label">Donnez votre avis</label>
                                <textarea className="form-control" spellCheck="true" name='comment' id="comment" placeholder='votre avis... (10 caractères minimum)*' required onChange={handleChanges} rows="3" />
                            </div>
                            <div className='d-flex flex-wrap justify-content-between align-items-center'>
                                <div><StarRating rating={review.rate} setRating={setRate} /></div>
                                <div className='p-3'><button className="btn btn-primary" type="submit">Envoyer</button></div>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    )
}
