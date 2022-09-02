import { Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import Table from './pages/Table';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import { Navbar } from './components';
import './css/bootstrap.min.css';
import './css/style.css';

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/table" element={<Table />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
