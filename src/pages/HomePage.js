import { useState } from 'react'
import PlacesDropDown from "../components/PlacesDropDown"
import { DistanceMatrixService } from '@react-google-maps/api'

const URL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=kilometers&origins="

const HomePage = () => {
  const [pointA, setPointA] = useState('') // [initalState, updaterFn]
  const [pointB, setPointB] = useState('')
  const [guess, setGuess] = useState(0)
  const [actualDistance, setActualDistance] = useState(0)
  const [distanceInMiles, setDistanceInMiles] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return <div className="grid gap-y-5 grid-rows-homepage">
    <header className="row-start-1 text-center">
      <h1>Welcome to point62! </h1>
      <p>Develop a sense of distance in kilometers for use in your every day life!</p>
    </header>
    <section className="justify-self-center">
      <h2 className="text-center underline">How to Play</h2>
      <ul>
        <li>1 - Enter 2 locations in the form below.</li>
        <li>2 - Check out the route on the map.</li>
        <li>3 - Enter a guess for the distance in kilometers.</li>
      </ul>
      <p>If your guess is close enough, congrats! Traveling will be easier for you now! </p>
      <p>If it's too far off, congrats! You get to try again! (If you want a hint, we'll allow it.)</p>
    </section>

    <div className="grid grid-cols-2 gap-x-2">
      <form onSubmit={handleSubmit} className="relative p-6 rounded-lg border-2 border-gray-600 flex flex-col gap-y-1">
        <PlacesDropDown labelText="Point A" updateStateRef={setPointA} />
        <PlacesDropDown labelText="Point B" updateStateRef={setPointB} />

        <label htmlFor="kilometers-guess"> Enter Distance in Kilometers: </label>
        <input
          type="number"
          id="kilometers-guess"
          onChange={(event) => setGuess(event.target.value)}
          value={guess}
          className="border-2 border-gray-700"
        />
        <input
          type="submit"
          value="Enter"
          className="bg-blue-500 rounded p-1 mt-2"
        />
      </form>

      {
        pointA !== '' && pointB !== '' ? <DistanceMatrixService
          options={{
            destinations: [pointA],
            origins: [pointB],
            travelMode: "DRIVING"
          }}
          callback={res => {
            const distanceInMeters = res.rows[0].elements[0]?.distance?.value
            const distanceInKilometers = distanceInMeters / 1000
            const distanceInMiles = distanceInMeters / 1609.34

            setActualDistance(distanceInKilometers / 1000)
            setDistanceInMiles(distanceInMiles)
          }}
        /> : null
      }

      {
        pointA === '' && pointB === '' ? <p>Please fill out form to see map</p> :
          <img src={`https://maps.googleapis.com/maps/api/staticmap?size=500x500
  &markers=color:blue%7Clabel:A%7C${pointA}
  &markers=color:blue%7Clabel:B%7C${pointB}&key=${process.env.REACT_APP_GOOGLE_API_KEY} `}
            alt="map displaying markers for Delta Junction, AK and New York, NY" className="object-cover object-center rounded border-grey-300 border-2" />
      }
    </div>

  </div >
}

export default HomePage