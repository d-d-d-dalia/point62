import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

function App() {
  return (
    <Router>
      <main className="md:container md:mx-auto mx-w-2xl">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/leaderboard">
            <p>Hello!</p>
          </Route>
          <Route exact path="/whykilometers">
            <p> Learn a new language! </p>
          </Route>
        </Switch>

      </main>
    </Router>
  );
}

export default App;