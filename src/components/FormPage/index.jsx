import Form from "../Form";
import "./style.css";

const FormPage = ({ optionsProducts }) => {
  return (
    <div className="page with-nav radial-bg flex-center">
      <div className="white-plate white-plate--payment">
        <div className="container-fluid">
          <Form optionsProducts={optionsProducts} />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
