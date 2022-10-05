import { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { addRequest } from '../redux/asyncActions';
import { selectRequests, addStatusUpdate } from '../redux/slices/requestsSlice';
import { useAppDispatch } from '../redux/store';
import { optionsProducts, RequestForm, products } from '../types';
import { tests, Test } from '../utils/test';
import '../css/pages/form.css';
import { Modal } from '../components';

const Form: React.FC = () => {
  const [form, setForm] = useState<RequestForm>({
    name: '',
    phone: '',
    email: '',
    product: products[0].product,
  });

  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen(false);
  };

  const { addStatusLoading, addErrorMessage } = useSelector(selectRequests);
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = {
      ...form,
      date: new Date().toISOString(),
      status: 'new',
    };

    void dispatch(addRequest(request)).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        setOpen(true);
        dispatch(addStatusUpdate());
      }
    });
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    // заполнение тестовыми данными
    if (addStatusLoading === 'idle') {
      const randomValue = (array: Test[]): Test => {
        return array[Math.floor(Math.random() * array.length)];
      };

      const randomRequest = randomValue(tests);
      setForm(randomRequest);
    }
  }, [addStatusLoading]);

  return (
    <div className="page with-nav radial-bg flex-center">
      <div className="white-plate white-plate--payment">
        <div className="container-fluid">
          <div className="white-plate__header text-center">
            <p className="white-plate__logo">
              <span>Форма</span> заявок
            </p>
          </div>

          <div className="white-plate__line-between white-plate__line-between--main"></div>

          <form id="form" method="POST" action="" onSubmit={submitHandler}>
            <label>Ваши данные:</label>
            <div className="form-group">
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="on"
                className="form-control"
                placeholder="Имя и Фамилия"
                required
                value={form.name}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                id="phone"
                type="text"
                name="phone"
                autoComplete="on"
                className="form-control"
                placeholder="Телефон"
                value={form.phone}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="on"
                className="form-control"
                placeholder="Email"
                required
                value={form.email}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product">Продукт:</label>
              <select
                id="product"
                name="product"
                className="form-control"
                value={form.product}
                onChange={changeHandler}>
                {optionsProducts}
              </select>
            </div>
            <div className="form-group">
              {addStatusLoading === 'error' && (
                <>
                  <div className="alert alert-danger">{addErrorMessage}</div>
                  <button type="submit" className="btn btn-lg btn-primary btn-block">
                    Повторно отправить заявку
                  </button>
                </>
              )}
              {addStatusLoading === 'loading' && (
                <button disabled type="submit" className="btn btn-lg btn-primary btn-block">
                  <span className="spinner"></span>
                  Заявка загружается
                </button>
              )}
              {(addStatusLoading === 'completed' || addStatusLoading === 'idle') && (
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Оформить заявку
                </button>
              )}
            </div>
          </form>

          <Modal open={open} clickHandler={clickHandler} text="Заявка успешно отправлена" />
        </div>
      </div>
    </div>
  );
};

export default Form;
