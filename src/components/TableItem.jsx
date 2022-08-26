import { Link } from 'react-router-dom';

export const TableItem = ({ request }) => {
  const { name, phone, email, dateFormat, productName, statusName, statusClass, id } = request;

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
          to={'/edit/' + id}
          onClick={() => {
            localStorage.setItem('editId', id);
          }}>
          Редактировать
        </Link>
      </td>
    </tr>
  );
};
