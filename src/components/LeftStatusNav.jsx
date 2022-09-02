import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilterStatus } from '../redux/slices/filterSlice';
import { statuses } from '../types';

export const LeftStatusNav = () => {
  const badges = useSelector((state) => state.requests.badges);
  const status = useSelector((state) => state.filter.status);
  const dispatch = useDispatch();

  const links = [{ status: 'all', title: 'Все', titleNav: 'Все вместе', class: '' }, ...statuses];

  const renderLists = links.map((link) => {
    const cssClass = status === link.status ? 'active' : '';
    let displayBadge = { display: 'none' };
    let countBadge = '';

    if (badges && badges[link.status] > 0) {
      displayBadge = { display: 'inline-block' };
      countBadge = badges[link.status];
    }

    return (
      <li key={link.status}>
        <Link
          data-value={link.status}
          data-role="left-status"
          to="#!"
          className={cssClass}
          onClick={() => {
            dispatch(changeFilterStatus(link.status));
            localStorage.setItem('status', link.status);
          }}>
          {link.titleNav}
          <div className="badge" style={displayBadge}>
            {countBadge}
          </div>
        </Link>
      </li>
    );
  });

  return (
    <div className="left-panel__navigation">
      <div className="left-panel__navigation-title">Заявки</div>
      <ul>{renderLists}</ul>
    </div>
  );
};
