import { Link } from 'react-router-dom';
import {
  setEditId,
  deleteRequestFromTable,
  deleteStatusUpdate,
  deleteEditId,
  countBadges,
} from '../redux/slices/requestsSlice';
import { deleteFilterRequest } from '../redux/slices/filterSlice';
import { deleteRequest } from '../redux/asyncActions';
import { useAppDispatch } from '../redux/store';
import { RequestTable, statuses } from '../types';
import deleteBtn from '../assets/img/cross.svg';

export const TableItem: React.FC<RequestTable> = ({
  name,
  phone,
  email,
  dateFormat,
  productName,
  statusName,
  statusClass,
  id,
}) => {
  const dispatch = useAppDispatch();

  const deleteHandler = (id: number): void => {
    void dispatch(deleteRequest(String(id))).then((data) => {
      localStorage.removeItem('editId');
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(deleteRequestFromTable(id));
        dispatch(countBadges(statuses));
        dispatch(deleteFilterRequest(id));
        dispatch(deleteStatusUpdate());
        dispatch(deleteEditId(String(id)));
      }
    });
  };

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{dateFormat}</td>
      <td>{productName}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <div className={'badge badge-pill ' + statusClass}>{statusName}</div>
      </td>
      <td>
        <Link
          to={'/edit/' + String(id)}
          onClick={() => {
            dispatch(setEditId(String(id)));
            localStorage.setItem('editId', String(id));
          }}>
          Редактировать
        </Link>
      </td>
      <td>
        <button className="button-close" onClick={() => deleteHandler(id)}>
          <img src={deleteBtn} title="удалить заявку" alt="delete" />
        </button>
      </td>
    </tr>
  );
};
