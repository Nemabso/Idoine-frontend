import React, { useState } from "react";
import "./nousContacter.css";
import ReCAPTCHA from "react-google-recaptcha";
import { BsGeoAlt } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
// import sidimag from "../../assets/images/design.svg";
import axios from "axios";
import Modal from "react-modal";

export default function NousContacter() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [departement, setDepartement] = useState("");
    const [statu, setStatu] = useState("");
    const [participants, setParticipants] = useState("");
    const [theme, setTheme] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setmodalMessage] = useState("");
    const [recaptcha, setRecaptcha] = useState("");
    // const siteKey = process.env.SITE_KEY_RECAPTCHA;
    // console.log("siteKey", siteKey);
    // const reCaptcharef = useRef(null);

    // console.log("recaptcha value ", recaptcha);
    // const onchange = (value) => {
    //     console.log("recaptcha value ", value);
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await axios.post("http://localhost:5000/user/contactus", {
    //         name: name, phone: phone, email: email, message: message, captcha: recaptcha,
    //         departement: departement, statu: statu, participants: participants, theme: theme
    //     }).then((res) => {
    //         setmodalMessage(res.data);
    //         setShowModal(true);
    //         e.target.reset();
    //     }).catch(({ response }) => {
    //         console.log("contact us :", response);
    //         setmodalMessage(response.data);
    //         setShowModal(true);
    //     })

    // };

    return (
        <>
            <div className="nouscontactform">
                {/* <h1 className="p-3 text-light">Nous contacter</h1> */}
                <div className="formul-nous-contact">
                    <div className="col-md-5 p-3">
                        <div className="nous-contact-side p-4">
                            <h1>IDOINE Formation</h1>
                            <hr className="khat-nous-contact" />
                            <h2 className="fs-4">Vous avez une question à propos de nos formations ?
                                notre équipe s'engage à vous rappeler dans les plus bref délais.
                            </h2>
                            <div className="d-flex">
                                <a href="tel:+33688464682" className='text-primary'> <FiPhoneCall /></a>
                                <p className="ps-2"><b> +33-6-88-46-46-82</b></p>
                            </div>
                            <div className="inside-nous-contact">
                                <p>Vous êtes formateur? contactez nous à <strong>dominique.idoine@orange.fr</strong></p>
                            </div>
                        </div>
                    </div>
                    {/* // TODO fix contact form */}
                    {/* <div className="contactform col-md-6">
                        <form className="p-2" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                            <div>
                                <label htmlFor="name" className="form-label">Nom et Prénom*</label>
                                <input type="text" id="name" name="name" className="form-control" required onChange={(e) => setName(e.target.value)} placeholder="Nom et Prénom" />
                            </div>
                            <div className="email-content">
                                <label htmlFor="email" className="form-label">Adresse e-mail*</label>
                                <input type="email" id="email" name="email" className="form-control" required onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Adresse e-mail" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="form-label">N° de téléphone*</label>
                                <input type="text" id="phone" name="phone" className="form-control" required onChange={(e) => setPhone(e.target.value)} placeholder="N° de téléphone" />
                            </div>
                            <div>
                                <label htmlFor="ville" className="form-label">Département/Ville*</label>
                                <input type="text" id="ville" name="ville" className="form-control" required onChange={(e) => setDepartement(e.target.value)} placeholder="Département/Ville" />
                            </div>
                            <div>
                                <label htmlFor="statut" className="form-label">Statut*</label>
                                <input type="text" id="statut" name="statut" className="form-control" required onChange={(e) => setStatu(e.target.value)} placeholder="Statut" />
                            </div>

                            <div>
                                <label htmlFor="participants" className="form-label">Nombre estimé de participants</label>
                                <input type="number" id="participants" name="participants" className="form-control" required onChange={(e) => setParticipants(e.target.value)} placeholder="Nombre estimé de participants" />
                            </div>
                            <div>
                                <label htmlFor="theme" className="form-label">Thème de la formation concernée</label>
                                <input type="text" id="theme" name="theme" className="form-control" onChange={(e) => setTheme(e.target.value)} placeholder="Thème de la formation" />
                            </div>

                            <div>
                                <label htmlFor="message" className="form-label">Votre message*</label>
                                <textarea id="message" name="message" spellCheck="true" className="form-control" required onChange={(e) => setMessage(e.target.value)} placeholder="Message"
                                />
                            </div>
                            <div className="form-group pt-3">
                                <ReCAPTCHA sitekey="6Le7E94eAAAAANxRH_jg71-jZsRL19pr5vicwkaH" onChange={(e) => setRecaptcha(e)} />
                            </div>
                            <button className="btn btn-primary mt-2" type="submit">Envoyer</button>
                            <button className="btn btn-warning ms-3 mt-2" type="reset">Réinitialiser les champs</button>
                        </form>
                    </div> */}
                </div>
            </div>
            <Modal className="modal-signup rounded-pill bg-light col-4" ariaHideApp={false} onRequestClose={() => setShowModal(false)} isOpen={showModal} >
                <h1>{modalMessage}</h1>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>fermer</button>
            </Modal>
        </>
    );
}
