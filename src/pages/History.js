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

  return <div className="flex flex-col">
    <h1 className="text-4xl text-center underline mb-3">History</h1>
    <table className="table-center border-2 border-black bg-gray-50">
      <tr className="bg-blue-500 text-xl">
        <th>Player Name</th>
        <th>Guess (km)</th>
        <th>Actual (km)</th>
        <th>Correct</th>
      </tr>
      {
        guesses.map(function (guess) {
          const success = () => guess.harder ? `${guess.success.toString()}*` : `${guess.success.toString()}`
          
          return <tr className="text-center">
            <td>{guess.player_name}</td>
            <td>{guess.value}</td>
            <td>{guess.kilometers}</td>
            <td>{success()}</td>
          </tr>
        })
      }
    </table>
    <h5>* = you checked "make it harder" for a 10% margin of error allowance rather than 20%</h5>

  </div>

}

export default History