export type Product = {
  product: string;
  title: string;
};

export const products: Product[] = [
  { product: 'course-html', title: 'Курс по верстке' },
  { product: 'course-js', title: 'Курс по JavaScript' },
  { product: 'course-vue', title: 'Курс по Vue JS' },
  { product: 'course-php', title: 'Курс по PHP' },
  { product: 'course-wordpress', title: 'Курс по WordPress' },
];

export type Status = {
  status: string;
  title?: string;
  titleNav?: string;
  class?: string;
  badges: number;
};

export const statuses: Status[] = [
  { status: 'all', title: 'Все', titleNav: 'Все вместе', class: '', badges: 0 },
  { status: 'new', title: 'Новая', titleNav: 'Новые', class: 'badge-danger', badges: 0 },
  { status: 'inwork', title: 'В работе', titleNav: 'В работе', class: 'badge-warning', badges: 0 },
  {
    status: 'complete',
    title: 'Завершена',
    titleNav: 'Завершенные',
    class: 'badge-success',
    badges: 0,
  },
];

export const optionsProducts = products.map((item) => {
  return (
    <option value={item.product} key={item.product}>
      {item.title}
    </option>
  );
});

export const optionsStatuses = statuses.map((item) => {
  return (
    <option value={item.status} key={item.status} disabled={item.status === 'all'}>
      {item.status !== 'all' ? item.title : 'Выберите...'}
    </option>
  );
});

export enum StatusLoading {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
  BEGIN = 'idle',
}

export type Request = {
  name: string;
  phone: string;
  email: string;
  date: string;
  product: string;
  status: string;
  id: number;
};

export type RequestForm = {
  name: string;
  phone: string;
  email: string;
  product: string;
};

export type RequestTable = {
  name: string;
  phone: string;
  email: string;
  dateFormat: string;
  productName: string;
  statusName: string;
  statusClass: string;
  id: number;
};

export type RequestEdit = {
  name: string;
  phone: string;
  email: string;
  date: string;
  dateEdit?: string;
  product: string;
  status: string;
  id: number;
};
