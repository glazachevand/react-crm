import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getRequestForEdit, changeRequestField } from '../redux/slices/editSlice';
import { getRequestById, putRequest, deleteRequest } from '../redux/asyncActions';
import { optionsProducts, optionsStatuses } from '../types';
import '../css/pages/edit.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requestEdit, getStatusLoading, putStatusLoading, deleteStatusLoading } = useSelector(
    (state) => state.edit,
  );
  const dispatch = useDispatch();

  const getRequest = async () => {
    const data = await dispatch(getRequestById(id));
    const itemEdit = unwrapResult(data);
    dispatch(getRequestForEdit(itemEdit));
  };

  useEffect(() => {
    getRequest();
  }, []);

  const changeInput = (value, field) => {
    dispatch(changeRequestField({ field, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestPut = { ...requestEdit };
    delete requestPut.dateEdit;
    const data = await dispatch(putRequest(requestPut));
    if (data.meta.requestStatus === 'fulfilled') {
      navigate('/table');
    }
  };

  const clickDeleteRequest = async (id) => {
    const data = await dispatch(deleteRequest(id));

    if (data.meta.requestStatus === 'fulfilled') {
      localStorage.removeItem('editId');
      navigate('/table');
    }
  };

  return (
    <div className="page with-nav">
      <div className="form-wrapper">
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col">
              <div className="admin-heading-1">Работа с заявкой</div>
            </div>
            <div className="col text-right">
              <Link to="/table" className="btn btn-link">
                Вернуться назад
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {getStatusLoading === 'error' && (
                <div className="alert alert-danger">Ошибка загрузки с сервера</div>
              )}
              {putStatusLoading === 'error' && (
                <div className="alert alert-danger">Ошибка загрузки на сервер</div>
              )}
              {deleteStatusLoading === 'error' && (
                <div className="alert alert-danger">Ошибка удаления записи</div>
              )}
              {getStatusLoading === 'loading' && <h3>загрузка...</h3>}
              {requestEdit && (
                <form id="form" onSubmit={handleSubmit}>
                  <div className="card mb-4">
                    <div className="card-header">Данные о заявке</div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>ID:</strong>
                        </div>
                        <div className="col">
                          Заявка №<span id="number">{id}</span>
                        </div>
                        <input name="id" type="hidden" id="id" />
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>Дата создания:</strong>
                        </div>
                        <div className="col" id="date">
                          {requestEdit.dateEdit}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>Продукт:</strong>
                        </div>
                        <div className="col">
                          <select
                            id="product"
                            name="product"
                            className="custom-select"
                            value={requestEdit.product}
                            onChange={(e) => changeInput(e.target.value, 'product')}>
                            {optionsProducts}
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>Имя:</strong>
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={requestEdit.name}
                            onChange={(e) => changeInput(e.target.value, 'name')}
                            id="name"
                            name="name"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>Email:</strong>
                        </div>
                        <div className="col">
                          <input
                            type="email"
                            className="form-control"
                            defaultValue={requestEdit.email}
                            onChange={(e) => changeInput(e.target.value, 'email')}
                            id="email"
                            name="email"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>Телефон:</strong>
                        </div>
                        <div className="col">
                          <input
                            type="tel"
                            className="form-control"
                            defaultValue={requestEdit.phone}
                            onChange={(e) => changeInput(e.target.value, 'phone')}
                            id="phone"
                            name="phone"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>Статус заявки:</strong>
                        </div>
                        <div className="col">
                          <select
                            className="custom-select"
                            id="status"
                            name="status"
                            value={requestEdit.status}
                            onChange={(e) => changeInput(e.target.value, 'status')}>
                            {optionsStatuses}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-between">
                    <div className="col text-right">
                      {putStatusLoading === 'loading' ? (
                        <button disabled type="submit" className="btn btn-primary">
                          Заявка сохраняется
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          Сохранить изменения
                        </button>
                      )}
                    </div>
                    <div className="col-auto text-right">
                      {deleteStatusLoading === 'loading' ? (
                        <button disabled type="button" className="btn btn-danger">
                          Заявка удаляется
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            clickDeleteRequest(id);
                          }}>
                          Удалить
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
