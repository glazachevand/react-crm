import EditTitleRow from "../EditTitleRow";
import EditForm from "../EditForm";
import "./style.css";
import { useParams } from "react-router-dom";

const EditPage = ({ optionsProducts, optionsStatuses }) => {
  const { id } = useParams();

  return (
    <div className="page with-nav">
      <div className="form-wrapper">
        <div className="container-fluid">
          <EditTitleRow />
          <div className="row">
            <div className="col">
              <EditForm
                id={id}
                optionsProducts={optionsProducts}
                optionsStatuses={optionsStatuses}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
