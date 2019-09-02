// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
    database: 'superteam_picker'
    },
    migration: {
      directory:'./db/migrations'
    }
  }
};
