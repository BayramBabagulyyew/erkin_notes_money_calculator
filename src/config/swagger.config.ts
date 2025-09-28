import { AUTH_OPTIONS, TOKEN_NAME } from '@common/constants';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { title } from 'process';

const titleAdmin = 'Admin API Documentation For Marify';
/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const SwaggerConfig = (
  app: INestApplication,
  apiVersion: string,
  url?: string,
) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setVersion(apiVersion)
    .addServer(`${url}`)
    .addServer('http://localhost:3000')
    .addServer('http://192.168.241.127:8080')
    .addServer('http://217.174.233.210:1480')
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`api/docs`, app, document);
};
