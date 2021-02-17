import { useState } from 'react'
import PlacesDropDown from "../components/PlacesDropDown"

const HomePage = () => {
  const [pointA, setPointA] = useState('')
  const [pointB, setPointB] = useState('')
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

    <PlacesDropDown labelText="Point A:" updateStateRef={setPointA} />
    <PlacesDropDown labelText="Point B:" updateStateRef={setPointB} />

    { pointA === '' && pointB === '' ? <p>loading...</p> :
      <img src={`https://maps.googleapis.com/maps/api/staticmap?size=500x500
  &markers=color:blue%7Clabel:A%7C${pointA}
  &markers=color:blue%7Clabel:B%7C${pointB}&key=${process.env.REACT_APP_GOOGLE_API_KEY} `} alt="map displaying markers for Delta Junction, AK and New York, NY" />}


  </>
}

export default HomePage