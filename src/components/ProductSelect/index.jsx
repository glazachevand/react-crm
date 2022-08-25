import { useContext } from "react";
import { TableContext } from "../TablePage/";

const ProductSelect = ({ optionsProducts }) => {
  const { filter, changeFilter } = useContext(TableContext);

  return (
    <select
      className="custom-select"
      id="productSelect"
      value={filter.product}
      onChange={(e) => {
        changeFilter("product", e.target.value);
      }}>
      <option value="all">Все продукты</option>
      {optionsProducts}
    </select>
  );
};

export default ProductSelect;