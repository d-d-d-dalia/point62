const HomePage = () => {
  console.log('@@env', process.env)
  return <>
    <header>
      <h1>Welcome to point62! </h1>
      <p>Develop a sense of distance in kilometers for use in your every day life!</p>
    </header>
    <section>
      <h2>How to Play</h2>
      <ul>
        <li>Enter 2 locations in the form below</li>
        <li>Check out the route on the map</li>
        <li>Enter a guess for the distance in kilometers!</li>
      </ul>
      <p>If your guess is close enough, congrats! You're less of an annoying tourist now!</p>
      <p>If it's too far off, congrats! You get to try again! (If you want a hint, we'll allow it.)</p>
    </section>

    <iframe
      width="450"
      height="250"
      frameBorder="0" style={{ border: 0 }}
      src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_DISTANCE_KEY}&origin=Oslo+Norway
  &destination=Telemark+Norway`} allowFullScreen>
    </iframe>

  </>
}

export default HomePage