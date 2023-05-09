export default function TextArea({name, label, placeholder, handleChanges, value, isRequired}) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea className="form-control" spellCheck="true" required={isRequired} name={name} id={name} placeholder={placeholder} onChange={handleChanges} value={value} rows="3" />
        </div>
    )
}