import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEditId } from '../redux/slices/requestsSlice';
import { RequestTable } from '../types';

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
  const dispatch = useDispatch();

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
    </tr>
  );
};
