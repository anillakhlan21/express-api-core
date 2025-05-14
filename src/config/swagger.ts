import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./src/routes/**/*.ts'], // adjust path to your routes
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
