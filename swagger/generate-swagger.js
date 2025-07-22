const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./src/app.ts']; // your entry point

// Swagger metadata
const doc = {
  info: {
    title: 'Bayon Backend',
    version: '1.0.0',
    description: 'API documentation',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  tags: [
    {
      name: 'api/web',
      description: 'Web API endpoints',
    },
    {
      name: 'api/spa',
      description: 'SPA API endpoints',
    },
    {
      name: 'api/mobile',
      description: 'Mobile API endpoints',
    },
  ],
};

// Step 1: Generate Swagger JSON
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // console.log('✅ Swagger documentation generated!');

  // Step 2: Load and patch it to group routes by prefix
  const swagger = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
  for (const path in swagger.paths) {
    const methods = swagger.paths[path];
    for (const method in methods) {
      const op = methods[method];
      // Add tags automatically based on prefix
      if (!op.tags || op.tags.length === 0) {
        if (path.startsWith('/api/web')) {
          op.tags = ['api/web'];
        } else if (path.startsWith('/api/spa')) {
          op.tags = ['api/spa'];
        } else if (path.startsWith('/api/mobile')) {
          op.tags = ['api/mobile'];
        }
      }
    }
  }

  // Step 3: Save back
  fs.writeFileSync(outputFile, JSON.stringify(swagger, null, 2));
  console.log('✅ Swagger tags auto-grouped by prefix.');
});
