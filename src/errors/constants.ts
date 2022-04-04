export default {
  unauthenticated: {
    code: 'unauthenticated',
    message: 'Unauthenticated',
  },
  insertError: {
    code: 301,
    message: 'Insert Error',
  },
  credentialsError: {
    code: 401,
    message: 'Email/Password invalid',
  },
  accessDeniedError: {
    code: 403,
    message: 'Access denied',
  },
  notFoundEntityError: 'Not found entity',
  invalidParameters: {
    code: 400,
    message: 'Invalid parameter',
  },
  invalidCode: 'Code invalid',
  duplicateError: 'Duplicate entity',
  inactiveError: 'Account is inactive',
  permissionDenied: 'Permission denied',
  unknownError: 'Something went wrong',
  serverError: {
    code: 500,
    message: 'Server error',
  },
};
