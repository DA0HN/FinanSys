export interface Month {
  value: string;
  label: string;
}

export interface Year {
  value: string;
  label: string;
}

export const generateMonthOptions = (): Month[] => {
  return [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ] as Month[];
};
export const generateYearOptions = (): Year[] => {
  return [
    { value: '2016', label: '2016'},
    { value: '2017', label: '2017'},
    { value: '2018', label: '2018'},
    { value: '2019', label: '2019'},
    { value: '2020', label: '2020'},
    { value: '2021', label: '2021'},
    { value: '2022', label: '2022'},
    { value: '2023', label: '2023'},
  ];
};

