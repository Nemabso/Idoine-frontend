export default function TextInput({name, label, placeholder, handleChanges, value, isRequired}) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label} {!isRequired && '(facultatif) '}:</label>
            <input type="text" className="form-control" name={name} id={name} required={isRequired} onChange={handleChanges} value={value} placeholder={placeholder} />
        </div>
    )
}