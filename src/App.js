import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import HomePage from './pages/HomePage'
import History from './pages/History'
import WhyKilometers from './pages/WhyKilometers'
import Nav from './components/Nav'

function App() {
  return (
    <Router>
      <Nav/>
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

