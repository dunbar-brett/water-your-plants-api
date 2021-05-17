const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };
const status = {
  success: 200,
  created: 201,
  nocontent: 204,
  bad: 400,
  unauthorized: 401,
  notfound: 404,
  conflict: 409,
  error: 500,
  notImplemented: 501,
};

module.exports = {
  successMessage,
  errorMessage,
  status
}