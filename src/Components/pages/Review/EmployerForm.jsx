import axios from 'axios';
import React, { useState } from 'react';
import StarRating from '../../formInputs/StarRating';
import { Col, Row } from 'react-bootstrap';
import "./ReviewForm.css";
import { useNavigate } from 'react-router-dom';
import TextInput from '../../formInputs/TextInput';
import TextArea from '../../formInputs/TextArea';
import Mcq from '../../formInputs/Mcq';

export default function EmployerForm({throwMsg}) {
    const mcq = [
        {label: "Vos collaborateurs avaient-ils besoin de suivre cette formation pour acquérir de nouvelles compétences ?", options: ["Oui", "Non", "Je ne sais pas"]},
        {label: "La formation choisie semblait-elle répondre à son besoin ?", options: ["Oui, parfaitement", "Oui, partiellement", "Non", "Je ne sais pas"]},
        {label: "Qui était à l'initiative de cette formation ?", options: ["Vous-même", "Votre collaborateur", "Vous et votre collaborateur"]},
        {label: "Depuis la fin de la formation, votre collaborateur a-t-il pu mettre en pratique les connaissances acquises ?", options: ["Oui", "Oui, partiellement", "Non"]},
        {label: "A l'issue de la formation, avez-vous eu un entretien avec votre collaborateur pour faire le point sur l'apport de la formation ?", options: ["Oui", "Non"]}
    ]

    const reviewInitialState = { writerName: "", company: "", service: "", place: "", startDate: "", endDate: "", duration: "", 
        mcq: [], needAnsweredComment: "", practiceFrequencyComment: "", learnerComment: "",
        rate: 3};

    mcq.forEach((question) => {
        reviewInitialState.mcq.push({label: question.label, answer: ""});
    })

    const [review, setReview] = useState(reviewInitialState);
    const [errorList, setErrorList] = useState([]);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReview({ ...review, [name]: value })
    }

    const handleMcqChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        const index = review.mcq.findIndex((question) => question.label === name);
        const updatedMcq = [...review.mcq];
        updatedMcq[index].answer = value;
        setReview({ ...review, mcq: updatedMcq })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorList([]);
        axios.post('http://localhost:5000/api/review/submit', {review: review, type: "funding"})
            .then((res) => {
                saveReview(prompt("Veuillez entrer le mot de passe fourni par Idoine Formation"))
            })
            .catch((err) => {
                displayErrors(err.response.data.errors);
            })
    }

    const saveReview = (password) => {
        setErrorList([]);
        axios.post('http://localhost:5000/api/review/create', {review: review, type: "funding", password: password})
            .then((res) => {
                setReview(reviewInitialState);
                throwMsg(["Formulaire envoyé avec succès. Merci pour votre avis !"]);
                navigate("/");
            })
            .catch((err) => {
                if(typeof err.response.data === "string") setErrorList([err.response.data]);
                else displayErrors(err.response.data.errors);
            })
            .finally(() => window.scrollTo(0, 0));
    }

    const displayErrors = (errors) => {
        setErrorList([...Object.keys(errors).map((key) => errors[key].message)]);
    }

    return (
        <>
            <Row className='d-flex justify-content-center'>
                <Col className='p-3'>
                    <form onSubmit={handleSubmit} className='container p-3 rounded bg-light'>
                        <h2 className='p-3 text-center'>Formulaire Employeurs</h2>
                        {errorList.length !== 0 && errorList.map(error => <p className='form-error' key={error}>{error}</p>)}
                        <div className='p-4'>
                            <TextInput {... {name: 'writerName', label: 'Votre NOM et Prénom', placeholder: 'NOM et Prénom', handleChanges: handleChange, value: review.writerName, isRequired: true}} />
                            <TextInput {... {name: 'company', label: 'Nom de votre entreprise', placeholder: 'Entreprise', handleChanges: handleChange, value: review.company, isRequired: true}} />
                            <TextInput {... {name: 'service', label: 'Nom du service concerné', placeholder: 'Service', handleChanges: handleChange, value: review.service, isRequired: true}} />
                            <TextInput {... {name: 'place', label: 'Lieu de la formation', placeholder: 'Lieu de la formation', handleChanges: handleChange, value: review.place, isRequired: true}} />
                            <div className='mb-3'>
                                <label htmlFor='startDate' className="form-label">Date de début de la formation :</label><br/>
                                <input type='date' name='startDate' value={review.startDate} onChange={handleChange} max={review.endDate} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='endDate' className="form-label">Date de fin de la formation :</label><br/>
                                <input type='date' name='endDate' value={review.endDate} onChange={handleChange} min={review.startDate} />
                            </div>
                            <TextInput {... {name: 'duration', label: 'Durée de la formation (en heures)', placeholder: 'Durée de la formation', handleChanges: handleChange, value: review.duration, isRequired: true}} />
                            <Mcq handleChanges={handleMcqChange} {...mcq[0]} />
                            {/* {review.rates.map(({label, rate, comment}) => 
                                <div key={label}>
                                    <StarRating {...{rating: rate, setRating: handleRateChange, name: label, label: label}} />
                                    <TextArea {...{name: label, label: 'Si non ou partiellement, pourquoi ?', placeholder: 'Vos remarques', handleChanges: handleCommentChange, value: comment, isRequired: false}}/>
                                </div>
                            )} */}
                            <button className="btn btn-primary" type="submit">Envoyer</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    )
}
