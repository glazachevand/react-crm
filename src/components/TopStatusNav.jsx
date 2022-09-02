import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilterStatus } from '../redux/slices/filterSlice';
import { statuses } from '../types';

export const TopStatusNav = () => {
  const status = useSelector((state) => state.filter.status);
  const dispatch = useDispatch();

  const links = [{ status: 'all', title: 'Все', titleNav: 'Все', class: '' }, ...statuses];

  const renderLists = links.map((link) => {
    const cssClass = status === link.status ? 'btn btn-light active' : 'btn btn-light';

    return (
      <Link
        key={link.status}
        to="#!"
        className={cssClass}
        data-value={link.status}
        onClick={() => {
          dispatch(changeFilterStatus(link.status));
          localStorage.setItem('status', link.status);
        }}>
        {link.titleNav}
      </Link>
    );
  });

  return (
    <div id="topStatusBar" className="btn-group" role="group" aria-label="...">
      {renderLists}
    </div>
  );
};
