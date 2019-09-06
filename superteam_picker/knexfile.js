module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'team_picker'
    },
    migration: {
      directory: './db/migrations'
    }
  }
};