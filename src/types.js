export const products = [
  { product: 'course-html', title: 'Курс по верстке' },
  { product: 'course-js', title: 'Курс по JavaScript' },
  { product: 'course-vue', title: 'Курс по Vue JS' },
  { product: 'course-php', title: 'Курс по PHP' },
  { product: 'course-wordpress', title: 'Курс по WordPress' },
];

export const optionsProducts = products.map((item) => {
  return (
    <option value={item.product} key={item.product}>
      {item.title}
    </option>
  );
});

export const statuses = [
  { status: 'new', title: 'Новая', titleNav: 'Новые', class: 'badge-danger' },
  { status: 'inwork', title: 'В работе', titleNav: 'В работе', class: 'badge-warning' },
  { status: 'complete', title: 'Завершена', titleNav: 'Завершенные', class: 'badge-success' },
];

export const optionsStatuses = statuses.map((item) => {
  return (
    <option value={item.status} key={item.status}>
      {item.title}
    </option>
  );
});

export const StatusLoading = {
  LOADING: 'loading',
  SUCCESS: 'completed',
  ERROR: 'error',
};
