export type Test = {
  name: string;
  phone: string;
  email: string;
  product: string;
};

export const tests: Test[] = [
  {
    name: 'Иван Фролов',
    phone: '420772551797',
    email: 'frolov@gmail.com',
    product: 'course-js',
  },
  {
    name: 'Елена Иванова',
    phone: '420772551797',
    email: 'ivanova@seznam.cz',
    product: 'course-vue',
  },
  {
    name: 'Василий Пупкин',
    phone: '420776555787',
    email: 'pupkin@mail.ru',
    product: 'course-vue',
  },
  {
    name: 'Егор Безруков',
    phone: '420772557757',
    email: 'bezrukov@seznam.cz',
    product: 'course-html',
  },
  {
    name: 'Екатерина Похоменко',
    phone: '420770552577',
    email: 'pochomenko@mail.ru',
    product: 'course-wordpress',
  },
];
