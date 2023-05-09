import { useState } from "react";
import EmployerForm from "./EmployerForm";
import FundingForm from "./FundingForm";
import LearnerForm from "./LearnerForm";
import ReviewSelector from "./ReviewSelector";

export default function Review({throwMsg}) {
    const [type, setType] = useState("");
    return(
        <>
            <h1 className='p-3 text-center'>Laissez nous votre avis !</h1>
            <div className='d-flex flex-column justify-content-center'>
                {!type && <ReviewSelector validateType={setType}/>}
                {type === 'learner' && <LearnerForm throwMsg={throwMsg} />}
                {type === 'employer' && <EmployerForm throwMsg={throwMsg} />}
                {type === 'funding' && <FundingForm throwMsg={throwMsg} />}
            </div>
        </>
    )
};