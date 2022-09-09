import { ProductSelect, TopStatusNav, TableItems, Logo, LeftStatusNav, User } from '../components';
import '../css/pages/table.css';

const Table: React.FC = () => {
  return (
    <div className="page with-nav body--dashboard">
      <div className="left-panel blue-skin">
        <Logo />
        <User />
        <LeftStatusNav />
      </div>
      <div className="main-wrapper">
        <div className="container-fluid">
          <div className="admin-heading-1">Все заявки</div>

          <form action="">
            <div className="row mb-3 justify-content-start">
              <div className="col">
                <TopStatusNav />
              </div>

              <div className="col">
                <ProductSelect />
              </div>
            </div>
          </form>
          <TableItems />
        </div>
      </div>
    </div>
  );
};

export default Table;
