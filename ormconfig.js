module.exports = {
  type: 'mongodb',
  host: 'server-mongodb:27017',
  port: 27017,
  username: 'admin',
  password: 'admin123',
  database: 'hera',
  entities: ['dist/**/*.entities.js'],
};
