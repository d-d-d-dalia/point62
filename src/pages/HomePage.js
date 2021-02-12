const HomePage = () => {
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

    <form className="flex flex-col">
      <label htmlFor="point-a">Point A:</label>
      <input id="point-a" type="text" name="point-a" className="border-2 border-black" />
      <label htmlFor="point-b">Point B:</label>
      <input id="point-b" type="text" name="point-a" className="border-2 border-black" />
      <input type="submit" value="submit" />
    </form>

    { true ? <p>loading...</p> :
      <img src={`https://maps.googleapis.com/maps/api/staticmap?size=500x500
  &markers=color:blue%7Clabel:A%7CDelta+Junction,AK
  &markers=color:blue%7Clabel:B%7CNew+York,NY&key=${process.env.REACT_APP_GOOGLE_API_KEY} `} alt="map displaying markers for Delta Junction, AK and New York, NY" />}


  </>
}

export default HomePage