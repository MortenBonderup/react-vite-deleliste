import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/content">Hersk og del</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>
    );
}
