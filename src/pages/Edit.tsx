import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  selectRequests,
  putStatusUpdate,
  deleteStatusUpdate,
  deleteEditId,
} from '../redux/slices/requestsSlice';
import { getRequestById, putRequest, deleteRequest } from '../redux/asyncActions';
import { useAppDispatch } from '../redux/store';
import { Modal } from '../components';
import { optionsProducts, optionsStatuses, RequestEdit, products, statuses } from '../types';
import '../css/pages/edit.css';

const Edit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getStatusLoading,
    putStatusLoading,
    deleteStatusLoading,
    getErrorMessage,
    putErrorMessage,
    deleteErrorMessage,
  } = useSelector(selectRequests);
  const dispatch = useAppDispatch();

  const [request, setRequest] = useState<RequestEdit>({
    name: '',
    phone: '',
    email: '',
    date: '',
    dateEdit: '',
    product: products[0].product,
    status: statuses[0].status,
    id: NaN,
  });

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const clickHandler = () => {
    setOpen(false);
    navigate('/table');
  };

  const getRequest = async () => {
    const data = await dispatch(getRequestById(id || ''));
    const itemEdit = unwrapResult(data);
    const dateNew = new Date(itemEdit.date);
    setRequest({
      ...itemEdit,
      dateEdit: `${dateNew.toLocaleDateString('ru-RU')} ${dateNew.toLocaleTimeString('ru-RU')}`,
    });
  };

  useEffect(() => {
    void getRequest();
  }, []);

  const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRequest((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestPut = { ...request };
    delete requestPut.dateEdit;
    void dispatch(putRequest(requestPut)).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        setText('???????????? ?????????????? ????????????????????');
        setOpen(true);
        dispatch(putStatusUpdate());
      }
    });
  };

  const deleteHandler = (id: string | undefined): void => {
    if (id) {
      void dispatch(deleteRequest(id)).then((data) => {
        localStorage.removeItem('editId');
        if (data.meta.requestStatus === 'fulfilled') {
          if (id) {
            dispatch(deleteEditId(id));
          }
          setText('???????????? ?????????????? ??????????????');
          setOpen(true);
          dispatch(deleteStatusUpdate());
        }
      });
    }
  };

  return (
    <div className="page with-nav">
      <div className="form-wrapper">
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col">
              <div className="admin-heading-1">???????????? ?? ??????????????</div>
            </div>
            <div className="col text-right">
              <Link to="/table" className="btn btn-link">
                ?????????????????? ??????????
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {getStatusLoading === 'error' && (
                <div className="alert alert-danger">{getErrorMessage}</div>
              )}
              {putStatusLoading === 'error' && (
                <div className="alert alert-danger">{putErrorMessage}</div>
              )}
              {deleteStatusLoading === 'error' && (
                <div className="alert alert-danger">{deleteErrorMessage}</div>
              )}
              {getStatusLoading === 'loading' && (
                <div className="preloader-container">
                  <div className="preloader"></div>
                </div>
              )}
              {getStatusLoading === 'completed' && (
                <form id="form" onSubmit={submitHandler}>
                  <div className="card mb-4">
                    <div className="card-header">???????????? ?? ????????????</div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>ID:</strong>
                        </div>
                        <div className="col">
                          ???????????? ???<span id="number">{id}</span>
                        </div>
                        <input name="id" type="hidden" id="id" />
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>???????? ????????????????:</strong>
                        </div>
                        <div className="col" id="date">
                          {request.dateEdit}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>??????????????:</strong>
                        </div>
                        <div className="col">
                          <select
                            id="product"
                            name="product"
                            className="custom-select"
                            value={request.product}
                            onChange={changeHandler}>
                            {optionsProducts}
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>??????:</strong>
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={request.name}
                            onChange={changeHandler}
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
                            defaultValue={request.email}
                            onChange={changeHandler}
                            id="email"
                            name="email"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>??????????????:</strong>
                        </div>
                        <div className="col">
                          <input
                            type="tel"
                            className="form-control"
                            defaultValue={request.phone}
                            onChange={changeHandler}
                            id="phone"
                            name="phone"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-2">
                          <strong>???????????? ????????????:</strong>
                        </div>
                        <div className="col">
                          <select
                            className="custom-select"
                            id="status"
                            name="status"
                            value={request.status}
                            onChange={changeHandler}>
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
                          <span className="spinner"></span>
                          ???????????? ??????????????????????
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          ?????????????????? ??????????????????
                        </button>
                      )}
                    </div>
                    <div className="col-auto text-right">
                      {deleteStatusLoading === 'loading' ? (
                        <button disabled type="button" className="btn btn-danger">
                          <span className="spinner"></span>
                          ???????????? ??????????????????
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteHandler(id)}>
                          ??????????????
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          <Modal open={open} clickHandler={clickHandler} text={text} />
        </div>
      </div>
    </div>
  );
};

export default Edit;
