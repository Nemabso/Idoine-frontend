export default function Mcq({ label, options, handleChanges, detail }) {

    return (
        <>
            <div className='mb-3'>
                <p className='mb-2'>{label}</p>
                <div>
                {options.map((option) =>
                    <>
                        <input type="radio" name={label} value={option} id={`${label} - ${option}`} onClick={handleChanges}/>
                        <label for={`${label} - ${option}`}>{option}</label>
                    </>
                )}
                </div> 
            </div>
            {/* {detail && 
                <div className="mb-3">
                    <label htmlFor={`${label} - comment`} className="form-label">{detail}</label>
                    <textarea className="form-control" spellCheck="true" name={name} id={name} placeholder="Votre commentaire..." onChange={handleChanges} value={value} rows="3" />
                </div>
            } */}
        </>
    );
}