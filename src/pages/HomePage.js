import { useState } from 'react'
import PlacesDropDown from "../components/PlacesDropDown"
import { DistanceMatrixService } from '@react-google-maps/api'

const HomePage = () => {
  const [pointA, setPointA] = useState('') // [initalState, updaterFn]
  const [pointB, setPointB] = useState('')
  const [guess, setGuess] = useState()
  const [playerName, setPlayerName] = useState('')
  const [actualDistance, setActualDistance] = useState(0)
  const [distanceInMiles, setDistanceInMiles] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Number.isNaN(actualDistance) === true) {
      window.alert('Please enter a valid Point A and Point B')
      return
    }

    if (pointA === '' || pointB === '') {
      window.alert('Please Enter a Point A and a Point B.')
      return
    }

    if (guess === undefined) {
      window.alert('Please enter a guess.')
      return
    }

    let absoluteValue = Math.abs(guess - actualDistance)
    const wasGuessCorrect = absoluteValue <= 1.5

    await fetch('http://localhost:3001/guesses', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guess: {
          player_name: playerName,
          value: guess,
          kilometers: actualDistance,
          success: wasGuessCorrect
        }
      })
    })

    if (!wasGuessCorrect) {
      window.alert('Try Again!')
      return
    }
    
    window.alert('You got it right!')

  }

  return <div className="grid gap-y-5 grid-rows-homepage">
    <header className="row-start-1 text-center">
      <h1>Welcome to point62! </h1>
      <p>Develop a sense of distance in kilometers for use in your every day life!</p>
    </header>
    <section className="justify-self-center">
      <h2 className="text-center underline">How to Play</h2>
      <ul>
        <li>1 - Enter 2 locations along with your name in the form below.</li>
        <li>2 - Check out the route on the map.</li>
        <li>3 - Enter a guess for the distance in kilometers.</li>
      </ul>
      <p>If your guess is close enough, congrats! International travel will be easier for you now! </p>
      <p>If it's too far off, congrats! You get to try again! (If you want a hint, we'll allow it.)</p>
    </section>

    <div className="grid grid-cols-2 gap-x-2">
      <div className="p-6 rounded-lg border-2 border-gray-600 flex flex-col">
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-y-1">
          <label htmlFor="player-name">Please enter your name below:</label>
          <input
            type="text"
            id="player-name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            className="border-2 border-gray-700"
          />
          <PlacesDropDown labelText="Point A" updateStateRef={setPointA} />
          <PlacesDropDown labelText="Point B" updateStateRef={setPointB} />

          <label htmlFor="kilometers-guess"> Enter distance in kilometers: </label>
          <input
            type="number"
            id="kilometers-guess"
            onChange={(event) => setGuess(event.target.value)}
            value={guess}
            step="0.01"
            className="border-2 border-gray-700"
          />
          <input
            type="submit"
            value="Enter"
            className="bg-blue-500 rounded p-1 mt-2"
          />
        </form>

        {actualDistance !== 0 ? <button
          onClick={() => setShowHint(true)}
          className="bg-yellow-500 rounded p-1 mt-1"
        >
          Show Hint
        </button> : null}

        {showHint === true ? <p className="text-center">Distance in miles: {distanceInMiles}</p> : null}
      </div>


      {
        pointA !== '' && pointB !== '' ? <DistanceMatrixService
          options={{
            destinations: [pointA],
            origins: [pointB],
            travelMode: "DRIVING",
          }}
          callback={res => {
            const distanceInMeters = res.rows[0].elements[0]?.distance?.value
            const distanceInKilometers = distanceInMeters / 1000
            const distanceInMiles = distanceInMeters / 1609.34

            setActualDistance(distanceInKilometers)
            setDistanceInMiles(distanceInMiles)
          }}
        /> : null
      }

      {
        pointA === '' && pointB === '' ? <p>Please fill out form to see map</p> :
          <img src={`https://maps.googleapis.com/maps/api/staticmap?size=500x500
            &markers=color:blue%7Clabel:A%7C${pointA}
            &markers=color:blue%7Clabel:B%7C${pointB}
            &key=${process.env.REACT_APP_GOOGLE_API_KEY} `}
            alt="map displaying markers for Delta Junction, AK and New York, NY" 
            className="object-cover object-center rounded border-grey-300 border-2" />
      }

    </div>
  </div >
}

export default HomePage