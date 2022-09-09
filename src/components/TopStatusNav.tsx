import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilterStatus, selectFilterStatus } from '../redux/slices/filterSlice';
import { statuses } from '../types';

export const TopStatusNav: React.FC = () => {
  const status = useSelector(selectFilterStatus);
  const dispatch = useDispatch();

  const links = [...statuses];
  links[0].titleNav = 'Все';

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
