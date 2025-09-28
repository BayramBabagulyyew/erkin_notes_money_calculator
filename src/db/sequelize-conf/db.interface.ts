export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: string | number;
  dialect?: string;
  urlDatabase?: string;
  logging?: string;
  schema: string;
  sync?: boolean;
  timezone?: string;
}

export interface IDatabaseConfig {
  dev: IDatabaseConfigAttributes;
  prod: IDatabaseConfigAttributes;
}
