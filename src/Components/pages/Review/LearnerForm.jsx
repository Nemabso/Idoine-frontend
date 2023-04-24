import axios from 'axios';
import React, { useState } from 'react';
import StarRating from '../../formInputs/StarRating';
import { Col, Row } from 'react-bootstrap';
import "./ReviewForm.css";
import { useNavigate } from 'react-router-dom';
import TextInput from '../../formInputs/TextInput';
import TextArea from '../../formInputs/TextArea';

export default function LearnerForm({throwMessages}) {
    const ratedQuestions = [
        "Les relations avec le personnel d’Idoine Formation ont été conviviales et professionnelles ?",
        "Les conditions de travail étaient-elles favorables au bon déroulement de la formation ?",
        "Les outils d’animation de la formation vous ont-ils permis de retenir les points essentiels ?",
        "Le rythme de travail vous convenait-il ?",
        "Le formateur s’est-il montré à l’écoute de vos questions ?",
        "Le formateur maîtrisait-il son domaine d’intervention ?",
        "Le formateur a-t-il su favoriser les échanges au sein du groupe ?",
        "Le formateur a-t-il su vous intéresser et vous transmettre ses connaissances ?",
        "Les sujets abordés sont-ils adaptés à votre contexte professionnel ?",
        "Estimez-vous être en mesure de mettre en pratique les acquis de la formation ?",
        "Les objectifs de la formation ont-ils globalement été atteints ?",
        "La formation a-t-elle répondu à vos attentes ?",
        "Recommanderiez-vous notre organisme de formation ?",
    ];

    const reviewInitialState = { name: "", companyName: "", teacher: "", comment: ""};
    ratedQuestions.forEach((question) => {
        reviewInitialState[question] = 3;
    });

    const [review, setReview] = useState(reviewInitialState);
    const [errorList, setErrorList] = useState([]);
    const navigate = useNavigate();

    const handleChanges = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setReview({ ...review, [name]: value })
        console.log(review)
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
            <Row className='d-flex justify-content-center'>
                <Col className='p-3'>
                    <form onSubmit={handleSubmit} className='container p-3 rounded bg-light'>
                        <h2 className='p-3 text-center'>Formulaire Apprenants</h2>
                        {errorList.length !== 0 && errorList.map(error => <p className='form-error' key={error}>{error}</p>)}
                        <div className='p-4'>
                            <TextInput {... {name: 'name', label: 'Votre NOM et Prénom', placeholder: 'NOM et Prénom', handleChanges: handleChanges, value: review.name, isRequired: true}} />
                            <TextInput {... {name: 'companyName', label: 'Societé pour laquelle vous avez été en formation', placeholder: 'Societé', handleChanges: handleChanges, value: review.companyName, isRequired: true}} />
                            <TextInput {... {name: 'teacher', label: 'Nom du formateur ayant dispensé la formation', placeholder: 'Formateur', handleChanges: handleChanges, value: review.teacher, isRequired: true}} />
                            {ratedQuestions.map((question) => <StarRating key={question} {...{rating: review[question], setRating: handleChanges, name: question, label: question}} />)}
                            <TextArea {...{name: 'comment', label: 'Vos commentaires et suggestions', placeholder: 'Vos commentaires et suggestions', handleChanges: handleChanges, value: review.comment, isRequired: false}}/>
                        </div>
                    </form>
                </Col>
            </Row>
        </>
    )
}
