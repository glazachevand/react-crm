import { useContext } from 'react';
import { TableContext } from '../pages/Table';
import { Link } from 'react-router-dom';

export const TopStatusNav = () => {
  const { filter, changeFilter, linksTopStatusBar: links } = useContext(TableContext);

  const renderLists = links.map((link) => {
    const cssClass = filter.status === link.status ? 'btn btn-light active' : 'btn btn-light';

    return (
      <Link
        key={link.status}
        to="#!"
        className={cssClass}
        data-value={link.status}
        onClick={() => {
          changeFilter('status', link.status);
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
