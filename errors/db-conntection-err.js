class DBConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DBConnectionError';
  }
}

module.exports = DBConnectionError;
