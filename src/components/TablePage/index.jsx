import LeftPanel from "../LeftPanel";
import ProductSelect from "../ProductSelect";
import Table from "../Table";
import TopStatusBar from "../TopStatusBar";
import "./style.css";
import { serverPath } from "../../helpers/variables";
import { useEffect, useState, createContext } from "react";

export const TableContext = createContext(null);

const TablePage = ({ statuses, products, optionsProducts }) => {
  const [requests, setRequests] = useState(null);
  const [filter, setFilter] = useState(loadFilter());
  const [badges, setBadges] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (filter.product && filter.status) {
      fetch(serverPath + "requests")
        .then((res) => {
          if (!res.ok) {
            setError("Ошибка загрузки с сервера");
            setLoading(false);
            throw Error("Ошибка загрузки с сервера");
          }
          return res.json();
        })
        .then((data) => {
          setBadges(countBadges(data, statuses));
          setRequests(filterRequests(data, filter.product, filter.status));
          setLoading(false);
        });
    }
  }, [filter.product, filter.status]);

  function loadFilter() {
    let filter = {
      product: "all",
      status: "all",
    };

    if (localStorage.getItem("filter")) {
      filter = JSON.parse(localStorage.getItem("filter"));
    } else {
      localStorage.setItem("filter", JSON.stringify(filter));
    }

    return filter;
  }

  function filterRequests(requestsArr, filterProduct, filterStatus) {
    let filteredRequests = [...requestsArr];

    if (filterProduct && filterProduct !== "all") {
      filteredRequests = filteredRequests.filter((item) => item.product === filterProduct);
    }

    if (filterStatus && filterStatus !== "all") {
      filteredRequests = filteredRequests.filter((item) => item.status === filterStatus);
    }

    return filteredRequests;
  }

  function countBadges(requestsArr, statuses) {
    const countsBadges = {
      all: requestsArr.length,
    };

    statuses.forEach((elem) => {
      const badgeItem = requestsArr.filter((item) => item.status === elem.status);
      countsBadges[elem.status] = badgeItem.length;
    });

    return countsBadges;
  }

  function changeFilter(prop, value) {
    setFilter((filter) => {
      let filterNew = { ...filter };
      filterNew[prop] = value;
      localStorage.setItem("filter", JSON.stringify(filterNew));
      return filterNew;
    });
  }

  function prepareRequestsForTable(requestsArr) {
    return requestsArr.map((item) => {
      const productName = products.find((elem) => elem.product === item.product);
      const statusName = statuses.find((elem) => elem.status === item.status);
      return {
        ...item,
        dateFormat: new Date(item.date).toLocaleDateString(),
        productName: productName.title,
        statusName: statusName ? statusName.title : "",
        statusClass: statusName ? statusName.class : "",
      };
    });
  }

  const linksTopStatusBar = [
    { status: "all", title: "Все", titleNav: "Все", class: "" },
    ...statuses,
  ];
  const linksLeftPanelNav = [
    { status: "all", title: "Все", titleNav: "Все вместе", class: "" },
    ...statuses,
  ];

  return (
    <div className="page with-nav body--dashboard">
      <TableContext.Provider
        value={{
          requests,
          filter,
          badges,
          changeFilter,
          prepareRequestsForTable,
          linksTopStatusBar,
          linksLeftPanelNav,
        }}>
        <LeftPanel />
        <div className="main-wrapper">
          <div className="container-fluid">
            <div className="admin-heading-1">Все заявки</div>

            <form action="">
              <div className="row mb-3 justify-content-start">
                <div className="col">
                  <TopStatusBar />
                </div>

                <div className="col">
                  <ProductSelect optionsProducts={optionsProducts} />
                </div>
              </div>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}
            {isLoading && <h3>загрузка...</h3>}
            {requests && <Table />}
          </div>
        </div>
      </TableContext.Provider>
    </div>
  );
};

export default TablePage;
