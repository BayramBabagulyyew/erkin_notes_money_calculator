import { AUTH_OPTIONS, TOKEN_NAME } from '@common/constants';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Setup swagger for a specific app type
 * @param app {INestApplication}
 * @param appType {AppType} - The type of app (admin, user, public)
 * @param apiVersion {string} - API version
 * @param url {string} - Base URL
 */
export const SwaggerConfig = (
  app: INestApplication,
  apiVersion: string,
  url?: string,
) => {


  const options = new DocumentBuilder()
    .setTitle('Erkin tasks')
    .setDescription('API documentation for Erkin tasks')
    .setVersion(apiVersion)
    .addServer(`${url}`)
    .addServer('http://localhost:3000')
    .addServer('http://192.168.241.127:8080')
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();

  // Filter document to include only relevant tags for this app
  const document = SwaggerModule.createDocument(app, options, {
    include: [], // We'll filter by tags instead
  });

  // Filter the document paths to only include endpoints with relevant tags
  SwaggerModule.setup('api/docs', app, document);
};



