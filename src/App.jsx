import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import Table from './pages/Table';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import { Navbar } from './components';
import './css/bootstrap.min.css';
import './css/style.css';

function App() {
  const products = [
    { product: 'course-html', title: 'Курс по верстке' },
    { product: 'course-js', title: 'Курс по JavaScript' },
    { product: 'course-vue', title: 'Курс по Vue JS' },
    { product: 'course-php', title: 'Курс по PHP' },
    { product: 'course-wordpress', title: 'Курс по WordPress' },
  ];

  const optionsProducts = products.map((item) => {
    return (
      <option value={item.product} key={item.product}>
        {item.title}
      </option>
    );
  });

  const statuses = [
    { status: 'new', title: 'Новая', titleNav: 'Новые', class: 'badge-danger' },
    { status: 'inwork', title: 'В работе', titleNav: 'В работе', class: 'badge-warning' },
    { status: 'complete', title: 'Завершена', titleNav: 'Завершенные', class: 'badge-success' },
  ];

  const optionsStatuses = statuses.map((item) => {
    return (
      <option value={item.status} key={item.status}>
        {item.title}
      </option>
    );
  });

  return (
    <Router>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Form optionsProducts={optionsProducts} />} />
          <Route
            path="/table"
            element={
              <Table statuses={statuses} products={products} optionsProducts={optionsProducts} />
            }
          />
          <Route
            path="/edit/:id"
            element={<Edit optionsProducts={optionsProducts} optionsStatuses={optionsStatuses} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
