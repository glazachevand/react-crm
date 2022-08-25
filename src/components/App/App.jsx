import Navbar from "../Navbar";
import FormPage from "../FormPage";
import TablePage from "../TablePage";
import EditPage from "../EditPage";
import NotFound from "../NotFound";
import "./bootstrap.min.css";
import "./style.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const products = [
    { product: "course-html", title: "Курс по верстке" },
    { product: "course-js", title: "Курс по JavaScript" },
    { product: "course-vue", title: "Курс по Vue JS" },
    { product: "course-php", title: "Курс по PHP" },
    { product: "course-wordpress", title: "Курс по WordPress" },
  ];

  const optionsProducts = products.map((item) => {
    return (
      <option value={item.product} key={item.product}>
        {item.title}
      </option>
    );
  });

  const statuses = [
    { status: "new", title: "Новая", titleNav: "Новые", class: "badge-danger" },
    { status: "inwork", title: "В работе", titleNav: "В работе", class: "badge-warning" },
    { status: "complete", title: "Завершена", titleNav: "Завершенные", class: "badge-success" },
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
          <Route path="/" element={<FormPage optionsProducts={optionsProducts} />} />
          <Route
            path="/table"
            element={
              <TablePage
                statuses={statuses}
                products={products}
                optionsProducts={optionsProducts}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditPage optionsProducts={optionsProducts} optionsStatuses={optionsStatuses} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
