import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRequest } from '../redux/asyncActions';
import { optionsProducts } from '../types';
import test from '../utils/test';
import '../css/pages/form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('course-html');

  const addStatusLoading = useSelector((state) => state.requests.addStatusLoading);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      name: name,
      phone: phone,
      email: email,
      product: product,
      date: new Date().toISOString(),
      status: 'new',
    };

    dispatch(addRequest(request));
  };

  // заполнение тестовыми данными
  useEffect(() => {
    if (addStatusLoading === 'completed') {
      const randomValue = (array) => {
        return array[Math.floor(Math.random() * array.length)];
      };

      const randomRequest = randomValue(test);

      setName(randomRequest.name);
      setPhone(randomRequest.phone);
      setEmail(randomRequest.email);
      setProduct(randomRequest.product);
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

          <form id="form" method="POST" action="" onSubmit={handleSubmit}>
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product">Продукт:</label>
              <select
                id="product"
                name="product"
                className="form-control"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value);
                }}>
                {optionsProducts}
              </select>
            </div>
            <div className="form-group">
              {addStatusLoading === 'error' && (
                <>
                  <div className="alert alert-danger">Ошибка загрузки на сервер</div>
                  <button type="submit" className="btn btn-lg btn-primary btn-block">
                    Повторно отправить заявку
                  </button>
                </>
              )}
              {addStatusLoading === 'loading' && (
                <button disabled type="submit" className="btn btn-lg btn-primary btn-block">
                  Заявка загружается
                </button>
              )}
              {addStatusLoading === 'completed' && (
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Оформить заявку
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
