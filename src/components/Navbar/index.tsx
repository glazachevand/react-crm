import { Link } from 'react-router-dom';
import { selectRequestsEditId } from '../../redux/slices/requestsSlice';
import { useSelector } from 'react-redux';
import './style.css';

export const Navbar: React.FC = () => {
  const editId = useSelector(selectRequestsEditId);

  return (
    <nav className="project-nav">
      <div className="project-nav__links-wrapper">
        <Link to="/">Форма добавления заявок</Link>
        <Link to="/table">Таблица с заявками</Link>
        <Link to={'/edit/' + editId}>Редактирование заявки</Link>
      </div>
    </nav>
  );
};
