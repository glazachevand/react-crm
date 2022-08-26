import { Link } from 'react-router-dom';

const NotFound = () => {
  const cssHeader = {
    fontWeight: '800',
    color: '#2789e6',
    fontSize: '8rem',
  };

  return (
    <div className="page with-nav radial-bg flex-center">
      <div className="white-plate white-plate--payment">
        <div className="container-fluid">
          <div className="text-center">
            <h1 style={cssHeader}>404</h1>

            <div className="white-plate__line-between white-plate__line-between--main"></div>

            <p className="lead">Ошибка!</p>
            <p className="lead">К сожалению, запрашиваемая Вами страница не найдена...</p>

            <Link to="/" className="btn btn-lg btn-primary mt-30">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
