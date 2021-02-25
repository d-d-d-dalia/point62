import { useEffect, useState } from 'react'

const History = () => {
  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/guesses')
      const data = await response.json()

      setGuesses(data)
    }

    fetchData()

    return fetchData

  }, [])

  return <>
    <h1>History</h1>
    <table>
      <tr>
        <th>Player Name</th>
        <th>Guess (km)</th>
        <th>Actual (km)</th>
        <th>Correct</th>
      </tr>
      {
        guesses.map(function (guess) {
          return <tr>
            <td>{guess.player_name}</td>
            <td>{guess.value}</td>
            <td>{guess.kilometers}</td>
            <td>{guess.success.toString()}</td>
          </tr>
        })
      }
    </table>

  </>

}

export default History