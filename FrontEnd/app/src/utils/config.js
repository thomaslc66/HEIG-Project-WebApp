module.exports = {
  BaseUrl: process.env.REACT_APP_BACKEND,
  initialFormValues: {
    logo: '/images/logos/default.png',
    name: '',
    note: '',
    phone: '',
    email: '',
    credentials: [{ login: '', password: '', account: '' }],
    licences: [
      {
        buyDate: '',
        programRef: {
          version: { name: '' },
          program: { name: '' },
          productor: { name: '' },
          isProgramSelectorOpen: false,
        },
        key: '',
        computer: '',
      },
    ],
  },
};
