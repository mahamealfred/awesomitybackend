import path from 'path';
import os from 'os';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Awesamity Backend',
      version: '1.0.0',
      description: 'Backend',
      license: {},
      contact: {}
    },
    components: {},
    security: {},
    servers: [
      {
        url: 'http://localhost:8000',
        name: `${os.hostname()}`
      },
      {
        url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
        name: `${os.hostname()}`
      }
    ]
  },
  apis: [
    path.resolve(__dirname, '../routes/*.js')
  ],
};

export default swaggerOptions;