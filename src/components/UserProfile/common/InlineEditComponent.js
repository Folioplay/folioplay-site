const InlineEdit = ({ value, setValue }) => {
    const onChange = (event) => setValue(event.target.value);

    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur();
        }
    }

    const onBlur = (event) => {
        if (event.target.value.trim() === "") {
            setValue(value);
        } else {
            setValue(event.target.value)
        }
    }

    return (
        <input
            type="text"
            aria-label="Field name"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className="inputField"
        />
    )
}
export default InlineEdit;