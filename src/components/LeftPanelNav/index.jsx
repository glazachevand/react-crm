import { useContext } from "react";
import { TableContext } from "../TablePage/";
import { Link } from "react-router-dom";

const LeftPanelNav = () => {
  const { filter, badges, changeFilter, linksLeftPanelNav: links } = useContext(TableContext);

  const renderLists = links.map((link) => {
    const cssClass = filter.status === link.status ? "active" : "";
    let displayBadge = { display: "none" };
    let countBadge = "";

    if (badges && badges[link.status] > 0) {
      displayBadge = { display: "inline-block" };
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
            changeFilter("status", link.status);
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

export default LeftPanelNav;
