import { useSelector, useDispatch } from 'react-redux';
import { changeFilterProduct } from '../redux/slices/filterSlice';
import { optionsProducts } from '../types';

export const ProductSelect = () => {
  const product = useSelector((state) => state.filter.product);
  const dispatch = useDispatch();

  return (
    <select
      className="custom-select"
      id="productSelect"
      value={product}
      onChange={(e) => {
        dispatch(changeFilterProduct(e.target.value));
        localStorage.setItem('product', e.target.value);
      }}>
      <option value="all">Все продукты</option>
      {optionsProducts}
    </select>
  );
};
