import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from 'react-cool-onclickoutside';

const PlacesDropDown = ({ labelText, updateStateRef }) => {
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete()
  const ref = useOnclickOutside(() => clearSuggestions())

  const handleInput = e => setValue(e.target.value)

  const handleSelect = ({ description }) => () => {
    setValue(description, false)
    updateStateRef(description)
  }

  const renderSuggestions = () => {
    return data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })
  }

  return (
    <div ref={ref}>
      <label htmlFor="places-dropdown">{labelText}</label>
      <input
        id="places-dropdown"
        value={value} onChange={handleInput} />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  )
}

export default PlacesDropDown
