import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilterStatus, selectFilterStatus } from '../redux/slices/filterSlice';
import { selectRequestsBadges } from '../redux/slices/requestsSlice';
import { statuses } from '../types';

export const LeftStatusNav: React.FC = () => {
  const badgesStatus = useSelector(selectRequestsBadges);
  const status = useSelector(selectFilterStatus);
  const dispatch = useDispatch();

  const renderLists = statuses.map((link) => {
    const cssClass = status === link.status ? 'active' : '';
    let displayBadge = { display: 'none' };
    let countBadge = '';

    const index = badgesStatus.findIndex((item) => item.status === link.status);

    if (index >= 0 && badgesStatus[index].badges > 0) {
      displayBadge = { display: 'inline-block' };
      countBadge = String(badgesStatus[index].badges);
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
