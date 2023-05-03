export default function Mcq({ label, options, handleChanges }) {

    return (
        <>
            <div className='mb-3'>
                <p className='mb-2'>{label}</p>
                <div className='d-flex flex-column'>
                    {options.map((option) =>
                        <div key={option}>
                            <input type="radio" name={label} value={option} id={`${label} - ${option}`} onClick={handleChanges}/>
                            <label className='ms-1' htmlFor={`${label} - ${option}`}>{option}</label>
                        </div>
                    )}
                </div> 
            </div>
        </>
    );
}