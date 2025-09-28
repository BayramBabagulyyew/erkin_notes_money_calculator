import { HttpStatus } from './http-status';

export const CUSTOM_ERRORS = {
  USER: {
    DUPLICATE: {
      status: HttpStatus.BAD_REQUEST,
      title: 'Email is taken',
      message: 'Email is taken. Use another email or restore password',
    },
    NOT_FOUND: {
      status: HttpStatus.BAD_REQUEST,
      title: 'User not found',
      message: 'User with this email not found. ъуъ!',
    },
    INACTIVE: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      title: 'User is inactive',
      message: 'We send code to activate to email',
    },
    EDIT_ONLY_YOURSELF: {
      status: HttpStatus.FORBIDDEN,
      title: 'Error',
      message: 'You can edit you user only',
    },
    WRONG_PASSWORD: {
      status: HttpStatus.BAD_REQUEST,
      title: 'Wrong credential',
      message: 'Wrong username or password',
    },
    NOT_LOGGED_IN: {
      status: HttpStatus.BAD_REQUEST,
      title: 'Error',
      message: 'User not Logged in',
    },
    ALREADY_ACTIVATED: {
      status: HttpStatus.BAD_REQUEST,
      title: 'Error',
      message: 'User is already activated!',
    },
  },
  AUTH: {
    NO_AUTH_HEADER: {
      status: HttpStatus.UNAUTHORIZED,
      title: 'Error',
      message: 'No Authorization Data (Header)',
    },

    NO_TOKEN: {
      status: HttpStatus.UNAUTHORIZED,
      title: 'Error',
      message: 'No token found!',
    },
    NO_TOKEN_PAYLOAD: {
      status: HttpStatus.UNAUTHORIZED,
      title: 'Error',
      message: 'No token payload found!',
    },
    INVALID_TOKEN: {
      status: HttpStatus.UNAUTHORIZED,
      title: 'Error',
      message: 'Invalid token!',
    },
  },

  DATABASE: {
    DUPLICATE: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      title: 'Error',
      message: 'Duplicate record!',
    },
    NOTNULL: {
      status: HttpStatus.BAD_REQUEST,
      title: 'Error',
      message: 'Null value in column violates not-null constraint!',
    },
    FOREIGN_KEY: {
      status: HttpStatus.BAD_REQUEST,
      title: 'Error',
      message: 'Insert/update violates foreign key constraints!',
    },
    UNIQUE: {
      status: HttpStatus.BAD_REQUEST,
      title: 'Error',
      message: 'Insert/update violates unique constraints!',
    },
    ENUM: {
      status: HttpStatus.BAD_REQUEST,
      title: 'Error',
      message: 'Invalid input syntax for type ...',
    },
  },
  VALIDATION: {
    status: HttpStatus.BAD_REQUEST,
    title: 'Error',
    message: 'Validation error! Please refer body for details!',
  },
  HTTP: {
    '400': {
      status: HttpStatus.BAD_REQUEST,
      title: 'Error',
      message: 'Bad Request!',
    },
    '401': {
      status: HttpStatus.UNAUTHORIZED,
      title: 'Error',
      message: 'Unauthorized!',
    },
    '403': {
      status: HttpStatus.FORBIDDEN,
      title: 'Error',
      message: 'Forbidden Resource!',
    },
    '404': {
      status: HttpStatus.NOT_FOUND,
      title: 'Error',
      message: 'Not found!',
    },
  },

  PERMISSION: {
    NOT_FOUND: {
      status: HttpStatus.FORBIDDEN,
      title: 'Error',
      message: "You don't have necessary permissions to enter!",
    },
    NONE_AVAILABLE: {
      status: HttpStatus.FORBIDDEN,
      title: 'Error',
      message: "You don't have permissions this operation!",
    },
    WRONG_TYPE: {
      status: HttpStatus.FORBIDDEN,
      title: 'Error',
      message: 'You permission type!', // todo ???
    },
  },

  RECORD_SECURITY: {
    NOT_FOUND: {
      status: HttpStatus.FORBIDDEN,
      title: 'Error',
      message: "You don't have permissions to perform this operation!",
    },
    NO_ACCESS: {
      status: HttpStatus.FORBIDDEN,
      title: 'Error',
      message: "You don't have permissions to perform this operation!",
    },
  },

  PAGE: {
    NOT_FOUND: {
      status: HttpStatus.NOT_FOUND,
      title: 'Error',
      message: 'Page not found!',
    },
  },

  METADATA: {
    OBJECT: {
      NOT_FOUND: {
        status: HttpStatus.NOT_FOUND,
        title: 'Error',
        message: 'Object not found!',
      },
    },
    FIELD: {
      NOT_FOUND: {
        status: HttpStatus.NOT_FOUND,
        title: 'Error',
        message: 'Field not found!',
      },
    },
  },
};
