const mode = process.env.NODE_MODE; // 'dev' or 'test'
console.log('process.env.NODE_MODE', process.env.NODE_MODE);
const dev = {
  app: {
    port: process.env.PORT,
  },
  db: {
    host: process.env.DB_HOST || 'mongodb://localhost:',
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
};

// Value are here, becaus .env variable is not accessible in TEST MODE
const test = {
  app: {
    port: 3000,
  },
  db: {
    host: process.env.DB_HOST_TEST || 'mongodb://192.168.1.100:',
    port: process.env.DB_PORT_TEST || 27017,
    name: process.env.DB_NAME_TEST || '/test',
  },
};

const production = {
  app: {
    port: process.env.PORT,
  },
  db: {
    host: process.env.DB_HOST || 'mongodb://localhost:',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'fournisseurs_practeo',
  },
};

const config = {
  dev,
  test,
  production,
};

module.exports = config[mode];
