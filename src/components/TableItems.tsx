import React from 'react';
import { useSelector } from 'react-redux';
import { TableItem } from '.';
import { countBadges, selectRequests } from '../redux/slices/requestsSlice';
import { filterRequests, selectFilter } from '../redux/slices/filterSlice';
import { fetchRequests } from '../redux/asyncActions';
import { useAppDispatch } from '../redux/store';
import { statuses, products } from '../types';

export const TableItems: React.FC = () => {
  const { items, requestsStatusLoading } = useSelector(selectRequests);
  const { product, status, itemsFilter } = useSelector(selectFilter);
  const dispatch = useAppDispatch();

  const getRequests = async () => {
    await dispatch(fetchRequests(''));
    dispatch(countBadges(statuses));
  };

  React.useEffect(() => {
    void getRequests();
  }, []);

  React.useEffect(() => {
    if (requestsStatusLoading === 'completed') {
      dispatch(filterRequests({ product, status, statuses, products, items }));
    }
  }, [product, status, requestsStatusLoading]);

  const requestsTable = itemsFilter.map((item) => <TableItem {...item} key={item.id} />);

  return (
    <>
      {requestsStatusLoading === 'error' && (
        <div className="alert alert-danger">Ошибка загрузки с сервера</div>
      )}
      {requestsStatusLoading === 'loading' && (
        <div className="preloader-container">
          <div className="preloader"></div>
        </div>
      )}
      {requestsStatusLoading === 'completed' && (
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
