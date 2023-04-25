import { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function ReviewSelector({validateType}) {
    const [type, setType] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        validateType(type);
    }

    return (
        <Form className='container p-3 rounded bg-light' onSubmit={(e) => handleSubmit(e)}>
            <h2>Vous êtes :</h2>
            <div className='mb-2' onChange={(e) => setType(e.target.value)}>
                <Form.Check
                    name='type'
                    type='radio'
                    value='learner'
                    label={'Apprenant ayant suivi une formation'}
                />
                <Form.Check
                    name='type'
                    type='radio'
                    value='employer'
                    label={'Employeur dont les collaborateurs ont bénéficié d\'une formation'}
                />       
                <Form.Check
                    name='type'
                    type='radio'
                    value='funding'
                    label={'Organisme financeur'}
                />
            </div>
            <button className='btn btn-primary' type='submit'>Continuer</button>
        </Form>
    )
}