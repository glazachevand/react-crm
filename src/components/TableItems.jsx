import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableItem } from '../components';
import { countBadges } from '../redux/slices/requestsSlice';
import { filterRequests } from '../redux/slices/filterSlice';
import { fetchRequests } from '../redux/asyncActions';
import { statuses, products } from '../types';

export const TableItems = () => {
  const { items, statusLoading } = useSelector((state) => state.requests);
  const { product, status, itemsFilter } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const getRequests = async () => {
    await dispatch(fetchRequests(''));
    dispatch(countBadges(statuses));
  };

  React.useEffect(() => {
    getRequests();
  }, []);

  React.useEffect(() => {
    if (statusLoading === 'completed') {
      dispatch(filterRequests({ product, status, statuses, products, items }));
    }
  }, [product, status, statusLoading]);

  const requestsTable = itemsFilter.map((item) => <TableItem request={item} key={item.id} />);

  return (
    <>
      {statusLoading === 'error' && (
        <div className="alert alert-danger">Ошибка загрузки с сервера</div>
      )}
      {statusLoading === 'loading' && <h3>загрузка...</h3>}
      {statusLoading === 'completed' && (
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
          <tbody id="tbody">{requestsTable}</tbody>
        </table>
      )}
    </>
  );
};
