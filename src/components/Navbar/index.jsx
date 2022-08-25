import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const id = localStorage.getItem("editId") || "";

  return (
    <nav className="project-nav">
      <div className="project-nav__links-wrapper">
        <Link to="/">Форма добавления заявок</Link>
        <Link to="/table">Таблица с заявками</Link>
        <Link to={"/edit/" + id}>Редактирование заявки</Link>
      </div>
    </nav>
  );
};

export default Navbar;
