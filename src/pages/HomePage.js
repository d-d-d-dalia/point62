import { useState } from 'react'
import PlacesDropDown from "../components/PlacesDropDown"

const URL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=kilometers&origins="

const HomePage = () => {
  const [pointA, setPointA] = useState('') // [initalState, updaterFn]
  const [pointB, setPointB] = useState('')
  const [guess, setGuess] = useState(0)


  const handleSubmit = async () => {
    const response = await fetch(`${URL + pointA}&destinations=${pointB}&key=${env.process.REACT_APP_GOOGLE_API_KEY}`)
    
  }

  return <>
    <header className="col-span-2 row-start-1 text-center">
      <h1>Welcome to point62! </h1>
      <p>Develop a sense of distance in kilometers for use in your every day life!</p>
    </header>
    <section className="col-span-2
    justify-self-center">
      <h2 className="text-center underline">How to Play</h2>
      <ul>
        <li>Enter 2 locations in the form below</li>
        <li>Check out the route on the map</li>
        <li>Enter a guess for the distance in kilometers!</li>
      </ul>
      <p>If your guess is close enough, congrats! Traveling will be easier for you now! </p>
      <p>If it's too far off, congrats! You get to try again! (If you want a hint, we'll allow it.)</p>
    </section>

    <form onSubmit={handleSubmit} >
      <PlacesDropDown labelText="Point A" updateStateRef={setPointA} />
      <PlacesDropDown labelText="Point B" updateStateRef={setPointB} />

      <label htmlFor="kilometers-guess"> Enter Distance in Kilometers </label>
      <input 
        type="number" 
        id="kilometers-guess" 
        onChange={(event) => setGuess(event.target.value)}
        value={guess}
      />
      <input type="submit" value="Enter"/>
    </form>

    { pointA === '' && pointB === '' ? <p>loading...</p> :
      <img src={`https://maps.googleapis.com/maps/api/staticmap?size=500x500
  &markers=color:blue%7Clabel:A%7C${pointA}
  &markers=color:blue%7Clabel:B%7C${pointB}&key=${process.env.REACT_APP_GOOGLE_API_KEY} `} alt="map displaying markers for Delta Junction, AK and New York, NY" />}

  </>
}

export default HomePage

// on the front:
// use state to send to back end: distance back from distance matrix & input from user

//on the back:
// do the calculation as to whether close enough or not
// {
//   guess: '20',
//   actual: '429'
//   correct: 'true/false'
// }

// Guesses - inputs to submit to distance API
// backend - schema - do we want username column in guesses table? (archade high score)
// CSS
// Routes