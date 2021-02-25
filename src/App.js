import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import HomePage from './pages/HomePage'
import History from './pages/History'
import WhyKilometers from './pages/WhyKilometers'

function App() {
  return (
    <Router>
      <nav>
        <ul className="flex flex-row">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/whykilometers">Why Kilometers</Link></li>
        </ul>
      </nav>
      <main className="md:container md:mx-auto mx-w-2xl">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
          <Route exact path="/whykilometers">
            <WhyKilometers />
          </Route>
        </Switch>
      </main>

    </Router>
  );
}

export default App;

