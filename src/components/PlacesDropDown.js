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
    clearSuggestions()
  }

  const renderSuggestions = () => {
    return data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          tabIndex="0"
          className="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-yellow-500 rounded"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })
  }
  const labelTextToId = labelText.replace(" ", "-").toLowerCase()
  return (
    <div ref={ref}>
      <label htmlFor={labelTextToId} className="pr-3">{labelText}</label>
      <input
        id={labelTextToId}
        value={value}
        onChange={handleInput}
        className="border-2 border-gray-700 min-w-full"
      />
      {status === 'OK' && <ul
        className="absolute left-0 z-20 py-2 bg-white rounded-md shadow-xl dark:bg-gray-800"
      >{renderSuggestions()}</ul>}
    </div>
  )
}

export default PlacesDropDown
