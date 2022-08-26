import { useEffect, useState } from 'react';
import test from '../utils/test';
import { serverPath } from '../utils/variables';
import '../css/pages/form.css';

const Form = ({ optionsProducts }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('course-html');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testFlag, setTestFlag] = useState(true);

  // заполнение тестовыми данными
  useEffect(() => {
    const randomValue = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };

    const randomRequest = randomValue(test);

    setName(randomRequest.name);
    setPhone(randomRequest.phone);
    setEmail(randomRequest.email);
    setProduct(randomRequest.product);
  }, [testFlag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const request = {
      name: name,
      phone: phone,
      email: email,
      product: product,
      date: new Date().toISOString(),
      status: 'new',
    };
    fetch(serverPath + 'requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    }).then((res) => {
      if (res.ok) {
        setLoading(false);
        setTestFlag((value) => !value);
      } else {
        setError('Ошибка загрузки на сервер');
        setLoading(false);
      }
    });
  };

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
              {error && <div className="alert alert-danger">{error}</div>}
              {isLoading && (
                <button disabled type="submit" className="btn btn-lg btn-primary btn-block">
                  Заявка загружается
                </button>
              )}
              {!isLoading && (
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
