import { NavLink } from "react-router-dom";

export function NavBar (){

    return(
    <nav className="nav-bar">
  <ul>
    <li>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : null)}
        to="/">
        Home
      </NavLink>
    </li>
    {/* <li>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : null)}
        to="/films"> 
        PokemonPage
      </NavLink>
    </li> */}
  </ul>
</nav>
    );
}

