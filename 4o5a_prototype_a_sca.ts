interface APIConfig {
  name: string;
  version: string;
  endpoints: Endpoint[];
}

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  request?: {
    body?: {
      type: string;
    };
  };
  response?: {
    body: {
      type: string;
    };
  };
}

class APIServiceGenerator {
  private apiConfig: APIConfig;

  constructor(config: APIConfig) {
    this.apiConfig = config;
  }

  generateService(): string {
    const serviceName = `${this.apiConfig.name}Service`;
    const ServiceClass = `class ${serviceName} {
      ${this.apiConfig.endpoints.map((endpoint) => {
        const methodName = `${endpoint.method} ${endpoint.path}`;
        const methodParams = endpoint.request?.body ? `body: ${endpoint.request.body.type}` : '';
        const methodReturnType = endpoint.response?.body ? `: ${endpoint.response.body.type}` : '';
        return `${methodName}(${methodParams})${methodReturnType} {
          // TO DO: implement API call logic
          throw new Error('Not implemented');
        }`;
      }).join('')}
    }`;

    return ServiceClass;
  }
}

// Test case
const apiConfig: APIConfig = {
  name: 'User',
  version: '1.0',
  endpoints: [
    {
      method: 'GET',
      path: '/users',
      response: {
        body: {
          type: 'User[]',
        },
      },
    },
    {
      method: 'POST',
      path: '/users',
      request: {
        body: {
          type: 'User',
        },
      },
      response: {
        body: {
          type: 'User',
        },
      },
    },
    {
      method: 'GET',
      path: '/users/:id',
      response: {
        body: {
          type: 'User',
        },
      },
    },
  ],
};

const generator = new APIServiceGenerator(apiConfig);
const userService = generator.generateService();
console.log(userService);