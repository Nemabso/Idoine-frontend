import axios from 'axios';
import React, { useState } from 'react';
import StarRating from '../../formInputs/StarRating';
import { Col, Row } from 'react-bootstrap';
import "./ReviewForm.css";
import { useNavigate } from 'react-router-dom';
import TextInput from '../../formInputs/TextInput';
import TextArea from '../../formInputs/TextArea';

export default function FundingForm({throwMsg}) {
    const ratedQuestions = [
        "Selon vous, les dossiers de formation, transmis par notre organisme de formation, sont-ils conformes à vos attentes en terme de gestion administrative ? (ex: convention, programme, feuille d'émargement, facture...)",
        "Les informations retranscrites (ex: N° dossier, intitulé de formation, dates, noms des stagiaires...) dans les pièces justificatives (ex: facture, convention, ...) facilitent-elles le délai de règlement et de solde du dossier de formation de votre entreprise adhérente ?",
        "Le respect des engagements pris (ex: moyens matériels et humains de la formation, cohérence des objectifs et des contenus) est-il conforme à vos attentes ?",
    ];

    const reviewInitialState = { writerName: "", organization: "", position: "", telephone: "", email: "", rates: []};
    ratedQuestions.forEach((question) => {
        reviewInitialState.rates.push({label: question, rate: 3, comment: ""});
    });

    const [review, setReview] = useState(reviewInitialState);
    const [errorList, setErrorList] = useState([]);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReview({ ...review, [name]: value })
    }

    const handleRateChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        const index = review.rates.findIndex((question) => question.label === name);
        const updatedRates = [...review.rates];
        updatedRates[index].rate = Number(value);
        setReview({ ...review, rates: updatedRates })
    }

    const handleCommentChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        const index = review.rates.findIndex((question) => question.label === name);
        const updatedRates = [...review.rates];
        updatedRates[index].comment = value;
        setReview({ ...review, rates: updatedRates })
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
                        <h2 className='p-3 text-center'>Recueil appréciations<br/>Financeurs de formation</h2>
                        {errorList.length !== 0 && errorList.map(error => <p className='form-error' key={error}>{error}</p>)}
                        <p>Ce questionnaire a pour objectif de recueillir vos appréciations, en tant que financeur, 
                            quant à la qualité de notre prestation de service formation, en conformité avec le référentiel 
                            QUALOPI mentionné à l'article L.6316-3 du Code du Travail.</p>
                        <div className='p-4'>
                            <TextInput {... {name: 'writerName', label: 'Votre NOM et Prénom', placeholder: 'NOM et Prénom', handleChanges: handleChange, value: review.writerName, isRequired: true}} />
                            <TextInput {... {name: 'organization', label: 'Nom de votre organisation', placeholder: 'Organisation', handleChanges: handleChange, value: review.organization, isRequired: true}} />
                            <TextInput {... {name: 'position', label: 'Votre fonction', placeholder: 'Fonction', handleChanges: handleChange, value: review.position, isRequired: true}} />
                            <TextInput {... {name: 'telephone', label: 'Votre numéro de téléphone mobile', placeholder: 'N° téléphone', handleChanges: handleChange, value: review.telephone, isRequired: true}} />
                            <TextInput {... {name: 'email', label: 'Votre adresse e-mail', placeholder: 'Adresse e-mail', handleChanges: handleChange, value: review.email, isRequired: true}} />
                            {review.rates.map(({label, rate, comment}) => 
                                <div key={label}>
                                    <StarRating {...{rating: rate, setRating: handleRateChange, name: label, label: label}} />
                                    <TextArea {...{name: label, label: 'Si non ou partiellement, pourquoi ?', placeholder: 'Vos remarques', handleChanges: handleCommentChange, value: comment, isRequired: false}}/>
                                </div>
                            )}
                            <button className="btn btn-primary" type="submit">Envoyer</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    )
}
