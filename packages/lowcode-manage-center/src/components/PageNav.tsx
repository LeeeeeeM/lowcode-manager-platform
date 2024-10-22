import { NavLink } from "react-router-dom";

export default function PageNav() {
  return null;
  return <nav>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/product">product</NavLink>
      </li>
      <li>
        <NavLink to="/about">about</NavLink>
      </li>
      <li>
        <NavLink to="/download">download</NavLink>
      </li>
    </ul>
  </nav>
}