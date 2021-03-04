import {Link} from "react-router-dom"

const Nav = () => {
    return (
    <nav className="flex flex-row-reverse">
        <ul className="flex flex-row" tabIndex="0">
            <li className="mr-3 hover:underline hover:text-blue-500"><Link to="/">Home</Link></li>
            <li className="mr-3 hover:underline hover:text-blue-500"><Link to="/history">History</Link></li>
            <li className="mr-3 hover:underline hover:text-blue-500"><Link to="/whykilometers">Why Kilometers</Link></li>
        </ul>
    </nav>
    )
}

export default Nav