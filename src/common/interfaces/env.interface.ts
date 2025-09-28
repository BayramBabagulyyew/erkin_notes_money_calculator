export interface IEnvironment {
  //api
  API_VERSION: string;
  API_BASE_URL: string;

  NODE_ENV: string;
  API_PORT: string;
  API_PREFIX: string;

  // database connection
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_DIALECT: string;
  DB_LOGGING: string;

  //Token
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  TOKEN_TYPE: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
}
