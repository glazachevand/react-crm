import { useContext } from "react";
import { TableContext } from "../TablePage/";
import TableRequest from "../TableRequest";

const Table = () => {
  const { requests, prepareRequestsForTable } = useContext(TableContext);

  const requestsForTable = prepareRequestsForTable(requests).map((request) => (
    <TableRequest request={request} key={request.id} />
  ));

  return (
    <table className="table fs-14">
      <thead>
        <tr>
          <th>ID</th>
          <th>дата</th>
          <th>продукт</th>
          <th>имя</th>
          <th>email</th>
          <th>телефон</th>
          <th>статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tbody">{requestsForTable}</tbody>
    </table>
  );
};

export default Table;
