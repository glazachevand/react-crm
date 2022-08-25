import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverPath } from "../../helpers/variables";

const EditForm = ({ id, optionsProducts, optionsStatuses }) => {
  const [request, setRequest] = useState(null);
  const [isSave, setSave] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(serverPath + "requests/" + id)
      .then((res) => {
        if (!res.ok) {
          setError("Ошибка загрузки с сервера");
          setLoading(false);
          throw Error("Ошибка загрузки с сервера");
        }
        return res.json();
      })
      .then((data) => {
        setRequest(data);
        setLoading(false);
      });
  }, []);

  const dateFormat = (date) => {
    const dateNew = new Date(date);
    return `${dateNew.toLocaleDateString("ru-RU")} ${dateNew.toLocaleTimeString("ru-RU")}`;
  };

  const changeInput = (e, field) => {
    setRequest((request) => {
      return {
        ...request,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSave(true);

    fetch(serverPath + "requests/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    }).then((res) => {
      if (res.ok) {
        setSave(false);
        navigate("/table");
      } else {
        setError("Ошибка загрузки на сервер");
        setSave(false);
      }
    });
  };

  const deleteRequest = (id) => {
    setDelete(true);

    fetch(serverPath + "requests/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem("editId");
        setDelete(false);
        navigate("/table");
      } else {
        setError("Ошибка загрузки на сервер");
        setDelete(false);
      }
    });
  };

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading && <h3>загрузка...</h3>}
      {request && (
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
                  {dateFormat(request.date)}
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
                    value={request.product}
                    onChange={(e) => changeInput(e, "product")}>
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
                    value={request.name}
                    onChange={(e) => changeInput(e, "name")}
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
                    value={request.email}
                    onChange={(e) => changeInput(e, "email")}
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
                    value={request.phone}
                    onChange={(e) => changeInput(e, "phone")}
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
                    value={request.status}
                    onChange={(e) => changeInput(e, "status")}>
                    <option defaultValue="">Выберите...</option>
                    {optionsStatuses}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="col text-right">
              {isSave && (
                <button disabled type="submit" className="btn btn-primary">
                  Заявка сохраняется
                </button>
              )}
              {!isSave && (
                <button type="submit" className="btn btn-primary">
                  Сохранить изменения
                </button>
              )}
            </div>
            <div className="col-auto text-right">
              {isDelete && (
                <button disabled type="button" className="btn btn-danger">
                  Заявка удаляется
                </button>
              )}
              {!isDelete && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteRequest(id);
                  }}>
                  Удалить
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EditForm;
